import org.jenkinsci.plugins.workflow.steps.FlowInterruptedException

jenkinsfile_CI = load 'jenkinsfile_CI.groovy'
jenkinsfile_utils = load 'jenkinsfile_utils.groovy'
jenkinsfile_CD = load 'jenkinsfile_CD.groovy'

/* 
   check event trong trigger in gitlab
   deploy to production when push tag event
*/
def checkBuildType() {
    def buildType = "none"
    if ("${env.gitlabActionType}".toString() == "PUSH") {
        buildType = "push_commit_build"
    } else if ("${env.gitlabActionType}".toString() == "MERGE") {
        if ("${env.gitlabMergeRequestState}".toString() == "opened") {
            buildType = "merge_request_build"
        } else if ("${env.gitlabMergeRequestState}".toString() == "closed") {
            buildType = "close_mr_build"
        } else if ("${env.gitlabMergeRequestState}".toString() == "merged") {
            buildType = "accept_mr_build"
        } else {
            buildType = "merge_request_build"
        }
    } else if ("${env.gitlabActionType}".toString() == "NOTE") {
        buildType = "rebuild_merge_request"
    } else if ("${env.gitlabActionType}".toString() == "TAG_PUSH") {
        buildType = "deploy_production"
    }
    return buildType
}

def initGlobalEnv() {
    env.STAGING_IP = ""
    env.MERGE_REQUEST_BUILD_COMMENT = ""
    env.PUSH_COMMIT_BUILD_COMMENT = ""
    env.lastCommitShortName = env.gitlabMergeRequestLastCommit.substring(0, 8)
    env.display_build_name = "${env.gitlabSourceBranch}:${lastCommitShortName} -> ${env.gitlabTargetBranch}".toString()
    if (env.gitlabSourceRepoName != null) {
        env.gitlabSourceRepoName = env.gitlabSourceRepoName.replace(" ", "-")
    }
    if (env.gitlabTargetRepoName != null) {
        env.gitlabTargetRepoName = env.gitlabTargetRepoName.replace(" ", "-")
    }
}
 // build
def bootstrap_build() {
    initGlobalEnv()
    env.BUILD_TYPE = checkBuildType()
    switch (env.BUILD_TYPE) {
        case "push_commit_build":
            bootstrapPushCommitBuild()
            break
        case "merge_request_build":
            bootstrapMergeRequestBuild()
            break
        case "rebuild_merge_request":
            bootstrapRebuildMergeRequest()
            break
        case "accept_mr_build":
			break
        case "close_mr_build":
            //bootstrapAcceptAndCloseMergeRequestBuild()
            break
        case "deploy_production":
            bootstrapDeployToProduction()
            break
        default:
            break
    }
}

