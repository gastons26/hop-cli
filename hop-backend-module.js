var common = require("./common");
var fs = require('fs');
var fsPath = require('fs-path');
var Finder = require('fs-finder');

var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk');
var copydir = require('copy-dir');

var templateModuleDirectory = 'templates\\backend\\module';

exports.CreateBackendModule = function(templatePath, projectName, projectPath) {
  //console.log(chalk.bgGreen.bold.white.underline(templatePath));
  //console.log(chalk.bgGreen.bold.white.underline(projectName));
  //console.log(chalk.bgGreen.bold.white.underline(projectPath));

  program
    .option('-m, --module <module>', 'project module name without H2O')
    .action(function() {
      co(function *() {

        var isCorrectProject = yield prompt.confirm(`Did we find correct project: ${chalk.magenta(projectName)} (y/n) `);

        if(!isCorrectProject) {
          process.exit(0);
        }

        var moduleName = yield prompt(`module: `);

        if(moduleName.trim() === "") {
          console.error(chalk.bgRed.white.underline("Module Name is required"));
          process.exit(0);
        }

        var newModulePath = projectPath + `\\${moduleName}`;
        var moduleTemplateDirectory = templatePath + templateModuleDirectory;

        copyAndRenameFiles(moduleTemplateDirectory, newModulePath, moduleName);

        replaceTemplateVairablesInFiles(newModulePath, {
          '--ProjectName--' : projectName,
          '--ModuleName--' : moduleName,
          '--ModuleNameDashed--' : common.camelCaseToDash(moduleName),
          '--ModuleNameFirstLower--' : common.toLowerCaseFirstLetter(moduleName),
          '---microserviceNameLower--' : projectName.split('.').pop().toLowerCase()
        });

        process.exit(1);
      })
    }).parse(process.argv);
};

function copyAndRenameFiles(fromDir, toDirm, newModuleName) {
  copydir.sync(fromDir, toDirm);

  var files = Finder.from(toDirm).findFiles();

  files.forEach(file => {

    let newFileName = file.replace("--ModuleName--", newModuleName);

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
  console.log(newModelPath);
  fs.readFile('C:\\WORK\\H2O.App.MyTest\\MyModule\\Controllers\\MyModuleController.cs', 'utf8', function (err, serviceTemplate) {
    console.log(serviceTemplate);
  });

  Finder.from(newModelPath).findFiles().forEach(filePath => {
    console.log(filePath);

    fs.readFile(filePath, 'utf8', function(err, fileContent) {
      console.log(fileContent)
    });
/*
    fs.readFile(filePath, 'utf8', function (err, fileContent) {
      console.log(err, fileContent);
      if (err) {
        console.log(chalk.red(err));
        process.exit(0);
        return;
      }
      var processedTemplate = fileContent;
      Object.keys(replaceValues).forEach(key => {
        console.log(key);
        processedTemplate = processedTemplate.replace(new RegExp(key,'g'), replaceValues[key]);
      });

      console.log(processedTemplate);

      fsPath.writeFileSync(filePath, processedTemplate, function(err){
        if(err) {
          console.log(chalk.red(err));
          process.exit(0);
        } else {
          console.log(chalk.green("Done!"), chalk.bgGreen(process.cwd() + '\\' + newFileName));
          process.exit(1);
        }
      });
    });
    */
  });
}