let toDoApp = angular.module('toDoApp', []);

toDoApp.controller('ToDoController', function($http){
    let vm = this;
    vm.toDoArray = [];
    vm.completeArray = [];

    vm.filterByValue = '';

    vm.getToDoList = function(){
        console.log('getToDoList');
        vm.toDoArray = [];
        vm.completeArray = [];
        $http({
            method: 'GET',
            url: '/todo'
        }).then(function(response){
            console.log('back from server with: ', response.data);
            arrayFromServer = response.data;
            for (let task of arrayFromServer) {
                if (task.completed === true){
                    vm.completeArray.push(task);
                } else {
                    vm.toDoArray.push(task);
                }
            }
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

    vm.changeFilter = function(filter){
        console.log('change to: ', filter);
        vm.filterByValue = filter;
    }

    vm.getToDoList();
})