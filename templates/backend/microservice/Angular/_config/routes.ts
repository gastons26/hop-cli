/// <reference path="modules.ts" />
module H2O.--ProjectName-- {
    class Routes {
        static $inject = ["$stateProvider"];

        constructor($stateProvider: angular.ui.IStateProvider) {
            $stateProvider.state("H2O.--ProjectNameToLower--", {})
                .state("H2O.--ProjectNameToLower--.list",
                {
                    url: "/--ProjectNameToLower--/list",
                    params: {
                        application: null
                    },
                    views: {
                        'body@': {
                            templateUrl: "Feja/View/--ProjectNameToLower--/--ProjectNameDashed---list.tmpl.html",
                            controller: "--ProjectNameFirstLower--ListCtrl",
                            controllerAs: "ctrl"
                        }
                    }
                });
            ;
        }
    }

    angular.module("H2OApp").config(Routes);
}