import org.jenkinsci.plugins.workflow.steps.FlowInterruptedException
import java.text.DecimalFormat
import hudson.tasks.test.AbstractTestResultAction
import groovy.json.*


//functions scan source code
def getSonarQubeAnalysisResult(sonarQubeURL, projectKey) {
    def metricKeys = "bugs,vulnerabilities,code_smells"
    def measureResp = httpRequest([
        acceptType : 'APPLICATION_JSON',
        httpMode   : 'GET',
        contentType: 'APPLICATION_JSON',
        url        : "${sonarQubeURL}/api/measures/component?metricKeys=${metricKeys}&component=${projectKey}"
    ])
    def measureInfo = jenkinsfile_utils.jsonParse(measureResp.content)
    def metricResultList = measureInfo['component']['measures']
    echo "${metricResultList}"
    int bugsEntry = getMetricEntryByKey(metricResultList, "bugs")['value'] as Integer
    int vulnerabilitiesEntry = getMetricEntryByKey(metricResultList, "vulnerabilities")['value'] as Integer
    int codeSmellEntry = getMetricEntryByKey(metricResultList, "code_smells")['value'] as Integer
    return ["bugs": bugsEntry, "vulnerabilities": vulnerabilitiesEntry, "code_smells" : codeSmellEntry ]
}

def getMetricEntryByKey(metricResultList, metricKey) {
    for (metricEntry in metricResultList) {
        if (metricEntry["metric"] == metricKey) {
            echo "${metricEntry}"
            return metricEntry
        }
    }
    return null
}

@NonCPS
def genSonarQubeProjectKey() {
    def sonarqubeProjectKey = ""
    if ("${env.gitlabActionType}".toString() == "PUSH" || "${env.gitlabActionType}".toString() == "TAG_PUSH") {
        sonarqubeProjectKey = "${env.gitlabSourceRepoName}:${env.gitlabSourceBranch}"
    } else if ("${env.gitlabActionType}".toString() == "MERGE" || "${env.gitlabActionType}".toString() == "NOTE") {
        sonarqubeProjectKey = "MR-${env.gitlabSourceRepoName}:${env.gitlabSourceBranch}-to-" +
            "${env.gitlabTargetBranch}"
    }
    return sonarqubeProjectKey.replace('/', '-')
}

@NonCPS
def getTestResultFromJenkins() {
    def testResult = [:]
    AbstractTestResultAction testResultAction = currentBuild.rawBuild.getAction(AbstractTestResultAction.class)
    testResult["total"] = testResultAction.totalCount
    testResult["failed"] = testResultAction.failCount
    testResult["skipped"] = testResultAction.skipCount
    testResult["passed"] = testResultAction.totalCount - testResultAction.failCount - testResultAction.skipCount
    return testResult
}

@NonCPS
def getProjectCodeCoverageInfo(coverageInfoXmlStr) {
    def coverageInfoXml = jenkinsfile_utils.parseXml(coverageInfoXmlStr)
    def coverageInfoStr = ""
    coverageInfoXml.counter.each {
        def coverageType = it.@type as String
        int missed = (it.@missed as String) as Integer
        int covered = (it.@covered as String) as Integer
        int total = missed + covered

        def coveragePercent = 0.00
        if (total > 0) {
            coveragePercent = Double.parseDouble(
                new DecimalFormat("###.##").format(covered * 100.0 / total))
        }
        coverageInfoStr += "- <b>${coverageType}</b>: <i>${covered}</i>/<i>${total}</i> (<b>${coveragePercent}%</b>)<br/>"
    }
    return coverageInfoStr
}

