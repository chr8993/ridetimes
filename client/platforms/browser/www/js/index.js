angular.module("ridetimes", ["angular.filter"]);

angular.module("ridetimes")
.controller("ridesCtrl", function($scope, $q, $http) {
  $scope.rides = [];
  $scope.loadRides = function() {
    var d = $q.defer();
    var url = "http://192.168.86.91";
    url += ":3030/ridetimes";
    $http({
      url: url,
      method: "GET"
    })
    .success(function(res) {
      if(res) {
        $scope.rides = res;
        d.resolve(true);
      }
    });
    return d.promise;
  };
});

angular.module('ridetimes')
  .directive('dotLoader',
  function() {
      var html;
      return {
          restrict: 'A',
          template: function(element, attrs) {

              html =  "<div class='lds-ellipsis'>";
              html +=     "<div></div>";
              html +=     "<div></div>";
              html +=     "<div></div>";
              html +=     "<div></div>";
              html += "</div>";

              return html;
          },
          transclude: true,
          link: function(scope, element, attrs) {

          }
      };
  }
);

angular.module("ridetimes")
.directive("pullRefresh",
function($rootScope, $compile) {
    return {
        restrict: "E",
        link: function(scope, element, attrs) {
          var main = attrs["main"];
          var spinner = $("<div dot-loader></div>");
          spinner.addClass('dot-loader');
          spinner.attr('id', 'refresh-spinner');
          spinner.css("visibility", "hidden");
          var temp = spinner[0].outerHTML;
          var compiled = $compile(temp)(scope);
          var html = compiled[0].outerHTML;
          $rootScope.$cancelRefresh = angular.noop;
          PullToRefresh.init({
            mainElement: main,
            distThreshold: 60,
            distMax: 80,
            distReload: 80,
            refreshTimeout: 1,
            iconRefreshing: "&nbsp",
            instructionsPullToRefresh: "Pull to refresh",
            instructionsReleaseToRefresh: "Release to refresh",
            instructionsRefreshing: html,
            onRefresh: function(done) {
              var s = $("#refresh-spinner")[0];
              $rootScope.$cancelRefresh = done;
              $(s).css("visibility", "visible");
              scope.loadRides().then(function(){
                setTimeout(function(){
                  done();
                }, 1000);
              });
            },
            onInit: function(items) {
              setTimeout(function() {
                var s = $(".ptr--ptr");
                s.css("box-shadow", "none");
                s.prependTo(main);
              }, 0);
            }
          });
        }
    };
}
);
