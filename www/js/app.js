// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app =angular.module('starter', ['ionic']);
app.controller("main_s",function ($scope,$interval,$http) {
  $scope.name;
  $scope.clicky=function clicky(index,it) {
    index = (2*index)+1;
    console.log(index+","+it);
  }
  $scope.res;
  $scope.data;
  $interval(funFunction,1500);
  function funFunction () {
    $http({
      method:"GET",
      url:"https://nameless-ravine-78560.herokuapp.com/led"
  }).then((resopnse)=>{
    return resopnse.data;
  }).then((data)=>{
    $scope.data = data;
    //console.log(data);
    $scope.name=Object.keys(data);
    $scope.res=Object.values(data);
  //  console.log($scope.name);
  //  console.log($scope.res);
let view =[];
    for (let i = 0; i <=3; i++) {
      let myObj ={};
      myObj.name=$scope.name[i];
      myObj.checked=$scope.res[i]==1?true:false;
      view.push(myObj);
    }
  // console.log(view);
  $scope.view=view;
}).catch((e)=>{console.log(e);})}

$scope.fetcher=function fetcher(pos,present) {
  let next;
  next = present==1?0:1;
  pos= 2*pos+next;
  let urlString="https://nameless-ravine-78560.herokuapp.com/led/"+pos;
  console.log(urlString);
  fetch(urlString, {
	method: 'get'
}).then(function(response) {
	console.log("fetched");
  return response.text();
}).then((data)=>{
    console.log(data);
    alert(data);
    //showToast(data, short, bottom);
}).catch(function(err) {
	// Error :(
});
}
})

app.controller("sensors",($scope, $http,$interval)=>{
  $scope.val ;
  $interval(funT,500);
function   funT (){
    $http({
      url:"http://nameless-ravine-78560.herokuapp.com/Sensors",
      method:"GET"
    }).then((response)=>  response.data)
    .then((data)=> {
      console.log(data);
      $scope.val = data;})
  }

})
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
