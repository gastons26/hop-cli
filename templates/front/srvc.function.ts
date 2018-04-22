		
		//TODO - need to clearify promise type and URL.
		--functionName--(): ng.IPromise<any> {
            var defer = this.q.defer<any>();
			
            this.http.get(`Feja/Get/api/--projectModuleLowerCase--`).then(
                response => {
                    defer.resolve(response.data as any);
                },
                (response) => {
                    defer.reject(response.data);
                }
            );

            return defer.promise;
        }
		