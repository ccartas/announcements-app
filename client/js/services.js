/**
 * Created by cosmincartas on 1/5/17.
 */
(function(){
    'use strict'
    angular.module('announcements-app')
        .factory('AnnouncementsService', AnnouncementsService)
    AnnouncementsService.$inject = ['$http']

    function AnnouncementsService($http){
        var loggedUser = null;
        var service = {
            registerUser: registerUser,
            loginUser: loginUser,
            setLoggedInUser: setLoggedInUser,
            getLoggedInUser: getLoggedInUser,
            createAnnouncement: createAnnouncement,
            getAllAnnouncements: getAllAnnouncements,
            getUsersAnnouncements: getUsersAnnouncements,
            updateAnnouncement: updateAnnouncement,
            deleteAnnouncement: deleteAnnouncement
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

        function setLoggedInUser(user){
            loggedUser = user;
        }
        function getLoggedInUser(){
            return loggedUser;
        }

        function createAnnouncement(name, user, title, content){
            return $http({
                method:"POST",
                url:"/create",
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                data:"name="+name+"&user="+user+"&title="+title+"&content="+content
            })
        }
        function getAllAnnouncements(){
            return $http({
                method:"GET",
                url:"/get-announcements"
            })
        }
        function getUsersAnnouncements(user){
            return $http({
                method:"POST",
                url:"/user-announcement",
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                data:"user="+user
            })
        }

        function updateAnnouncement(id,new_title,new_content){
            return $http({
                method:"PUT",
                url:"/edit-announcement",
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                data:"id="+id+"&title="+new_title+"&content="+new_content
            })
        }

        function deleteAnnouncement(id){
            return $http({
                method:"PUT",
                url:"/delete-announcement",
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                data:"id="+id
            })
        }
    }
})()