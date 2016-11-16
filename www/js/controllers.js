angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();
	$scope.remove = function (chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
	$scope.settings = {
		enableFriends: true
	};
})

.controller('categoriesController', ['$scope', 'fetch', function ($scope, fetch) {

	fetch.getAll()
		.then(function (response) {
			$scope.allData = response.data;
		}, function (error) {
			//error
		});
	}])

.controller('categoryController', ['$scope', '$stateParams', 'fetch', function ($scope, $stateParams, fetch) {

	$scope.allData = [];
	$scope.books = [];
	$scope.showBooks = [];
	//console.log($stateParams);
	fetch.getAll()
		.then(function (response) {
			$scope.allData = response.data;
			$scope.books = $scope.allData.books;
			//console.log($scope.books);
			$scope.categoryId = $stateParams.categoryID;
			$scope.categoryTitle = $stateParams.categoryTitle;

			//this gets the right books for the category
			var numBooks = $scope.books.length;
			for (var i = 0; i < numBooks; i++) {
				//console.log($scope.books[i]._id);
				//console.log($scope.categoryId);
				if ($scope.books[i].cat_id == $scope.categoryId) {
					$scope.showBooks.push($scope.books[i]);
					//console.log($scope.showBooks);
				}
			}
		}, function (error) {
			//error
		});
	}])

.controller('productController', ['$scope', 'fetch', '$stateParams', function ($scope, fetch, $stateParams) {
	$scope.allData = [];
	$scope.books = [];
	$scope.product = [];

	fetch.getAll()
		.then(function (response) {
			$scope.allData = response.data;
			$scope.books = $scope.allData.books;
			$scope.bookId = $stateParams.productID;
			//console.log($scope.bookId);
			//console.log($stateParams.productID);

			var numBooks = $scope.books.length;
			for (var i = 0; i < numBooks; i++) {
				if ($scope.books[i]._id == $scope.bookId) {
					//console.log($scope.showBooks);
					$scope.title = $scope.books[i].title;
					$scope.price = $scope.books[i].price;
					$scope.rating = $scope.books[i].rating;
					$scope.sDesc = $scope.books[i].short_description;
					$scope.lDesc = $scope.books[i].long_description;
					//$scope.ratingsObject.rating = 5;
					if (localStorage.getItem($scope.bookId) == null) {
						$scope.ratingsObject.rating = $scope.books[i].rating;
					} else {
						$scope.ratingsObject.rating = localStorage.getItem($scope.bookId);
						$scope.rating = localStorage.getItem($scope.bookId);
					}
					//console.log($scope.title);
				}
			}
		}, function (error) {
			//error
		});

	$scope.ratingsObject = {
		iconOn: 'ion-ios-star',
		iconOff: 'ion-ios-star-outline',
		iconOnColor: 'rgb(83, 83, 83)',
		iconOffColor: 'rgb(83, 83, 83)',
		rating: 3,
		minRating: 1,
		callback: function (rating) {
			$scope.ratingsCallback(rating);
		}
	};
	$scope.ratingsCallback = function (rating) {
		console.log('Selected rating is : ', rating);
		localStorage.setItem($scope.bookId, rating);

		$scope.rating = localStorage.getItem($scope.bookId);
	};
	console.log($scope.bookId);
	$scope.ratingsObject.rating = localStorage.getItem($scope.bookId);
	}]);