def unitTestAndCodeCoverage(buildType){
	echo  'Skip Unittest'
	//echo  'Checkout source code'
	//jenkinsfile_utils.checkoutSourceCode(buildType)
	
	//echo "Unit Test & Code Coverage"
	//try {
	//	sh """
	//	mvn clean test org.jacoco:jacoco-maven-plugin:0.8.2:report-aggregate
	//	"""
	//	echo "code coverage done"
	//	jacoco([
	//		classPattern: 'target/classes',
	//		sourcePattern: 'src/main/java'
	//	])
	//	def coverageResultStrComment = "<b>Coverage Test Result:</b> <br/><br/>"
	//	def coverageInfoXmlStr = readFile "target/jacoco-aggregate-report/jacoco.xml"
	//	echo "Coverage Info: ${getProjectCodeCoverageInfo(coverageInfoXmlStr)} "
	//	coverageResultStrComment += getProjectCodeCoverageInfo(coverageInfoXmlStr)
	//	coverageResultStrComment += "<i><a href='${env.BUILD_URL}Code-Coverage-Report/jacoco'>" +
	//								"Details Code Coverage Test Report...</a></i><br/><br/>"
	//	env.CODE_COVERAGE_RESULT_STR = coverageResultStrComment
	//} catch (err) {
	//	echo "Error when test Unit Test"
	//	throw err
	//} finally {
	//	sh 'ls -al'
	//	//junit '*/target/*-results/test/TEST-*.xml'
	//	junit 'target/surefire-reports/TEST-*.xml'
	//	def unitTestResult = getTestResultFromJenkins()

	//	env.UNIT_TEST_PASSED = unitTestResult["passed"]
	//	env.UNIT_TEST_FAILED = unitTestResult["failed"]
	//	env.UNIT_TEST_SKIPPED = unitTestResult["skipped"]
	//	env.UNIT_TEST_TOTAL = unitTestResult["total"]

	//	def testResultContent = "- Passed: <b>${unitTestResult['passed']}</b> <br/>" +
	//							"- Failed: <b>${unitTestResult['failed']}</b> <br/>" +
	//							"- Skipped: <b>${unitTestResult['skipped']}</b> <br/>"

	//	def testResultString = 	"<b> Unit Test Result:</b> <br/><br/>${testResultContent} " +
	//							"<i><a href='${env.BUILD_URL}testReport/'>Details Unit Test Report...</a></i><br/><br/>"
	//	env.UNIT_TEST_RESULT_STR = testResultString

	//	if (unitTestResult['failed'] > 0) {
	//		error "Failed ${unitTestResult['failed']} unit tests"
	//		env.UNIT_TEST_RESULT_STR += "Failed ${unitTestResult['failed']} unit tests"
	//	}
	//}
}

