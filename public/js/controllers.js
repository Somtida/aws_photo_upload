 'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, User) {
  console.log('mainCtrl!');

  $scope.logout = () => {
    User.logout()
      .then(()=>{
        $state.go('home');
      })
  };
});

app.controller('profileCtrl', function(CurrentUser, $scope) {
  console.log('profileCtrl!');
  console.log('CurrentUser:', CurrentUser);
  $scope.user = CurrentUser;
})

app.controller('photoCtrl', function() {
  console.log('photoCtrl!');

})

app.controller('uploadCtrl', function($scope, Upload, CurrentUser) {
  console.log('uploadCtrl!');
  console.log("CurrentUser: ", CurrentUser);
  //let user = JSON.parse(CurrentUser);
  console.log("user: ", CurrentUser.data._id);
  $scope.submit = () => {
    console.log('submit');
    // console.log('$scope.file: ',$scope.file);
    Upload.upload({
      url: '/api/files',
      data: { file: $scope.file, id: CurrentUser.data._id}
      // data: { file: $scope.file, name: 'Amy'}
    })
    .then(res => {
      console.log("res: ", res);
      $scope.savedImage = res.data;
    })
    .catch(err => {
      console.log("err: ", err);
    })
  }
})

app.controller('loginRegisterCtrl', function($scope, $state, User, SweetAlert) {

  $scope.currentState = $state.current.name;

  $scope.submit = () => {
    console.log('$scope.user:', $scope.user);

    if($scope.currentState === 'login') {
      // login stuff
      User.login($scope.user)
        .then(res => {
          $state.go('home');
          console.log("res: ",res);
        })
        .catch(err => {
          console.log('err:', err);
          swal('Register failed. Error in console.');
        });
    } else {
      // register stuff

      if($scope.user.password !== $scope.user.password2) {
        // passwords don't match
        $scope.user.password = null;
        $scope.user.password2 = null;
        SweetAlert.swal("Passwords must match.  Try again.");
      } else {
        // passwords are good
        User.register($scope.user)
          .then(res => {
            $state.go('login');
          })
          .catch(err => {
            console.log('err:', err);
            SweetAlert.swal('Register failed. Error in console.');
          });
      }
    }
  };

});



app.controller('loginCtrl', function($scope, $state, User) {
  console.log('loginCtrl!');

  console.log('$state:', $state);

  $scope.login = () => {

  };

});
