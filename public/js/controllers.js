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

app.controller('profileCtrl', function(CurrentUser) {
  console.log('profileCtrl!');
  console.log('CurrentUser:', CurrentUser);
})

app.controller('uploadCtrl', function($scope, Upload) {
  console.log('uploadCtrl!');
  $scope.submit = () => {
    console.log('submit');
    // console.log('$scope.file: ',$scope.file);
    Upload.upload({
      url: '/api/files',
      data: { file: $scope.file}
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




// app.controller('stockCtrl', function($scope, Stock, CurrentUser, User, $state){
//   console.log('CurrentUser:', CurrentUser);
//   $scope.currentUser = CurrentUser.data;
//   console.log("stockCtrl");
//   // console.log($scope.currentUser);
//   // console.log("$scope.currentUser.stocks: ",$scope.currentUser.stocks);
//   $scope.myStock = [];
//   let myStocks = $scope.currentUser.stocks;
//   if(myStocks !== []){
//     angular.forEach(myStocks, function(stock){
//       // console.log("my stock: ", stock.symbol);
//       Stock.getStock(stock.symbol)
//         .then(res => {
//           // console.log("res: ", res.data);
//           $scope.myStock.push(res.data);
//           console.log("$scope.myStock: ", $scope.myStock);
//         })
//         .catch(err => {
//           console.log("err: ", err);
//         })
//     })
//   }



  // $scope.refreshPage = () => {
  //   $state.reload('stock');
  // }
  //
  // $scope.deleteAStock = (symbol) => {
  //   // console.log("symbol: ",symbol);
  //   // console.log($scope.currentUser._id);
  //   User.deleteAStock($scope.currentUser._id, symbol.toLowerCase())
  //     .then(res => {
  //       console.log("res.data: ", res.data);
  //       $state.reload('stock');
  //     })
  //     .catch(err => {
  //       console.log("err: ", err);
  //     })
  // }
  //
  //
  // $scope.addStock = () => {
  //   console.log("addStock: ", $scope.addObj.symbol);
  //   console.log("current user: ", $scope.currentUser._id);
  //
  //   User.addStock($scope.currentUser._id, $scope.addObj.symbol.toLowerCase())
  //     .then(res => {
  //       console.log("res.data: ", res.data);
  //       $state.reload('stock');
  //     })
  //     .catch(err => {
  //       console.log("err: ", err);
  //     })
  //
  //
  // }

    // Stock.getStock($scope.searchObj.symbol)
    //   .then(res => {
    //     console.log("res: ", res.data);
    //     if(res.data.Message){
    //       console.log("got message");
    //       $scope.message = res.data.Message;
    //     }else{
    //       $scope.showSearchStock = res.data;
    //       $scope.message = null;
    //
    //       User.addStock($scope.currentUser._id, $scope.addObj.symbol.toLowerCase())
    //         .then(res => {
    //           console.log("res.data: ", res.data);
    //           $state.reload('stock');
    //         })
    //         .catch(err => {
    //           console.log("err: ", err);
    //         })
    //
    //
    //     }
    //   })
    //   .catch(err => {
    //     console.log("err: ", err);
    //   })

  // }

// })
