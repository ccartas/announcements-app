/**
 * Created by cosmincartas on 1/5/17.
 */
(function(){
    'use strict';
    angular.module('announcements-app')
        .controller("AnnouncementsController", AnnouncementsController)
    AnnouncementsController.$inject = ['$scope','$state','AnnouncementsService']

    function AnnouncementsController($scope,$state, AnnouncementsService){
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
            return AnnouncementsService.loginUser($scope.user, $scope.pass).then(function(data){
                $scope.loggedUser = data.data[0];
                if($scope.loggedUser != null){
                    $state.go("dashboard")
                }
                else
                {
                    console.log("login failed")
                }
            })
        }
    }
})()