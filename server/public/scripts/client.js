let toDoApp = angular.module('toDoApp', []);

toDoApp.controller('ToDoController', function($http){
    let vm = this;
    vm.toDoArray = [];

    vm.getToDoList = function(){
        console.log('getToDoList');
        $http({
            method: 'GET',
            url: '/todo'
        }).then(function(response){
            console.log('getToDoList GET');
            vm.toDoArray = response.data;
        }).catch(function(error){
            console.log(error);
            alert('there was a problem getting the data');
        })
    }

    vm.addListItem = function(){
        console.log('addListItem');
        let dataToSend = {
            task: vm.input
        }
        $http({
            method: 'POST',
            url: '/todo',
            data: dataToSend
        }).then(function(response){
            console.log('back from server with: ', response);
            vm.getToDoList();
        }).catch(function(error){
            console.log(error);
            alert('there was a problem getting the data');
        })
    }

    vm.getToDoList();
})