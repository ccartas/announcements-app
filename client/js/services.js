/**
 * Created by cosmincartas on 1/5/17.
 */
(function(){
    'use strict'
    angular.module('announcements-app')
        .factory('AnnouncementsService', AnnouncementsService)
    AnnouncementsService.$inject = ['$http']

    function AnnouncementsService($http){
        var service = {
            registerUser: registerUser,
            loginUser: loginUser
        }
        return service;

        function registerUser(name, email, password){
           return $http({
                method:"POST",
                url:"/register",
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                data: 'name='+name+'&username='+email+'&password='+password
            })
        }

        function loginUser(username, password){
            return $http({
                method:"POST",
                url:"/login",
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                data:"username="+username+"&password="+password
            })
        }
    }
})()