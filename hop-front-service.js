var common = require("./common");
var fs = require('fs');
var fsPath = require('fs-path');

var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk');

var filePathToServiceTemplate = '\\templates\\front\\srvc.ts';
var filePathToServiceFunction = '\\templates\\front\\srvc.function.ts';

exports.getProcessedTemplate = function(templatePath, projectName) {
	 filePathToServiceTemplate = templatePath + filePathToServiceTemplate;
	 filePathToServiceFunction = templatePath + filePathToServiceFunction;

	 program
		.option('-m, --module <module>', 'project module name without H2O')
		.option('-p, --service <service>', 'service name')
		.option('-f, --functions <function>', 'All funciton. Comma separated')
		.action(function() {
			co(function *() {

				var isCorrectProject = yield prompt.confirm(`Did we find correct project: ${chalk.magenta(projectName)} (y/n) `);

				if(!isCorrectProject) {
					process.exit(0);
				}

				var moduleName = yield prompt(`module: (${chalk.magenta(projectName)})`);
				var serviceName = yield prompt('service: ');
				var functionNames = yield prompt('functions: ');

				if(moduleName.trim() === "") {
					moduleName = projectName;
				}


				var serviceNameFirstLowerName = common.toLowerCaseFirstLetter(serviceName);
				var projectModuleLowerCase = moduleName.toLowerCase();

				fs.readFile(filePathToServiceTemplate, 'utf8', function (err, serviceTemplate) {
					if (err) {
						console.log(chalk.red(err));
						process.exit(0);
						return;
					}

					fs.readFile(filePathToServiceFunction, 'utf8', function (err, serviceFunctionTemplate) {
						var functionNameArray = functionNames.split(",");
						var replacedFunctionTemplate = "";

						functionNameArray.forEach((fName) => {
							replacedFunctionTemplate += serviceFunctionTemplate.replace(/--functionName--/g, fName).replace(/--projectModuleLowerCase--/g, projectModuleLowerCase);
						});

						var processedTemplate = serviceTemplate
													.replace(/--moduleName--/g, moduleName)
													.replace(/--serviceName--/g, serviceName)
													.replace(/--functions--/g, replacedFunctionTemplate)
													.replace(/--serviceNameLowerFirstName--/g, serviceNameFirstLowerName);

						var newFileName = common.camelCaseToDash(serviceName.replace("Service", "")) + '.srvc.ts';
						fsPath.writeFile(newFileName, processedTemplate, function(err){
							if(err) {
								console.log(chalk.red(err));
								process.exit(0);
							} else {
								console.log(chalk.green("Done!"), chalk.bgGreen(process.cwd() + '\\' + newFileName));
								process.exit(1);
							}
						});

					});
				});
			})
		}).parse(process.argv);
}