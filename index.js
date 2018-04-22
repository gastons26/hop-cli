#!/usr/bin/env node --harmony
var chalk = require('chalk');
var findParentDir = require('find-parent-dir');
var common = require("./common");

var userArgs = process.argv;
var directiveTemplate = userArgs[1].replace('index.js', '');

//process.cwd();

var projectHomeDir = findParentDir.sync(process.cwd(), 'App.config');
var projectFullName = projectHomeDir.replace(/\\$/, '').split('\\').pop();
var projectName = projectHomeDir.replace(/\\$/, '').split('\\').pop().split('.').pop();


const Commands = {
	NG_SERVICE: "service",
	NG_MODULE: "module",
	BACKEND_MODULE: "backModule"
}

switch(userArgs[2]) {
	case Commands.NG_SERVICE:
		var hopFrontService = require('./hop-front-service');
		hopFrontService.getProcessedTemplate(directiveTemplate, projectName);
		break;
  case Commands.BACKEND_MODULE:
    var hopBackendModule = require('./hop-backend-module');
    hopBackendModule.CreateBackendModule(directiveTemplate, projectFullName, projectHomeDir);
    break;
	default:
	console.error(chalk.red.bold("Operations is not allowed"));
}