//roll_back
def bootstrap_roll_back(){
    env.DEPLOY_RESULT_DESCRIPTION = ""
    loadCIConfigFile()
    try {
        jenkinsfile_CD.rollBackTag()
    } catch (FlowInterruptedException interruptEx){
        echo "${interruptEx}"
        currentBuild.result = "ABORTED"
    }catch (InterruptedException ex){
        currentBuild.result = "ABORTED"
    }catch (err) {
        echo "error: ${err}"
        if (currentBuild.result != "ABORTED") {
            currentBuild.result = "FAILURE"
        }
        env.DEPLOY_RESULT_DESCRIPTION += "<h4>:x: Rollback Final Result: Failed.<h4>"
        throw err
    } finally {
        env.DEPLOY_RESULT_DESCRIPTION += "<h4><i><a href='${env.BUILD_URL}display/redirect'>" +
            "Rollback Process Details...</a></i></h4><br/><br/>"
        if (env.VERSION_ROLLBACK == 'Aborted' || env.VERSION_ROLLBACK == ''){
            env.DEPLOY_RESULT_TITLE = "Rollback Tag aborted"
        }else {
            env.DEPLOY_RESULT_TITLE = "Rollback version ${env.VERSION_ROLLBACK} result ${currentBuild.result}"
        }
        echo "title: ${env.DEPLOY_RESULT_TITLE}"
        echo "description: ${env.DEPLOY_RESULT_DESCRIPTION}"
        //Credential of user
       withCredentials([usernamePassword(credentialsId: 'a6299eee-80ab-41bc-992a-1745f51a264b', usernameVariable: 'username',
              passwordVariable: 'password')]){
            def issueContentJson = """
                                    {
                                        "title": "${env.DEPLOY_RESULT_TITLE}",
                                        "description": "${env.DEPLOY_RESULT_DESCRIPTION}",
                                        "labels": "Rollback Result"
                                    }
                                """
            def createIssueResp = httpRequest([
                acceptType   : 'APPLICATION_JSON',
                httpMode     : 'POST',
                contentType  : 'APPLICATION_JSON',
                customHeaders: [[name: "PRIVATE-TOKEN", value: password]],
                url          : "${env.GITLAB_PROJECT_API_URL}/issues",
                requestBody  : issueContentJson
            ])
            def notifyMemberLevel = 40
            def projectMemberList = jenkinsfile_utils.getProjectMember(notifyMemberLevel)
            def issueCommentStr = ""
            for (member in projectMemberList) {
                issueCommentStr += "@${member} "
            }
            echo "call member: ${issueCommentStr}"
            def issueCreated = jenkinsfile_utils.jsonParse(createIssueResp.content)
            def issueCommentJson = """
                                    {
                                        "body": "${issueCommentStr}"
                                    }
                                """
            httpRequest([
                acceptType   : 'APPLICATION_JSON',
                httpMode     : 'POST',
                contentType  : 'APPLICATION_JSON',
                customHeaders: [[name: "PRIVATE-TOKEN", value: password]],
                url          : "${env.GITLAB_PROJECT_API_URL}/issues/${issueCreated["iid"]}/notes",
                requestBody  : issueCommentJson
            ])
        }    
    }
}

// trigger push commit event
@SuppressWarnings("GroovyUnusedCatchParameter")
def bootstrapPushCommitBuild() {
    loadCIConfigFile()
    env.gitlabBuildID = env.PUSH_BUILD_PREFIX + "-" + env.BUILD_NUMBER
	
	if (pushCommitInOpenMR(env.gitlabBranch)) {
		stage('1. Prepare source code') {
			echo "Push branch is in an Open Merge Request. Cancel build"
			currentBuild.result = "ABORTED"
		}
	}else{
		stage('1. Prepare source code') {
			echo "OK"
		}
		
		try{
			updateGitlabCommitStatus name: "build", state: 'running'
			updateGitlabCommitStatus name: "${env.gitlabBuildID}", state: 'running'
			//stage('1. Prepare source code') {
			//	echo "Skip checkout source code"
				//jenkinsfile_utils.checkoutSourceCode("PUSH")
			//}
			jenkinsfile_CI.buildPushCommit()
			currentBuild.result = "SUCCESS"
		} catch (FlowInterruptedException interruptEx) {
			currentBuild.result = "ABORTED"
		} catch (InterruptedException ex) {
			currentBuild.result = "ABORTED"
		} catch (err) {
			echo "error: ${err}"
			if (currentBuild.result != "ABORTED") {
				currentBuild.result = "FAILURE"
			}
			throw err
		} finally {
			updateGitlabCommitStatus name: "${env.gitlabBuildID}", state: 'success'
			if (currentBuild.result != "SUCCESS" && currentBuild.result != "ABORTED") {
				currentBuild.result = "FAILURE"
			}
			def buildIcon = ""
			def buildResultStr = ""
			if (currentBuild.result == "SUCCESS") {
				updateGitlabCommitStatus name: "build", state: 'success'
				buildIcon = ":white_check_mark:"
				buildResultStr = "Build Success. "
			} else if (currentBuild.result == "ABORTED") {
				updateGitlabCommitStatus name: "build", state: 'canceled'
				buildIcon = ":warning:"
				buildResultStr = "Build Canceled."
			} else if (currentBuild.result == "FAILURE") {
				updateGitlabCommitStatus name: "build", state: 'failed'
				buildIcon = ":x:"
				buildResultStr = "Build Fail."
			//send mail when sonar faild ==> chưa bổ sung phần build faild
			}
			updateGitlabPushComment(buildIcon, buildResultStr, env.lastCommitShortName)
			mail([
				bcc: '', 
				body: " <summary>Push Commit <strong>${env.gitlabSourceBranch}:${lastCommitShortName}</strong>: " + 
					  "<br/> ${buildResultStr}</summary> <br/> <h4><i><a href='${env.BUILD_URL}display/redirect'>" + 
					  "Build Details...</a></i></h4><br/>Sonar Result: ${env.SONAR_QUBE_SCAN_RESULT_STR}", 
				mimeType: 'text/html', 
				cc: "${env.mailCC}", 
				from: 'jenkins', 
				replyTo: '', 
				subject: "$JOB_NAME - Build # $BUILD_NUMBER - $currentBuild.result!", 
				to: "${env.mailTo}"
			])
		}
	}
}
// trigger rebuild when merge request

