angular.module('RealEstateApp').directive('inputLimit', function () {
    return {
        //Restrict this directive to html tags containing this directive name as attributes
        restrict: "A",
        //Require the ng model value from inputs containing this directive
        require: 'ngModel',
        //Link a function to this directive, containing the scope, element(not used), attributes and the ng model
        link: function (scope, element, attrs, ngModel) {
            //Set ngTrim to false, ensuring Angular does not automatically trim the input
            attrs.$set("ngTrim", "false");
            //Local variable for the maximum number of characters in a field
            //Each input field has it's own defined character limit (Each input tag has an attribute of inputLimit. E.g data-input-limit="9")
            var limitLength = parseInt(attrs.inputLimit);
            //Attach a watch function to the scope, passing it the ngModel value of the html tag and a function
            //The $watch acts as an action listener
            scope.$watch(attrs.ngModel, function (newValue) {
                //If the actual input value from the ngModel value has a greater length than the local maximum
                if (ngModel.$viewValue.length > limitLength) {
                    //Set the view/input value as a substring between the start of the string and the character limit
                    ngModel.$setViewValue(ngModel.$viewValue.substring(0, limitLength));
                    //Update the ngModel with the new value
                    ngModel.$render();
                }
            });
        }
    };
});