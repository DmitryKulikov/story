angular.module('loginCtrl', [])


.controller('loginCtrl', function($rootScope, $location, Auth){

        var vm = this;

        vm.loggenIn = Auth.isLoggedIn();

        $rootScope.$on('$routeChangeStart', function(){
            vm.loggenIn = Auth.isLoggedIn();

            Auth.getUser()
                .then(function(data){
                   vm.user = data.data;
                });
        });

        vm.doLogin = function(){
            vm.processing = true;

            vm.error = '';

            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function(data){
                    vm.processing = false;

                    Auth.getUser()
                        .then(function(data){
                            vm.user = data.data;
                        });

                    if(data.success){
                        $location.path('/');
                    } else{
                        vm.error = data.message;
                    }
                });
            }
        vm.doLogout = function(){
            Auth.logout();
            location.path('/logout');
        }

    })

