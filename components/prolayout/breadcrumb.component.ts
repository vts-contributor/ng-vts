import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadCrumb } from './pro-layout.types';

@Component({
    selector: 'prolayout-breadcrumb',
    templateUrl: 'breadcrumb.component.html'
})

export class VtsProlayoutBreadCrumbComponent implements OnInit {
    constructor(
        private route: ActivatedRoute
    ) { }

    breadcrumbs: BreadCrumb[] = [];

    ngOnInit() { 
        this.breadcrumbs = this.buildBreadCrumb(this.route);
    }

    /**
     * Recursively build breadcrumb according to activated route.
     * @param route
     * @param url
     * @param breadcrumbs
     */
    buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
        // If no routeConfig is avalailable we are on the root path\
        let label = ''
        if (route.routeConfig && route.routeConfig.data) {
            label = route.routeConfig.data.breadcrumb;
        } else if (route.snapshot && route.snapshot.data && route.snapshot.data.hasOwnProperty('apiData')) {
            label = route.snapshot.data.apiData.breadcrumb;
        }
        let labelReport: {reportName: string} | undefined;
        route.data.subscribe(value => labelReport = value.report);
        // let isClickable = route.routeConfig && route.routeConfig.data && route.routeConfig.data.isClickable;
        let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

        // If the route is dynamic route such as ':id', remove it
        // const lastRoutePart = path.split('/').pop();
        // const isDynamicRoute = lastRoutePart.startsWith(':');
        // if (isDynamicRoute && !!route.snapshot) {
        //   const paramName = lastRoutePart.split(':')[1];
        //   path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
        //   label = route.snapshot.params[paramName];
        // }
        const lastRoutePart = path?.split('/').pop();
        const isDynamicRoute = lastRoutePart?.startsWith(':');
        if (isDynamicRoute && !!route.snapshot) {
            const paramName = lastRoutePart?.split(':')[1];
            path = path?.replace(lastRoutePart!, route.snapshot.params[paramName!]);
            label = labelReport ? labelReport.reportName : route.snapshot.data.breadcrumb.toString();
        }

        // In the routeConfig the complete path is not available,
        // so we rebuild it each time
        const nextUrl = path ? `${url}/${path}` : url;
        const breadcrumb: BreadCrumb = {
            label: label,
            url: nextUrl,
            status: 'active'
        };
        // Only adding route with non-empty label
        const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            // If we are not on our current path yet,
            // there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }
}