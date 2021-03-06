'use strict';

var app = angular.module('myApp');


app.service('User', function($http, $rootScope, $cookies, $state, $q, TOKENNAME) {

  this.getProfile = () => {
    return $http.get('/api/users/profile');
  };

  this.readToken = () => {
    let token = $cookies.get(TOKENNAME);

    if(typeof token === 'string') {
      let payload = JSON.parse(atob(token.split('.')[1]));
      $rootScope.currentUser = payload;
    }
  };

  this.register = userObj => {
    return $http.post('/api/users/register', userObj);
  };

  this.login = userObj => {
    console.log("userObj: ", userObj);
    return $http.post('/api/users/login', userObj)
      .then(res => {
        $rootScope.currentUser = res.data;
        console.log("res.data: ",res.data);
        return $q.resolve(res);
      });
  };

  this.logout = () => {
    $cookies.remove(TOKENNAME);
    $rootScope.currentUser = null;
    $state.go('home');
  };

});

app.service('Photo', function($http){
  this.getAll = (id) => {
    return $http.get(`/api/files/${id}`);
  }
  this.deletePhoto = (id) => {
    return $http.delete(`/api/files/${id}`)
  }
})
