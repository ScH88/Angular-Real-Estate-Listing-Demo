angular
        //Reference to the "RealEstateApp" module defined in app.js
        .module('RealEstateApp')
        //Chain a controller, with the same name as it's respective file, and an anonymous function that will define the controller body
        //A scope object for the whole page will be passed to the anonymous function, as well as the factory
        .controller('RealEstateController', function ($scope, realEstateFactory) {
            //A variable for the list of houses that the whole scope has access to
            $scope.houses;
            //The default value of the minumum and maximum price values, stored in an array that the scope can access
            $scope.priceInfo = {
                min: 0,
                max: 1000000000
            };
            //Default value for how all house entries will be ordered by
            $scope.orderByVal = "-id";
            //Set a variable for the title of the editor panel, with a default of "Editor"
            $scope.editorMode = "Form Editor";
            //Variable for an array for the event that a new house is created via the form
            $scope.newListing = {};

            //Function for if the "Add House" button is clicked
            $scope.openAddHouse = function () {
                //Set the addListing boolean to true
                $scope.addListing = true;
                //Set the editor mode to "Add House"
                $scope.editorMode = "Add House";
            };
            //Function for adding a new house, with a value (for form data) called newListing passed to the parameter
            $scope.addHouse = function (newListing) {
                //Local variable for the return value of the validate function, passing it the newListing object
                var val = validate(newListing);
                //If the local validation variable returns true
                if (val) {
                    //Set the image value of the form data as the default house image
                    newListing.image = 'default-house';
                    //Set the street number of the new listing's address' street number as an integer version of itself
                    newListing.fullAddress.streetNumber = parseInt(newListing.fullAddress.streetNumber);
                    //Set the street number of the new listing's bedrooms value as an integer version of itself
                    newListing.details.bedrooms = parseInt(newListing.details.bedrooms);
                    //Set the street number of the new listing's bathrooms value as an integer version of itself
                    newListing.details.bathrooms = parseInt(newListing.details.bathrooms);
                    //Set the street number of the new listing's area value as an integer version of itself
                    newListing.details.area = parseInt(newListing.details.area);
                    //Push the new form data to the houses array
                    $scope.houses.push(newListing);
                    //Reset the newListing variable back to an empty array
                    $scope.newListing = {};
                }
            };
            //Function for opening the "edit house" form, with the values array of the house that was clicked on passed to the parameter
            $scope.editHouse = function (house) {
                //Set the scope's addListing boolean to false
                $scope.addListing = false;
                //Set the scope's editListing value to true, opening the edit house form
                $scope.editListing = true;
                //Set the scope's existing listing value as the house passed to the parameter
                $scope.existingListing = house;
                //Set the editor mode title back to "Editor"
                $scope.editorMode = "Edit House";
                //Call the removeWarnings function
                removeWarnings();
            };
            //Function for saving a house that has been edited
            $scope.saveHouseEdit = function (existingListing) {
                //Local variable for the return value of the validate function, passing it the scope's existingListing
                var val = validate(existingListing);
                //If the validation boolean is true
                if (val) {
                    //Reset the value of the existing listing back to an empty array
                    $scope.existingListing = {};
                    //Set the editListing value of the scope back to false, closing the "edit house" form
                    $scope.editListing = false;
                    //Set the editor mode title back to "Editor"
                    $scope.editorMode = "Editor";
                }
            };
            //Function for deleting a house from the array, with a listing value passed to the parameter
            $scope.deleteHouse = function (listing) {
                //Variable for storing the index value of the listing in the parameter
                var index = $scope.houses.indexOf(listing);
                //Call the splice function on the houses array to remove the item indicated by the index. Set optional value to 1 to remove just 1 item
                $scope.houses.splice(index, 1);
                //Reset the value of the existing listing back to an empty array
                $scope.existingListing = {};
                //Set the editListing value of the scope back to false, closing the "edit house" form
                $scope.editListing = false;
                //Set the editor mode title back to "Editor"
                $scope.editorMode = "Editor";
            };
            //Function for setting both the addListing and editListing booleans to false
            $scope.reset = function () {
                //Set the scope's addListing boolean to false
                $scope.addListing = false;
                //Set the scope's editListing boolean to false
                $scope.editListing = false;
                //Set the editor mode title back to "Editor"
                $scope.editorMode = "Editor";
                //Call the removeWarnings function
                removeWarnings();
                //Reset the value of the existing listing back to an empty array
                $scope.existingListing = {};
                //Reset the newListing variable back to an empty array
                $scope.newListing = {};
            };

            //Function for closing the "Edit" form
            $scope.closeEditForm = function (house) {
                //Variable for storing the return value of the validate function, with the house form data passed to it
                var val = validate(house);
                //If the validate function returns true
                if (val) {
                    //Call the reset function
                    this.reset();
                }
            };

            removeWarnings = function () {
                //Set the scope's address validation variable to null
                $scope.addrValid = "";
                //Set the scope's price validation variable to null
                $scope.priceValid = "";
                //Set the scope's property type validation variable to null
                $scope.proptValid = "";
                //Set the scope's description validation variable to null
                $scope.descrValid = "";
                //Set the scope's beds validation variable to null
                $scope.bedsValid = "";
                //Set the scope's baths validation variable to null
                $scope.bathsValid = "";
                //Set the scope's area validation variable to null
                $scope.sqrValid = "";
            };

            validate = function (house) {
                //Local variable for form validation, with default value of true
                var validation = true;
                //If the house's address field is empty
                if (!house.fullAddress) {
                    //Set the local validation boolean to false
                    validation = false;
                    //Set the scope's address validation variable as the following
                    $scope.addrValid = "Address is invalid";
                } else {
                    //If the house's address' street number is entered, but the street name is left blank
                    if (house.fullAddress.streetNumber && !house.fullAddress.streetName) {
                        //Set the local validation boolean to false
                        validation = false;
                        //Set the scope's address validation variable as the following
                        $scope.addrValid = "Street Name Is invalid";
                    //If the house's address' street number is left blank, but the street name is entered
                    } else if (!house.fullAddress.streetNumber && house.fullAddress.streetName) {
                        //Set the local validation boolean to false
                        validation = false;
                        //Set the scope's address validation variable as the following
                        $scope.addrValid = "Street Number Is invalid";
                    //Otherwise
                    } else {
                        //If the rest of the address string contains any characters other than text/spaces
                        if (!/^[a-zA-Z\s]*$/.test(house.fullAddress.streetName)) {
                            //Set the local validation boolean to false
                            validation = false;
                            //Set the scope's address validation variable as the following
                            $scope.addrValid = "The rest of address must be only letters";
                        //Otherwise
                        } else {
                            //Set the scope's address validation variable to null
                            $scope.addrValid = "";
                        }
                    }
                } 
                //If the house's price field is empty
                if (!house.price) {
                    //Set the local validation boolean to false
                    validation = false;
                    //Set the scope's price validation variable as the following
                    $scope.priceValid = "Price is invalid";
                //Otherwise
                } else {
                    //Set the scope's price validation variable to null
                    $scope.priceValid = "";
                }
                //If the house's type field is empty
                if (!house.type) {
                    //Set the local validation boolean to false
                    validation = false;
                    //Set the scope's property type validation variable as the following
                    $scope.proptValid = "Property Type is invalid";
                //Otherwise
                } else {
                    //Set the scope's property type validation variable to null
                    $scope.proptValid = "";
                }
                //If the house's description field is empty
                if (!house.description) {
                    //Set the local validation boolean to false
                    validation = false;
                    //Set the scope's description validation variable as the following
                    $scope.descrValid = "Description is invalid";
                //Otherwise
                } else {
                    //Set the scope's description validation variable to null
                    $scope.descrValid = "";
                }
                //If the house's details array field is empty
                if (!house.details) {
                    //Set the local validation boolean to false
                    validation = false;
                    //Set the scope's beds validation variable as the following
                    $scope.bedsValid = "Beds is invalid";
                    //Set the scope's bathrooms validation variable as the following
                    $scope.bathsValid = "Bathrooms is invalid";
                    //Set the scope's area validation variable as the following
                    $scope.sqrValid = "Area value is invalid";
                //Otherwise
                } else {
                    //If the house's details array's bedrooms field is empty
                    if (!house.details.bedrooms) {
                        //Set the local validation boolean to false
                        validation = false;
                        //Set the scope's beds validation variable as the following
                        $scope.bedsValid = "Beds value is invalid";
                    //Otherwise
                    } else {
                        //Set the scope's beds validation variable to null
                        $scope.bedsValid = "";
                    }
                    //If the house's details array's bathrooms field is empty
                    if (!house.details.bathrooms) {
                        //Set the local validation boolean to false
                        validation = false;
                        //Set the scope's baths validation variable as the following
                        $scope.bathsValid = "Bathrooms value is invalid";
                    //Otherwise
                    } else {
                        //Set the scope's baths validation variable to null
                        $scope.bathsValid = "";
                    }
                    //If the house's details array's area field is empty
                    if (!house.details.area) {
                        //Set the local validation boolean to false
                        validation = false;
                        //Set the scope's area validation variable as the following
                        $scope.sqrValid = "Area value is empty";
                    //Otherwise
                    } else {
                        //Set the scope's area validation variable to null
                        $scope.sqrValid = "";
                    }
                }
                //Return the validation boolean
                return validation;
            };
            //Function for sorting all house entries by a value
            $scope.sortTypeOnChange = function () {
                //Set the scope's orderbyVal value as the scope's orderFormVal (value returned by the order type drop-down menu)
                $scope.orderByVal = $scope.orderFormVal;
            };
            //Function for sorting all houses in ascending order
            $scope.ascendResults = function () {
                //If the first character in the orderByVal variable is a "-"
                if ($scope.orderByVal.charAt(0) === "-") {
                    //Set the orderByVal variable's value as a substring of all characters after the first character
                    //This ensures all house entries are sorted in ascending order
                    $scope.orderByVal = $scope.orderByVal.substring(1);
                }
            };
            //Function for sorting all houses in descending order
            $scope.descendResults = function () {
                //If the first character in the orderByVal variable is not a -
                if ($scope.orderByVal.charAt(0) !== "-") {
                    //Set the orderByVal variable's value as the same, but with a "-" prefixed to it
                    //This ensures all house entries are sorted in descending order
                    $scope.orderByVal = "-" + $scope.orderByVal;
                }
            };
            //Function for converting a house's price vale straight to int on change
            //This prevents it from turning to string and removing it from array (as ng-change is called before ng-model is updated)
            $scope.convertPriceToInt = function(inputVal) {
                //Set the price value of the existingListing as an integer version of itse;f
                $scope.existingListing.price = parseInt(inputVal);
            };

            //Call the realEstateFactory's getHouses function, then call a function which acts according to the response
            realEstateFactory.getHouses().then(function (response) {
                //Fill the houses array wtih the response's data
                $scope.houses = response.data;
            });
        });