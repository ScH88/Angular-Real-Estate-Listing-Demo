angular
        //Reference to the module in app.js
        .module('RealEstateApp')
        //Define the filter for the module, with an array of listings and the minimum/maximum prices passed to the parameter
        .filter('housesFilter', function () {
            return function (listings, priceInfo) {
                //Variable for an array of filtered objects
                var filtered = [];
                //Variable for the minimum value
                var min = priceInfo.min;
                //Variable for the maximum value
                var max = priceInfo.max;
                //For each entry in the listings array
                angular.forEach(listings, function (listing) {
                    //If the current listing's price is greater/equal to the minimum price, and less/equal to the maximum
                    if (listing.price >= min && listing.price <= max) {
                        //Push the current listing to the filtered array
                        filtered.push(listing);
                    }
                });
                //Return the filtered array
                return filtered;
            };
        });