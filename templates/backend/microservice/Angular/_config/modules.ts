module H2O.--ProjectName-- {
    var ctrl = angular.module("h2o.--ProjectNameToLower--.controllers", ["h2o.filters"]);
    var srvc = angular.module("h2o.--ProjectNameToLower--.services", []);
    var drctv = angular.module("h2o.--ProjectNameToLower--.directives", ["h2o.directives", "h2o.filters"]);
    var publicDrctv = angular.module("h2o.directives");
    var fltr = angular.module("h2o.--ProjectNameToLower--.filters", []);

    export class Modules {
        static ngService = srvc;
        static ngDirective = drctv;
        static ngPubDrctv = publicDrctv;
        static ngFilter = fltr;
        static ngCtrl = ctrl;
    }

    angular.module("H2OApp").requires.push("h2o.--ProjectNameToLower--.services");
    angular.module("H2OApp").requires.push("h2o.--ProjectNameToLower--.directives");
    angular.module("H2OApp").requires.push("h2o.--ProjectNameToLower--.filters");
    angular.module("H2OApp").requires.push("h2o.--ProjectNameToLower--.controllers");
}