def bootstrapRebuildMergeRequest() {
    loadCIConfigFile()
    if(isOpenMergeRequest(env.gitlabMergeRequestIid)){
        if(isWIPMergeRequest(env.gitlabMergeRequestIid)){
            echo "Rebuild WIP Merge Request. Execute Push Commit Build"
            env.gitlabAfter = env.gitlabMergeRequestLastCommit
            bootstrapPushCommitBuild()
        }else{
            echo "Rebuild Merge Request. Execute Merge Request Build"
            bootstrapMergeRequestBuild()
        }
    }else{
        addGitLabMRComment comment: "This merge request is currently not open. Cancel build"
        currentBuild.result = "ABORTED"
    }
}
// trigger build when merge request

def bootstrapMergeRequestBuild() {
    try {
        loadCIConfigFile()
        if (checkIfBranchesRevisionAreSame(env.gitlabSourceBranch, env.gitlabTargetBranch)) {
            stage("Cancel Build When Source Branch is the same with Target Branch") {
                echo "source branch has same commitID with target branch. Stop build"
                env.CHECK_IF_BRANCHES_REVISION_ARE_SAME_RESULT = "Source branch has same commitID with target branch. Stop build"
            }
            throw new InterruptedException("Source branch has same commitID with target branch. Stop build")
        }
        env.gitlabBuildID = env.MR_BUILD_PREFIX + "-" + env.BUILD_NUMBER
        updateGitlabCommitStatus name: "build", state: 'running'
        updateGitlabCommitStatus name: "${env.gitlabBuildID}", state: 'running'
        stage('1. Cancel old MR Build') {
            // cancelOldMrBuild(env.gitlabMergeRequestIid, env.BUILD_TYPE)
        }
        updateGitlabCommitStatus name: "build", state: 'running'

        //stage('2. Prepare Source code') {
        //    jenkinsfile_utils.checkoutSourceCode("MERGE")
        //}
        jenkinsfile_CI.buildMergeRequest()
        currentBuild.result = "SUCCESS"
    }catch (FlowInterruptedException interruptEx) {
        echo "Build canceled: ${interruptEx}"
        currentBuild.result = "ABORTED"
    } catch (InterruptedException interruptEx) {
        echo "Build canceled: ${interruptEx}"
        currentBuild.result = "ABORTED"
    } catch (err) {
        echo "build error: ${err}"
        if (currentBuild.result != "ABORTED") {
            currentBuild.result = "FAILURE"
        }
        throw err
    } finally {
        def buildIcon = ""
        def buildResultStr = ""
        if (env.sourceBranchCommitID != env.targetBranchCommitID) {
            updateGitlabCommitStatus name: "${env.gitlabBuildID}", state: 'success'
            if (currentBuild.result != "SUCCESS" && currentBuild.result != "ABORTED") {
                currentBuild.result = "FAILURE"
            }
            if (currentBuild.result == "SUCCESS") {
                updateGitlabCommitStatus name: "build", state: 'success'
                buildIcon = ":white_check_mark:"
                buildResultStr += "Build Success. Staging Environment IP: <b><a href='http://${env.STAGING_IP}'>${env.STAGING_IP}</a></b>"
            } else if (currentBuild.result == "ABORTED") {
                updateGitlabCommitStatus name: "build", state: 'canceled'
                buildIcon = ":warning:"
                buildResultStr = "Build Canceled."
            } else if (currentBuild.result == "FAILURE") {
                updateGitlabCommitStatus name: "build", state: 'failed'
                buildIcon = ":x:"
                buildResultStr = "Build Fail."
            }
        } else {
            if (currentBuild.result == "SUCCESS") {
                buildIcon = ":white_check_mark:"
                buildResultStr += "Build Success. Staging Environment IP: <b><a href='http://${env.STAGING_IP}'>${env.STAGING_IP}</a></b>"
            } else if (currentBuild.result == "ABORTED") {
                buildIcon = ":warning:"
                buildResultStr = "Build Canceled."
            } else if (currentBuild.result == "FAILURE") {
                buildIcon = ":x:"
                buildResultStr = "Build Fail."
            }
        }
        def lastCommitShortName = env.gitlabMergeRequestLastCommit.substring(0, 8)
        def display_build_name = "${env.gitlabSourceBranch}:${lastCommitShortName} -> ${env.gitlabTargetBranch} - ${env.gitlabActionType}".toString()

        def buildSummary = "<summary>$buildIcon Merge request <strong>${display_build_name}</strong>: " +
            "${buildResultStr}</summary>"
        def buildDetail = "<h4><i><a href='${env.BUILD_URL}display/redirect'>" +
            "Build Details...</a></i></h4><br/><br/>"

        echo """
            env.SONAR_QUBE_SCAN_RESULT_STR:  ${env.SONAR_QUBE_SCAN_RESULT_STR}
        """
        def buildResultContent =
            (env.CANCEL_BUILD_WARNING == null ? "" : env.CANCEL_BUILD_WARNING) +
                (env.CHECK_IF_BRANCHES_REVISION_ARE_SAME_RESULT == null ? "" : env.CHECK_IF_BRANCHES_REVISION_ARE_SAME_RESULT) +
                (env.SONAR_QUBE_SCAN_RESULT_STR == null ? "" : env.SONAR_QUBE_SCAN_RESULT_STR)

        def mergeRequestBuildStr =
            "<details> ${buildSummary}<br/><br/> ${buildResultContent}" +
                "${buildDetail}</details>".toString()
        echo "comment ${mergeRequestBuildStr}"
        addGitLabMRComment comment: "${mergeRequestBuildStr}"
        echo "comment added !"
        mail([
            bcc: '', 
            body: "${mergeRequestBuildStr}", 
            mimeType: 'text/html',
            cc: "${env.mailCC}", 
            from: 'enkins', 
            replyTo: '', 
            subject: "$JOB_NAME - Build # $BUILD_NUMBER - $currentBuild.result!", 
            to: "${env.mailTo}"
        ])
    }
}

