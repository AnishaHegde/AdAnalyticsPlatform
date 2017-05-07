var app = angular.module('indexApp', []);

app.controller('indexCtrl', function($scope, $http, $compile, $window) {

	/*Render Login Page*/
	$scope.renderLogin = function() {
		$http({
			method : "GET",
			url : '/redirect/login',
		}).success(function(data) {
			//debugger;
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				window.location.assign("/users/login");
			}
			else {
				window.location.assign("/");
			}
		}).error(function(error) {
			window.location.assign("/");
		});
	};
	/*End Render Login Page*/
});



app.controller('registerCtrl', function($scope, $http, $compile, $window) {

	/*Submit Register Page*/
	$scope.register = function() {
		$http({
			method : "POST",
			url : '/register',
			data : {
				fName: $scope.fName,
				lName: $scope.lName,
				phone: $scope.phone,
				pass : $scope.pass,
				email : $scope.email,
				street : $scope.street,
				city : $scope.city,
				state : $scope.state,
				zipcode : $scope.zipcode
			}
		}).success(function(data) {
			if (data.statusCode == 200) {
				window.location.assign("/users/login");
			}//end if
			else {
				window.location.assign("/users/register");
			}
		}).error(function(error) {
			window.location.assign("/users/register");
		});
	};
	/*End submit Register Page*/
});



app.controller('loginCtrl', function($scope, $http, $compile, $window) {

	/*Login*/
	$scope.login = function() {
		console.log("Inside login");
		$http({
			method : "POST",
			url : '/login',
			data : {
				email : $scope.email,
				pass : $scope.pass
			}
		}).success(function(data) {
			if (data.statusCode == 200) {
				window.location.assign("/users/" + data.fname);
			}
			else {
				//window.location.assign("/users/login?email=" + user_email);
				window.location.assign("/users/login");
			}

		}).error(function(error) {
			window.location.assign("/users/login");
		});
	};
	/*End Login*/

	/*Render Register Page*/
	$scope.renderRegister = function() {
		$http({
			method : "GET",
			url : '/redirect/register',
		}).success(function(data) {
			if (data.statusCode == 200) {
				window.location.assign("/users/register");
			}//end if
			else {
				window.location.assign("/");
			}

		}).error(function(error) {
			window.location.assign("/");
		});
	};
	/*End Render Register Page*/
});

app.controller('adFormCtrl', function($scope, $http, $compile, $window) {

	/*Submit ad form page*/
	$scope.submitAdForm = function() {
		$http({
			method : "POST",
			url : '/users/ad-planning-wizard/anisha',
			data : {
				'product_title' : $scope.product_title,
				'product_description' : $scope.product_description,
				'product_category' : $scope.product_category,
				'other_product_category' : $scope.other_product_category || null,
				'age_max' : $scope.age_max,
				'age_min' : $scope.age_min,
				'gender' : $scope.gender,
				'budget' : $scope.budget,
				'city' : $scope.city
			}
		}).success(function(data) {
			if (data.statusCode == 200) {
				window.location.assign("/users/ad-recommendation/anisha");
			}//end if
			else {
				$window.location.href = '/users/ad-planning-wizard/anisha';
			}

		}).error(function(error) {
			$window.location.href = '/users/ad-planning-wizard/anisha';
		});


	};
	/*End Submit ad form page*/
});

app.controller('homeCtrl', function($scope, $http, $compile, $window) {

	/*Submit ad form page*/
	$scope.loadHistory = function() {
		console.log("Inside load history");
		var fullName = document.getElementById('fullName').innerHTML;
		var fullNameSplit = fullName.split(" ");
		$scope.fname = fullNameSplit[0];

		$http({
			method : "GET",
			url : '/users/history/' + fullNameSplit[0]
		}).success(function(data) {
			if (data.statusCode == 200) {
				//console.log(data.userdata.adPlan);

				var adPlanArray = [];

				for(var i = 0; i < data.userdata.adPlan.length; i++){

					var total_budget = data.userdata.adPlan[i].budget;
					var product_category = data.userdata.adPlan[i].productCategory;
					var platformID = data.userdata.adPlan[i].platformID;

					var total_count = parseInt(platformID['1']) + parseInt(platformID['2']) + parseInt(platformID['3']) + parseInt(platformID['4']) + parseInt(platformID['5']);

					platformID['1'] = (parseInt(platformID['1']) * total_budget) / total_count;
					platformID['2'] = (parseInt(platformID['2']) * total_budget) / total_count;
					platformID['3'] = (parseInt(platformID['3']) * total_budget) / total_count;
					platformID['4'] = (parseInt(platformID['4']) * total_budget) / total_count;
					platformID['5'] = (parseInt(platformID['5']) * total_budget) / total_count;

					var platforms = {
						"Platform" : "Budget",
						"You Tube" : platformID['1'],
						"Facebook" : platformID['2'],
						"Twitter" : platformID['3'],
						"LinkedIn" : platformID['4'],
						"Google AdWords" : platformID['5']
					}

					var json_obj = {'product_category' : product_category, 'platforms' : platforms};
					console.log(json_obj);

					adPlanArray.push(json_obj);
				}

				$scope.adPlanArray = adPlanArray;

			}

		}).error(function(error) {

		});


	};
	/*End Submit ad form page*/
});