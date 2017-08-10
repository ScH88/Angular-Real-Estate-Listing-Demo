angular.module('RealEstateApp').directive('numberOnly', function () {
    //Return the following...
    return {
        //Require the ngModel value passed from any input tags this directive is defined in
        require: 'ngModel',
        //Link a function to this directive, passing it the scope, an element, attributes and the modelcontroller (the former 3 have not been used in this case)
        //Model Controller: Provides API for ngModel. Contains services for data-binding, validation, CSS updates, and value formatting and parsing.
        link: function(scope, element, attrs, modelCtrl) {
            //Push a function/return value to the model controller's parsers list
            //Pass the input value to the function's parameter
            modelCtrl.$parsers.push(function (inputValue) {
                //Variable for transformed input, for the input value passed to the parameter
                //If there is a value detected, replace any characters besides numbers (e.g number-only="[0-9]") with '' (i.e delete it)
                //Otherwise, set it to null
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;
                //If the transformed input does not have the same value as the parameter input value
                //(i.e If the parameter input value has any strings that are omitted from the transformed input)
                if (transformedInput !== inputValue) {
                    //Set the view/input value as the newly transformed input/null value
                    modelCtrl.$setViewValue(transformedInput);
                    //Update the model controller in order to show the new value
                    modelCtrl.$render();
                }
                //Return the transformed input value
                return transformedInput;
            });
        }
    };
});