//
def sonarQubeScan(buildType) {
	echo  'Checkout source code'
	jenkinsfile_utils.checkoutSourceCode(buildType)
	def packageJSON = readJSON file: 'package.json'
    def version = packageJSON.version
    echo "PHK Version: ${version}"
	echo  'SonarQube analysis'
	    env.SONAR_QUBE_PROJECT_KEY = genSonarQubeProjectKey()
        withSonarQubeEnv('SONARQ_V6'){
            sh(returnStatus: true, script: 
                "/home/app/server/sonar-scanner/bin/sonar-scanner " +
                "-Dsonar.projectName=${env.SONAR_QUBE_PROJECT_KEY} " +
                "-Dsonar.projectKey=${env.SONAR_QUBE_PROJECT_KEY} " +
				"-Dsonar.projectVersion=${version} " +
                "-Dsonar.java.binaries=. " +
                "-Dsonar.sources=. " +
                "-Dsonar.inclusions=**/*.js,**/*.ts " +
                "-Dsonar.exclusions=**/*.zip,**/*.jar,**/*.html,**/R.java,**/build/**,**/target/**,**/.settings/**,**/.mvn/**,**/src/main/resources/static/bower_components/**,**/src/main/resources/static/jquery-validation/**,**/src/main/resources/static/scripts/material/**,**/src/main/resources/static/scripts/multiselect/**,**/src/main/resources/static/scripts/nanobar/**,**/src/main/resources/static/scripts/plugins/**,**/src/main/resources/static/scripts/utils/**"
            )
                sh 'ls -al'
                sh 'cat .scannerwork/report-task.txt'
                def props = readProperties file: '.scannerwork/report-task.txt'
                env.SONAR_CE_TASK_ID = props['ceTaskId']
                env.SONAR_PROJECT_KEY = props['projectKey']
                env.SONAR_SERVER_URL = props['serverUrl']
                env.SONAR_DASHBOARD_URL = props['dashboardUrl']

                echo "SONAR_SERVER_URL: ${env.SONAR_SERVER_URL}"
                echo "SONAR_PROJECT_KEY: ${env.SONAR_PROJECT_KEY}"
                echo "SONAR_DASHBOARD_URL: ${env.SONAR_DASHBOARD_URL}"
    }
	echo  'Quality Gate'
	def qg = null
	try {
		def sonarQubeRetry = 0
		def sonarScanCompleted = false
		while (!sonarScanCompleted) {
			try {
				sleep 10
				timeout(time: 1, unit: 'MINUTES') {
					script {
						qg = waitForQualityGate()
						sonarScanCompleted = true
						if (qg.status != 'OK') {
							if (env.bypass == 'true') {
								echo "Sonar contain error"
							}else {
								error "Pipeline failed due to quality gate failure: ${qg.status}"
							}
						}
					}
				}
			} catch (FlowInterruptedException interruptEx) {
				// check if exception is system timeout
				if (interruptEx.getCauses()[0] instanceof org.jenkinsci.plugins.workflow.steps.TimeoutStepExecution.ExceededTimeout) {
					if (sonarQubeRetry <= 10) {
						sonarQubeRetry += 1
					} else {
						if (env.bypass == 'true') {
							echo "Sonar contain error"
						} else {
							error "Cannot get result from Sonarqube server. Build Failed."
						} 
					}
				} else {
					throw interruptEx
				}
			}
			catch (err) {
				throw err
			}
		}
	}
	catch (err) {
		throw err
	} finally {
		def codeAnalysisResult = getSonarQubeAnalysisResult(env.SONAR_SERVER_URL, env.SONAR_PROJECT_KEY)
		def sonarQubeAnalysisStr = "- Vulnerabilities: <b>${codeAnalysisResult["vulnerabilities"]}</b> <br/>" +
			"- Bugs: <b>${codeAnalysisResult["bugs"]}</b> <br/>" +
			"- Code Smell: <b>${codeAnalysisResult["code_smells"]}</b> <br/>"
		def sonarQubeAnalysisComment = "<b>SonarQube Code Analysis Result: ${qg.status}</b> <br/><br/>${sonarQubeAnalysisStr} " +
			"<i><a href='${SONAR_DASHBOARD_URL}'>" +
			"Details SonarQube Code Analysis Report...</a></i><br/><br/>"
		env.SONAR_QUBE_SCAN_RESULT_STR = sonarQubeAnalysisComment
		if ("${env.gitlabActionType}".toString() == "MERGE" || "${env.gitlabActionType}".toString() == "NOTE") {
			echo "check vulnerabilities, code smell and bugs"
			int maximumAllowedVulnerabilities = env.MAXIMUM_ALLOWED_VUNERABILITIES as Integer
			int maximumAllowedBugs = env.MAXIMUM_ALLOWED_BUGS as Integer
			int maximumAllowedCodeSmell = env.MAXIMUM_ALLOWED_CODE_SMELL as Integer
			echo "maximum allow vulnerabilities:  ${maximumAllowedVulnerabilities} "
			echo "maximum allow bugs:  ${maximumAllowedBugs}"
			echo "maximum allow code smell:  ${maximumAllowedCodeSmell}"
			if (codeAnalysisResult["vulnerabilities"] > maximumAllowedVulnerabilities ||
				codeAnalysisResult["bugs"] > maximumAllowedBugs || codeAnalysisResult["code_smells"] > maximumAllowedCodeSmell) {
				if (env.bypass == 'true') {
					echo "Vulnerability, code smell or bug number overs allowed limits!"
				} else {
					error "Vulnerability, code smell or bug number overs allowed limits!"
				} 
				
			}
		}
	}
}
/*
    - Build all module.
    - change module to build in def buildService
*/
def buildProject(buildType) {
	echo  'Checkout source code'
	jenkinsfile_utils.checkoutSourceCode(buildType)
	
	echo  'Login to Docker Repository'
	withCredentials([usernamePassword(credentialsId: 'chuongpd2_docker', usernameVariable: 'username',
			passwordVariable: 'password')]){
		sh """
			docker --config ~/.docker/.phuhk login -u ${username} -p ${password} 10.60.156.72
		"""
    }

	echo  'Run build script'
	def packageJSON = readJSON file: 'package.json'
    def appVersion = packageJSON.version
    echo "PHK appVersion: ${appVersion}"
	def version = "${appVersion}_u${BUILD_NUMBER}"
	
	sh """
			sh cicd/build.sh ${version}
        """

}

