angular.module('RealEstateApp').directive('reListing', function () {
     //
    return {
        //Restrict this directive to all elements named "re-listing"
        restrict: 'E',
        //Set the isolated scope of each listing instance, using the details passed to it on the html page
        // = : Two-way binding. Changes in the child scope are propagated to the parent scope and vice-versa
        // e.g. button presses in the template will edit the house, showDetails and editListing values in the parent scope, and this isolated scope can still read their values
        // & : Allows the child scope to pass data to the parent scope
        // e.g. the editHouse function defined in the parent scope is passed over to this isolated scope
        scope: {
            house: '=',
            showDetails: '=',
            editListing: '=',
            editHouse: '&'
        },
        //Every time this listing is overwritten/edited, it will always rewrite itself
        transclude: true,
        //URL for the reListing html page for structuring the data of all re-listing elements
        templateUrl: "templates/directives/reListing.html"
    };
});