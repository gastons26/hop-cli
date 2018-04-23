var common = require("../../common");
var fs = require('fs');
var fsPath = require('fs-path');
var Finder = require('fs-finder');

var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk');
var copydir = require('copy-dir');

var templateModuleDirectory = 'templates\\backend\\microservice';

exports.CreateBackendModule = function(templatePath, ProjectFullName, projectPath) {

  co(function *() {
    var moduleTemplateDirectory = templatePath + templateModuleDirectory;
    var projectName = ProjectFullName.split('.').pop();

    var isCorrectProject = yield prompt.confirm(`Did we find correct project: ${chalk.magenta(projectName)} (y/n) `);
    if(!isCorrectProject) {
      process.exit(0);
    }

    copyAndRenameFiles(moduleTemplateDirectory, projectPath, {
      '--ProjectName--': projectName,
      '--ProjectNameDashed--': common.camelCaseToDash(projectName)
    });

    replaceTemplateVairablesInFiles(projectPath, {
      '--ProjectFullName--' : ProjectFullName,
      '--ProjectFullNameToLower--' : ProjectFullName.toLowerCase(),
      '--ProjectName--' : projectName,
      '--ProjectNameDashed--' : common.camelCaseToDash(projectName),
      '--ProjectNameFirstLower--' : common.toLowerCaseFirstLetter(projectName),
      '--ProjectNameToLower--' : projectName.toLowerCase(),
      '--ProjectNameToUpper--' : projectName.toUpperCase()
    });

    console.log();

    console.log(chalk.bgCyan.white.bold(`Don't forget to configure:`));
    console.log(chalk.bgCyan.white.bold(`--App/${projectName}ApplicationConfig.cs `));
    console.log(chalk.bgCyan.white.bold(`------ ApplicationSecret`));
    console.log(chalk.bgCyan.white.bold(`------ ApplicationSignature.Password`));
    console.log(chalk.bgCyan.white.bold(`------ ApplicationSignature.PrivateKey`));

    console.log();

    console.log(chalk.bgYellow.white.bold(`Add Project properties:`));
    console.log(chalk.bgYellow.white.bold(`------ H2OGateWay : string : Application`));
    console.log(chalk.bgYellow.white.bold(`------ H2OApplicationHost : string : Application`));
    console.log(chalk.bgYellow.white.bold(`------ WebClientProxyUrl : string : Application`));
    console.log(chalk.bgYellow.white.bold(`------ LogFileDirectory : string : Application`));
    console.log(chalk.bgYellow.white.bold(`------ LogFileMinLevel : string : Application`));
    console.log(chalk.bgYellow.white.bold(`------ InstanceName : string : Application`));

    console.log();
    console.log(chalk.bgMagenta("Don't forget to add nuget packages and include new created files into project!"));
    console.log(chalk.bgMagenta("ALL DONE!!"));

    process.exit(1);
  });
};

function copyAndRenameFiles(fromDir, toDirm, renamePatternObject) {
  copydir.sync(fromDir, toDirm);

  var files = Finder.from(toDirm).findFiles();

  files.forEach(file => {

    let newFileName = file;

    Object.keys(renamePatternObject).forEach(key => {
      newFileName = newFileName.replace(new RegExp(key,'g'), renamePatternObject[key])
    });

    fs.renameSync(file, newFileName, (err) => {
      if(err) {
        console.log(chalk.red.bold.underline("File rename failed"));
        console.log(err);
        process.exit(0);
      }
    });
  });
}

function replaceTemplateVairablesInFiles(newModelPath, replaceValues) {

  try {
    Finder.from(newModelPath).findFiles().forEach(filePath => {

      var processedTemplate = fs.readFileSync(filePath, 'utf8');
      Object.keys(replaceValues).forEach(key => {
        processedTemplate = processedTemplate.replace(new RegExp(key,'g'), replaceValues[key]);
      });

      fsPath.writeFileSync(filePath, processedTemplate);

      console.log(chalk.bgGreen(`Done: ${filePath}`));
    });
  } catch (ex) {
    console.log(chalk.bgRed(ex));
    process.exit(0);
  }
}