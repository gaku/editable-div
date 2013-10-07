// This requires jQuery.
var module = angular.module('editableDiv', []);

module.directive('editableDiv', function() {
    var highlightColor = "#ffeb80";

    return  {
        restrict: 'A',
        require: '^ngModel',
        scope: {
            ngModel:'=ngModel',
            callback: '=',
            placeHolder: '@'
        },
        template: '<input ng-model="ngModel" class="editable-div editable-div-input"></input><div class="editable-div editable-div-display"></div>',
        link: function($scope, $element, $attr) {
            $scope.div = jQuery($element).find('.editable-div-display');
            $scope.input = jQuery($element).find('.editable-div-input');
            $scope.originalDivBackground = $scope.div.css('background-color');

            var originalValue;
            $scope.div.bind('click', function() {
                originalValue = $scope.ngModel;
                // get the cursor offset from display DIV
                var sel = window.getSelection();
                var offset = sel.focusOffset;
                // hide DIV and show INPUT
                $scope.div.css('display', 'none');
                $scope.input.css('display','block');
                $scope.input.focus();
                // Move cursor to the same offset
                var node = $scope.input.get(0);
                node.setSelectionRange(offset,offset);
            });
            $scope.input.bind('blur', function() {
                if ($scope.callback) {
                    $scope.callback();
                }
                $scope.div.css('display', 'block');
                $scope.input.css('display', 'none');
                $scope.refresh();
            });

            $scope.div.bind('mouseover', function() {
                $scope.div.css('background-color', highlightColor);
            });
            $scope.div.bind('mouseout', function() {
                $scope.div.css('background-color', '');  // Removing CSS from DIV
            });
            $element.bind('keydown', function(event) {
                console.log(event.which);
                if (event.which == 13) {
                    event.target.blur();
                } else if (event.which == 27) {
                    // ESC key
                    $scope.ngModel = originalValue;
                    $scope.$apply();
                    event.target.blur();
                }
            });

            $scope.refresh = function() {
                var displayHtml;
                if ($scope.ngModel == '' || $scope.ngModel == undefined) {
                    $scope.div.addClass('editablediv-placeholder');
                    if ($scope.placeHolder) {
                        displayHtml = $scope.placeHolder;
                    } else {
                        displayHtml = '&nbsp;'
                    }
                } else {
                    $scope.div.removeClass('editablediv-placeholder');
                    displayHtml = $scope.ngModel;
                }
                $scope.div.html(displayHtml);
            }

            $scope.$watch('ngModel', $scope.refresh);

            // initialize
            $scope.input.css('display', 'none');
            $scope.input.css('background', highlightColor);
        },
        controller: function($scope) {
            /*
             $scope.$watch('ngModel', function() {
             console.log("update");
             $scope.div.text($scope.ngModel)
             console.log("div value:" + $scope.div.html());

             console.log("div: " + $scope.div.css('height'));
             console.log("textarea: " + $scope.textarea.css('height'));

             //
             $scope.textarea.css('height', $scope.div.css('height'));

             });
             */
        }
    }
});