module H2O.--moduleName-- {
    export class --serviceName--  {
        static $inject = ["$http", "$q"];

        constructor(
            private http: ng.IHttpService,
            private q: ng.IQService
        ) { }
		--functions--		
    }
    Modules.ngService.service("--serviceNameLowerFirstName--", --serviceName--);
}