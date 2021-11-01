import React from "react";
import {Route, IndexRoute, Router} from "react-router";
import {getAsyncInjectors} from "./core/config/asyncInjector";
import LandingPage from "./core/LandingPage";
import Dashboard from "./core/dashboards/components/DashboardContainer";
import MainLayout from "./core/components/MainLayout";
import LoginForm from "./core/components/LoginForm";
//import DemoPage from "./calculator/DemoPage";
import {screenSizes} from "./core/adminLTE/adminLTE";
import privateRoute from "./core/privateRoute";
import {NavigationManager} from "./core/components/NavigationManager";


function handleOnEnter(state) {
    var body = document.body;
    if (body.clientWidth <= (screenSizes.sm - 1) && body.className.indexOf(" sidebar-open") !== -1) {
        body.className = body.className.replace(' sidebar-open', '');
    }
}


export default (history, onLogout, modules, store) => {
    const navigationManager = new NavigationManager();

    let modulesRoutes = modules.map(module => {
        if (typeof module.routes === 'function') {
            return module.routes(store, navigationManager);
        }
        return module.routes;
    });

    return (
        <Router history={history} onUpdate={handleOnEnter}>
            <Route path="/" name="app" component={privateRoute(MainLayout, navigationManager)} key="root">
                <IndexRoute components={{main: LandingPage}}/>
                {modulesRoutes}
            </Route>

            <Route path="logout" onEnter={onLogout} key="root.logout"/>
            <Route path="login" component={LoginForm} key="root.login"/>

        </Router>

    )
};
