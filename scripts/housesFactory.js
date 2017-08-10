angular
        //Reference to the "RealEstateApp" module defined in app.js
        .module('RealEstateApp')
        //Define the factory, which in this instance, simply returns an array of objects
        //..then give the factory a function with the http passed to it
        .factory('realEstateFactory', function($http) {
            //Function for returning an array of houses
            function getHouses() {
                //Have the http read and retrieve data from the data.json file
                return $http.get('data/data.json');
            }
            //Return the return value of the getHouses function
            return {
                getHouses : getHouses
            };
        });