def release2k8s(buildType){
	
	echo  'Checkout sourcecode'
	jenkinsfile_utils.checkoutSourceCode(buildType)
    
	echo  'Wating...'
	sleep(5) 
	
	echo  'Run deploy script'
	def packageJSON = readJSON file: 'package.json'
    def appVersion = packageJSON.version
    echo "PHK appVersion: ${appVersion}"
	def version = "${appVersion}_u${BUILD_NUMBER}"
	
    sh """
		sh cicd/deploy.sh ${version}
    """
}

/*
    - Config các stage run when push commit
    - SonarQube
    - Build
    - Deploy
*/
def buildPushCommit() {
    echo "gitlabBranch: $env.gitlabBranch"
	
	def checkSourceCodeTask = [:]
	
    checkSourceCodeTask['2. SonarQubeScan'] = {
		stage("2. SonarQubeScan") {
			node("${env.node_slave}") {
				// sonarQubeScan("PUSH")
				echo "Skip"
			}
		}
    }
	
    checkSourceCodeTask['3. Unittest And Code Coverage'] = {
		stage("3. Unittest And Code Coverage") {
			node("${env.node_slave}") {
				// unitTestAndCodeCoverage("PUSH")
				echo "Skip"
			}
		}
    }
	
	parallel checkSourceCodeTask
	
	stage("4. Package and build docker image") {
		node("${env.node_slave}") {
			buildProject("PUSH")
		}
	}
	
	stage("5. Deploy to Server Test") {
		node("${env.node_slave}") {
			release2k8s("PUSH")
		}
    }
	
	stage("6. Automations testing in Test") {
		node("${env.node_slave}") {
			echo "Skip autonation test"
		}
    }
	
    currentBuild.result = "SUCCESS"
}

def buildMergeRequest() {

	echo "gitlabBranch: $env.gitlabBranch"
	echo "gitlabTargetBranch: $env.gitlabTargetBranch"
	
	def checkSourceCodeTask = [:]
	
    checkSourceCodeTask['2. SonarQubeScan'] = {
		stage("2. SonarQubeScan") {
			node("${env.node_slave}") {
				// sonarQubeScan("MERGE")
				echo "Skip"
			}
		}
    }
	
    checkSourceCodeTask['3. Unittest And Code Coverage'] = {
		stage("3. Unittest And Code Coverage") {
			node("${env.node_slave}") {
				// unitTestAndCodeCoverage("MERGE")
				echo "Skip"
			}
		}
    }
	
	parallel checkSourceCodeTask
	
	if (env.gitlabTargetBranch == env.STAGING_BRANCH) {
		stage("4. Package and build docker image") {
			node("${env.node_slave}") {
				echo "Skip build staging"
			}
		}
		
		stage("5. Deploy to Server Staging") {
			echo "Skip deploy to staging"
		}
		
		def testTasks = [:]
	
		testTasks['6. Automations testing in Staging'] = {
			stage("6. Automations testing in Staging") {
				node("${env.node_slave}") {
					echo "Skip autonation test"
				}
			}
		}
		
		testTasks['7. Performance test in Staging'] = {
			stage("7. Performance test in Staging") {
				node("${env.node_slave}") {
					echo "Skip Performance test"
				}
			}
		}
		
		parallel testTasks
		
	}else{
		stage("4. Package and build docker image") {
			node("${env.node_slave}") {
				buildProject("MERGE")
			}
		}
		
		stage("5. Deploy to Server Test") {
			node("${env.node_slave}") {
				release2k8s("MERGE")
			}
		}
		
		stage("6. Automations testing in Test") {
			echo "Skip autonation test"
		}
	}
	
    currentBuild.result = "SUCCESS"
}

return [
    buildPushCommit         : this.&buildPushCommit,
    buildMergeRequest       : this.&buildMergeRequest,
    buildAcceptAndCloseMR   : this.&buildAcceptAndCloseMR
    //sonarQubeScan			: this.&sonarQubeScan,
    //buildSerrvice           : this.&buildSerrvice,
	//release2k8s             : this.&release2k8s
    //deploy_module_web    : this.&deploy_module_web,
    //packageServicesAndUploadToRepo: this.&packageServicesAndUploadToRepo

]
