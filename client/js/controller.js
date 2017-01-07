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
            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'views/createModal.html',
                size: 'lg',
                controller: function($scope, $uibModalInstance){
                    $scope.saveAnnouncement = function(){
                        console.log(AnnouncementsService.getLoggedInUser())
                        AnnouncementsService.createAnnouncement(AnnouncementsService.getLoggedInUser().name,
                                                                AnnouncementsService.getLoggedInUser().email,
                                                                $scope.title, $scope.content).then(function(data){
                            console.log(data)
                            $uibModalInstance.close();
                        })
                    }
                }
            })
        }
        $scope.manageAnnouncements = function(){
            $state.go('announcements')
        }
        $scope.getUsersAnnouncements = function(){
            return AnnouncementsService.getUsersAnnouncements(AnnouncementsService.getLoggedInUser().email).then(function(data){
                $scope.usersAnnouncements = data.data;
                console.log($scope.usersAnnouncements)
            })
        }
    }
})()