// trigger build accept and close merge event
def bootstrapAcceptAndCloseMergeRequestBuild() {
    loadCIConfigFile()
    env.gitlabBuildID = env.ACCEPT_CLOSE_MR_BUILD_PREFIX + "-" + env.BUILD_NUMBER
    try {
        updateGitlabCommitStatus name: "${env.gitlabBuildID}", state: 'running'
        stage('Cancel old MR Build') {
            // cancelOldMrBuild(env.gitlabMergeRequestIid, env.BUILD_TYPE)
        }
        jenkinsfile_CI.buildAcceptAndCloseMR()
        currentBuild.result = "SUCCESS"
    } catch (FlowInterruptedException interruptEx) {
        echo "Build canceled: ${interruptEx}"
        currentBuild.result = "ABORTED"
    } catch (InterruptedException interruptEx) {
        echo "Build canceled: ${interruptEx}"
        currentBuild.result = "ABORTED"
    } catch (err) {
        echo "build error: ${err}"
        echo "build result: ${currentBuild.result}"
        if (currentBuild.result != "ABORTED") {
            currentBuild.result = "FAILURE"
        }
        throw err
    } finally {
        // mark that build is done
        updateGitlabCommitStatus name: "${env.gitlabBuildID}", state: 'success'
        if (currentBuild.result != "SUCCESS" && currentBuild.result != "ABORTED") {
            currentBuild.result = "FAILURE"
        }
    }
}
// function deploy to productions
def bootstrapDeployToProduction() {
    env.DEPLOY_RESULT_DESCRIPTION = ""
    try {
        loadCIConfigFile()
        jenkinsfile_CD.deployToProduction()
        env.DEPLOY_RESULT_DESCRIPTION += "<h4>:white_check_mark: Deploy Final Result: Success.<h4>"
    } catch (FlowInterruptedException interruptEx) {
        echo "${interruptEx}"
        currentBuild.result = "ABORTED"
        env.DEPLOY_RESULT_DESCRIPTION += "<h4>:warning: Deploy Final Result: Aborted.<h4>"
    } catch (InterruptedException ex) {
        echo "${ex}"
        currentBuild.result = "ABORTED"
    } catch (err) {
        echo "${err}"
        echo "build result:"
        echo "${currentBuild.result}"
        if (currentBuild.result != "ABORTED") {
            currentBuild.result = "FAILURE"
            env.DEPLOY_RESULT_DESCRIPTION += "<h4>:x: Deploy Final Result: Failed.<h4>"
        }
        throw err
    } finally {
        updateGitlabCommitStatus name: "deploy to production ", state: 'success'
        //theem vao do 
        if (currentBuild.result != "SUCCESS" && currentBuild.result != "ABORTED") {
                currentBuild.result = "FAILURE"
            }
            def buildIcon = ""
            def buildResultStr = ""
            if (currentBuild.result == "SUCCESS") {
                updateGitlabCommitStatus name: "deploy to production ", state: 'success'
                buildIcon = ":white_check_mark:"
                buildResultStr = "Deploy Success. "
            } else if (currentBuild.result == "ABORTED") {
                updateGitlabCommitStatus name: "deploy to production ", state: 'canceled'
                buildIcon = ":warning:"
                buildResultStr = "Deploy Canceled."
            } else if (currentBuild.result == "FAILURE") {
                updateGitlabCommitStatus name: "deploy to production ", state: 'failed'
                buildIcon = ":x:"
                buildResultStr = "Deploy Fail."
            }
            // Cũ như thế này đây
        env.DEPLOY_RESULT_DESCRIPTION += "<h4><i><a href='${env.BUILD_URL}display/redirect'>" +
            "Deploy Process Details...</a></i></h4><br/><br/>"
        env.DEPLOY_RESULT_TITLE = "Deploy version ${env.project_version} result"

        echo "title: ${env.DEPLOY_RESULT_TITLE}"
        echo "description: ${env.DEPLOY_RESULT_DESCRIPTION}"
        // Credential ci-cd bot --> nochange
        withCredentials([usernamePassword(credentialsId: 'a5eedd9f-332d-4575-9756-c358bbd808eb', usernameVariable: 'user',
              passwordVariable: 'password')]){
            def issueContentJson = """
                                    {
                                        "title": "${env.DEPLOY_RESULT_TITLE}",
                                        "description": "${env.DEPLOY_RESULT_DESCRIPTION}",
                                        "labels": "Deploy Result"
                                    }
                                """
            def createIssueResp = httpRequest([
                acceptType   : 'APPLICATION_JSON',
                httpMode     : 'POST',
                contentType  : 'APPLICATION_JSON',
                customHeaders: [[name: "PRIVATE-TOKEN", value: password]],
                url          : "${env.GITLAB_PROJECT_API_URL}/issues",
                requestBody  : issueContentJson
            ])
            def notifyMemberLevel = 40
            def projectMemberList = jenkinsfile_utils.getProjectMember(notifyMemberLevel)
            def issueCommentStr = ""
            for (member in projectMemberList) {
                issueCommentStr += "@${member} "
            }
            echo "call member: ${issueCommentStr}"
            def issueCreated = jenkinsfile_utils.jsonParse(createIssueResp.content)
            def issueCommentJson = """
                                    {
                                        "body": "${issueCommentStr}"
                                    }
                                """
            httpRequest([
                acceptType   : 'APPLICATION_JSON',
                httpMode     : 'POST',
                contentType  : 'APPLICATION_JSON',
                customHeaders: [[name: "PRIVATE-TOKEN", value: password]],
                url          : "${env.GITLAB_PROJECT_API_URL}/issues/${issueCreated["iid"]}/notes",
                requestBody  : issueCommentJson
            ])
        }
    }
}
 // load file cấu hình trên folder trên jenkins
