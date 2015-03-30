angular.module('starter.directives', [])

.directive("resize", function($window){
    
    return {
        restrict: "A",
        link: function(scope,element){

            var w = $window;

            scope.getWindowDimensions = function() {
                return { 'h': w.innerHeight, 'w': w.innerWidth };
            };

            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                
                scope.style = function () {
                    return { 
                        'height': (newValue.h) + 'px',
                        'width': (newValue.w) + 'px' 
                    };
                };

            }, true);


            
            // w.bind('resize', function () {
            //     scope.$apply();
            // });

        }
    }

});