/**
 * Created by cosmincartas on 1/5/17.
 */
(function(){
    'use strict';
    angular.module('announcements-app')
        .controller("AnnouncementsController", AnnouncementsController)
    AnnouncementsController.$inject = ['$scope','$state', '$uibModal','AnnouncementsService']

    function AnnouncementsController($scope,$state, $uibModal, AnnouncementsService){
        $(document).on('click', '.below button', function(){
            var belowCard = $('.below'),
                aboveCard = $('.above'),
                parent = $('.form-collection');
            parent.addClass('animation-state-1');
            setTimeout(function(){
                belowCard.removeClass('below');
                aboveCard.removeClass('above');
                belowCard.addClass('above');
                aboveCard.addClass('below');
                setTimeout(function(){
                    parent.addClass('animation-state-finish');
                    parent.removeClass('animation-state-1');
                    setTimeout(function(){
                        aboveCard.addClass('turned');
                        belowCard.removeClass('turned');
                        parent.removeClass('animation-state-finish');
                    }, 300)
                }, 10)
            }, 300);
        });



        $scope.registerUser = function(){
            return AnnouncementsService.registerUser($scope.name, $scope.username, $scope.password).then(function(data){
                console.log(data);
                $scope.name = "";
                $scope.username= "";
                $scope.password = "";
            })
        }

        $scope.loginUser = function(){
            if($scope.user != null && $scope.pass != null) {
                return AnnouncementsService.loginUser($scope.user, $scope.pass).then(function (data) {
                    $scope.loggedUser = data.data[0];
                    if ($scope.loggedUser != null) {
                        AnnouncementsService.setLoggedInUser($scope.loggedUser);
                        $state.go("dashboard")
                    }
                    else {
                        console.log("login failed")
                    }
                })
            }
        }
        $scope.getAllAnnouncements = function(){
            return AnnouncementsService.getAllAnnouncements().then(function(data){
                $scope.announcements = data.data;
            })
        }
        $scope.createAnnouncement = function(){
            var loggedUser = AnnouncementsService.getLoggedInUser()
            if(loggedUser)
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'views/createModal.html',
                    size: 'lg',
                    controller: function($scope, $uibModalInstance){
                        $scope.saveAnnouncement = function(){
                            AnnouncementsService.createAnnouncement(loggedUser.name,
                                loggedUser.email,
                                $scope.title, $scope.content).then(function(data){
                                    $uibModalInstance.close();
                                    $state.go($state.current,{},{reload:true})
                                }).catch(function(error){
                                    console.log(error)
                                })
                            }

                            $scope.cancelAnnouncement = () => {
                                $uibModalInstance.close()
                            }
                        }
                    })
            else
                $state.go('login')
        }
        $scope.manageAnnouncements = function(){
            $state.go('announcements')
        }

        $scope.getUsersAnnouncements = function(){
            if(AnnouncementsService.getLoggedInUser())
                return AnnouncementsService.getUsersAnnouncements(AnnouncementsService.getLoggedInUser().email).then(function(data){
                    $scope.usersAnnouncements = data.data;
                })
            else
                $state.go('login')
        }

        $scope.updateModal = function(id){
            var loggedUser = AnnouncementsService.getLoggedInUser()
            if(loggedUser)
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/updateModal.html',
                    resolve: {
                        id: () => id
                    },
                    controller: function($scope, $uibModalInstance, id){
                        $scope.updateAnnouncement = function(){
                            AnnouncementsService.updateAnnouncement(id,$scope.title,$scope.content).then(data => {
                                $uibModalInstance.close();
                                $state.go($state.current,{},{reload:true})
                            }).catch(error => {
                                console.log(error)
                            })
                        }
                        $scope.closeModal = () => {
                            $uibModalInstance.close()
                        }
                    }
                })
            else
                $state.go('login')
        }

        $scope.deleteModal = function(id){
            var loggedUser = AnnouncementsService.getLoggedInUser()
            if(loggedUser)
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/deleteModal.html',
                    resolve: {
                        id: () => id
                    },
                    controller: function($scope, $uibModalInstance, id){
                        $scope.deleteAnnouncement = function(){
                            var loggedUser = AnnouncementsService.getLoggedInUser()
                            if(loggedUser)
                                AnnouncementsService.deleteAnnouncement(id).then(data => {
                                    $uibModalInstance.close();
                                    $state.go($state.current,{},{reload:true})
                                }).catch(error => {
                                    console.log(error)
                                })
                            }
                            $scope.closeModal = () => {
                                $uibModalInstance.close()
                            }
                        }
                    })
            else
                $state.go('login')
        }

    }
})()