def loadCIConfigFile() {
    configFileProvider([configFile(fileId: "ng-vts-webapp-config", targetLocation: 'cicd/')]) {
        load "cicd/ng-vts-webapp-config"
    }
}

/**
 * Check source branch revision is the same with target branch revision
 * @param branch which this push commit build event push to
 * @return boolean true if this push branch is in a open merge request
 */

def checkIfBranchesRevisionAreSame(sourceBranch, targetBranch) {
    withCredentials([usernamePassword(credentialsId: 'a6299eee-80ab-41bc-992a-1745f51a264b', usernameVariable: 'username',
              passwordVariable: 'password')]){
        def branchPageIndex = 0
        def hasBranchPage = true
        while (hasBranchPage) {
            def branchesResponse = httpRequest([
                acceptType   : 'APPLICATION_JSON',
                httpMode     : 'GET',
                contentType  : 'APPLICATION_JSON',
                customHeaders: [[name: 'Private-Token', value: password]],
                url          : "${env.GITLAB_PROJECT_API_URL}/repository/branches?page=${branchPageIndex}"
            ])
            def branches = jenkinsfile_utils.jsonParse(branchesResponse.content)
            for (branch in branches) {
                if (branch['name'] == sourceBranch) {
                    env.sourceBranchCommitID = branch['commit']['id']
                }
                if (branch['name'] == targetBranch) {
                    env.targetBranchCommitID = branch['commit']['id']
                }
            }
            if (branches.size() == 0) {
                hasBranchPage = false
            } else {
                branchPageIndex += 1
            }
        }
    }
    echo "Source Branch Commit ID: ${env.sourceBranchCommitID}"
    echo "Target Branch Commit ID: ${env.targetBranchCommitID}"
    return env.sourceBranchCommitID == env.targetBranchCommitID
}

