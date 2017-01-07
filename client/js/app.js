/**
 * Created by cosmincartas on 1/5/17.
 */
(function(){
    'use strict';

    angular.module('announcements-app',['ui.router','ui.bootstrap'])
        .config(config)
    function config($urlRouterProvider, $stateProvider){

        $urlRouterProvider.otherwise('login')

        $stateProvider.state('login',{
            url:"/login",
            templateUrl:"/views/login.html"
        })
        $stateProvider.state("dashboard",{
            url:"/dashboard",
            templateUrl:"/views/dashboard.html"
        })
        $stateProvider.state("announcements",{
            url:"/announcements",
            templateUrl:"/views/announcements.html"
        })
    }
})()