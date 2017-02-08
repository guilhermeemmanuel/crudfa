angular.module("storageExample").controller("contactCtrl", function($scope) {
	if(typeof(Storage) !== "undefined") {
		console.log("Your browser supports local Storage");
				
		if(localStorage.contacts == undefined) {
			localStorage.contacts = JSON.stringify([]);
			$scope.contacts = JSON.parse(localStorage.getItem('contacts'));
			console.log("Creation of contacts");			
		}
		else {		
			$scope.contacts = JSON.parse(localStorage.getItem('contacts'));
			console.log("Retrieve of Contacts");
					
		}
				
	} else {
		console.log("Your browser does not support local Storage");
	}
	
	$scope.addContact = function(contact) {
		$scope.contacts = JSON.parse(localStorage.getItem('contacts'));
		$scope.contacts.push(angular.copy(contact));
		localStorage.setItem("contacts", JSON.stringify($scope.contacts));
		$scope.eraseContactForm();
		
	}
	$scope.eraseContactForm = function() {
		delete $scope.contact;
		$scope.contactForm.$setPristine();
	}
});