/**
 * Check if this push commit is in source branch of an Open Merge Request
 * @param branch which this push commit build event push to
 * @return boolean true if this push branch is in a open merge request
 */
def pushCommitInOpenMR(pushBranch) {
    def isInOpenMR = false
    withCredentials([usernamePassword(credentialsId: 'a6299eee-80ab-41bc-992a-1745f51a264b', usernameVariable: 'username',
              passwordVariable: 'password')]){
        def response = httpRequest([
            acceptType   : 'APPLICATION_JSON',
            httpMode     : 'GET',
            contentType  : 'APPLICATION_JSON',
            customHeaders: [[name: 'Private-Token', value: password]],
            url          : "${env.GITLAB_PROJECT_API_URL}/merge_requests?state=opened&source_branch=${pushBranch}"
        ])

        def openMRList = jenkinsfile_utils.jsonParse(response.content)
        if (openMRList.size() > 0) {
            def checkMR = openMRList[0]
            if (checkMR["work_in_progress"] == false) {
                isInOpenMR = true
            }
        }
    }
    return isInOpenMR
}
/**
 * Check if this merge request is a open merge request
 * @param gitlabMergeRequestIid Merge request iid
 * @return boolean true if checked merge request is a open merge request, false if is a closed MR
 */
 
def isOpenMergeRequest(gitlabMergeRequestIid) {
    withCredentials([
        usernamePassword(credentialsId: 'a6299eee-80ab-41bc-992a-1745f51a264b', usernameVariable: 'username', passwordVariable: 'password'),
        usernamePassword(credentialsId: 'jenkins_api_token_new', usernameVariable: 'usernamejenkins', passwordVariable: 'token')
    ]) {
        def response = httpRequest([
            acceptType   : 'APPLICATION_JSON',
            httpMode     : 'GET',
            contentType  : 'APPLICATION_JSON',
            customHeaders: [[name: 'Private-Token', value: password]],
            url          : "${env.GITLAB_PROJECT_API_URL}/merge_requests/${gitlabMergeRequestIid}"
        ])
        def mergeRequestInfo = jenkinsfile_utils.jsonParse(response.content)
        return (mergeRequestInfo['state']=='opened')
    }
}

