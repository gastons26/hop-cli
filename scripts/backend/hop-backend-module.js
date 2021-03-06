var common = require("../../common");
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

  program
    .option('-m, --module <module>', 'New module name')
    .action(function() {
      co(function *() {

        var isCorrectProject = yield prompt.confirm(`Did we find correct project: ${chalk.magenta(projectName)} (y/n) `);

        if(!isCorrectProject) {
          process.exit(0);
        }

        var moduleName = yield prompt(`module: (${chalk.magenta(projectName)})`);

        if(moduleName.trim() === "") {
          console.error(chalk.bgRed.white.underline("Module Name is required"));
          process.exit(0);
        }

        var newModulePath = `${projectPath}\\${moduleName}`;
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