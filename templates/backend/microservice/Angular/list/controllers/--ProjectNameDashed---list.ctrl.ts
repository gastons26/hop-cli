/// <reference path="../../_config/modules.ts" />
module H2O.--ProjectName-- {
    
    class --ProjectName--ListCtrl implements ng.IController {
        $onInit(): void { }

        constructor() {
            this.init();
        }

        private init(): void {
        }
    }
    Modules.ngCtrl.controller("--ProjectNameFirstLower--ListCtrl", --ProjectName--ListCtrl);
}