/**
 * Check if this merge request is a open and WIP merge request or not
 * @param branch which this push commit build event push to
 * @return boolean true if this push branch is in a open merge request
 */
 
def isWIPMergeRequest(gitlabMergeRequestIid) {
    withCredentials([
        usernamePassword(credentialsId: 'a6299eee-80ab-41bc-992a-1745f51a264b', usernameVariable: 'username', passwordVariable: 'password'),
        usernamePassword(credentialsId: 'jenkins_api_token_new', usernameVariable: 'usernamejenkins', passwordVariable: 'token')
    ]) {
        def response = httpRequest([
            acceptType   : 'APPLICATION_JSON',
            httpMode     : 'GET',
            contentType  : 'APPLICATION_JSON',
            customHeaders: [[name: 'Private-Token', value: password ]],
            url          : "${env.GITLAB_PROJECT_API_URL}/merge_requests/${gitlabMergeRequestIid}"
        ])
        def mergeRequestInfo = jenkinsfile_utils.jsonParse(response.content)
        return mergeRequestInfo['work_in_progress']
    }
}
@SuppressWarnings("GroovyAssignabilityCheck")
def checkIfBuildIsRunning(buildURL) {
    withCredentials([usernamePassword(credentialsId: 'jenkins_api_token_new', usernameVariable: 'usernamejenkins', passwordVariable: 'token')]) {
        def buildInfoResp = httpRequest([
            acceptType   : 'APPLICATION_JSON',
            httpMode     : 'GET',
            contentType  : 'APPLICATION_JSON',
            authentication: 'jenkins_api_token_new',
            url          : "${buildURL}/api/json"
        ])
        return jenkinsfile_utils.jsonParse(buildInfoResp.content)["building"] == true
    }
}
/**
 * Check if other builds is running in commit which this build refer to
 * And close these builds when match below requirements:
 * Accept and Close MR build only stop OPEN MR build, not stop Push commit build
 * Open MR Build close both other Open MR build and Push commit build
 * @param buildType type of current build
 * @param gitlabMergeRequestIid GitLab merge request id of this build
 * @return nothing
 */
 
