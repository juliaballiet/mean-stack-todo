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
            console.log('back from server with: ', response.data);
            vm.toDoArray = response.data;
        }).catch(function(error){
            console.log(error);
            alert('there was a problem getting the data');
        })
    }

    vm.addListItem = function(){
        console.log('addListItem');
        let dataToSend = {
            task: vm.input,
            category: vm.category
        }
        $http({
            method: 'POST',
            url: '/todo',
            data: dataToSend
        }).then(function(response){
            console.log('back from server with: ', response);
            vm.getToDoList();
            vm.input = ''
        }).catch(function(error){
            console.log(error);
            alert('there was a problem getting the data');
        })
    }

    vm.deleteTask = function(id){
        let confirmation = confirm('are you sure?');
        if(confirmation == true){
            $http({
                method: 'DELETE',
                url: '/todo/' + id
            }).then(function(response){
                console.log('back from server with: ', response);
                vm.getToDoList();
            }).catch(function(error){
                console.log(error);
                alert('there was a problem deleting the data');
            })
        }
        
    }

    vm.completeTask = function(id){
        $http({
            method: 'PUT',
            url: '/todo/complete/' + id
        }).then(function(response){
            console.log('back from server with: ', response);
            vm.getToDoList();
        }).catch(function(error){
            console.log(error);
            alert('there was a problem completing the task');
        })
    }

    vm.getToDoList();
})