def cancelOldMrBuild(gitlabMergeRequestIid, currentBuildType) {
    env.CANCEL_BUILD_WARNING = ""
    withCredentials([
        usernamePassword(credentialsId: 'a6299eee-80ab-41bc-992a-1745f51a264b', usernameVariable: 'username', passwordVariable: 'password'),
        usernamePassword(credentialsId: 'jenkins_api_token_new', usernameVariable: 'usernamejenkins', passwordVariable: 'token')
        ]) {
        def pipelines = httpRequest([
            acceptType   : 'APPLICATION_JSON',
            httpMode     : 'GET',
            contentType  : 'APPLICATION_JSON',
            customHeaders: [[name: 'Private-Token', value: password]],
            url          : "${env.GITLAB_PROJECT_API_URL}/merge_requests/${gitlabMergeRequestIid}/pipelines"
        ])

        for (pipeline in jenkinsfile_utils.jsonParse(pipelines.content)) {
            //noinspection GroovyAssignabilityCheck
            def checkCommitID = pipeline['sha']
            echo "check commit id: ${checkCommitID}"
            def commitJobs = httpRequest([
                acceptType   : 'APPLICATION_JSON',
                httpMode     : 'GET',
                contentType  : 'APPLICATION_JSON',
                customHeaders: [[name: 'Private-Token', value: password]],
                url          : "${env.GITLAB_PROJECT_API_URL}/repository/commits/${checkCommitID}/statuses?all=yes"
            ])

        for (commitJob in jenkinsfile_utils.jsonParse(commitJobs.content)) {
            //noinspection GroovyAssignabilityCheck
            if (currentBuildType == "merge_request_build" || currentBuildType == "rebuild_merge_request"
                    || ((currentBuildType == "accept_mr_build" || currentBuildType == "close_mr_build")
                    && (commitJob["name"].contains(env.MR_BUILD_PREFIX)
                    || commitJob["name"].contains(env.ACCEPT_CLOSE_MR_BUILD_PREFIX)))
            ){
               if (commitJob["status"] == "pending" || commitJob["status"] == "running") {
                   def buildURL = commitJob["target_url"].substring(0, commitJob["target_url"].length() - 17)
                        echo "Check buildURL: ${buildURL}"
                        echo "Current buildURL: ${env.BUILD_URL}"
                    if (!env.BUILD_URL.contains(buildURL)) {
                        def retry = 0
                        while (checkIfBuildIsRunning(buildURL) && retry < 3) {
                            echo "Old build: ${commitJob["target_url"]} is running!. Stop this job!"
                            httpRequest([
                                acceptType   : 'APPLICATION_JSON',
                                httpMode     : 'POST',
                                contentType  : 'APPLICATION_JSON',
                                authentication: 'jenkins_api_token_new',
                                url          : "${buildURL}/stop"
                            ])
                            sleep 10
                            retry += 1
                        }
                        if (checkIfBuildIsRunning(buildURL)) {
                            env.CANCEL_BUILD_WARNING += "<h2> Build ${buildURL} is still running after cancel build 3 times. Re check it!</h2>"
                        }
                    }
                }
            }
        }
    }
        echo "pipelines: ${pipelines}"
    }
}

def updateGitlabPushComment(buildIcon, buildResultStr, lastCommitShortName) {

    def buildSummary = "<summary>$buildIcon Push Commit <strong>${env.gitlabSourceBranch}:${lastCommitShortName}</strong>: " +
        "${buildResultStr}</summary>"

    echo """
            env.SONAR_QUBE_SCAN_RESULT_STR:  ${env.SONAR_QUBE_SCAN_RESULT_STR}
    """

    def buildResultContent =
            (env.SONAR_QUBE_SCAN_RESULT_STR == null ? "" : env.SONAR_QUBE_SCAN_RESULT_STR)
    def buildDetails =
        "<h4><i><a href='${env.BUILD_URL}display/redirect'>" +
            "Build Details...</a></i></h4><br/><br/>"
    def buildCommitStr =
        "<details> ${buildSummary}<br/><br/>${buildResultContent}" +
            "${buildDetails}</details>".toString()
    def requestBody = '{"note":"' + buildCommitStr + '", "line_type": "new"}'
    echo "${requestBody}"
    withCredentials([usernamePassword(credentialsId: 'a6299eee-80ab-41bc-992a-1745f51a264b', usernameVariable: 'username',
              passwordVariable: 'password')]){
        sh "curl -X POST ${env.GITLAB_PROJECT_API_URL}/repository/commits/${env.gitlabAfter}/comments " +
            "-H 'Cache-Control: no-cache' -H 'Content-Type: application/json' " +
            "-H 'PRIVATE-TOKEN: ${password}' " +
            "-d '${requestBody}' "
    }
}

return [
    bootstrap_build: this.&bootstrap_build,
    bootstrap_roll_back: this.&bootstrap_roll_back,
    bootstrapDeployToProduction: this.&bootstrapDeployToProduction
]

