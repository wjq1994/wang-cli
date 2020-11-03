const { chalk, logWithSpinner, log, stopSpinner, error, exit} = require('../share-utils')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require("fs-extra");
const path = require("path");

const pc_address = "https://github.com/wjq1994/wang-cli.git";
const projectName = "wang-cli";
const targetDir = path.resolve(process.cwd(), projectName || '.')
module.exports = cli => {
  cli.injectFeature({
    name: 'clone-pc',
    value: pc_address,
    description: 'Structure the app with dynamic pages',
  })

  cli.onPromptComplete(async (answers) => {
    if (fs.existsSync(targetDir)) {
      if (cli.creator.options.force) {
        await fs.remove(targetDir);
      } else {
        error(`Failed created project. Clone project repeat`)
        exit(1)
      }
    }
    // install plugins
    logWithSpinner(`✨`, `Cloning project ${chalk.yellow(projectName)}.This might take a while...\n`);
    // this.emit('creation', { event: 'plugins-install' });
    await exec(`git clone ${pc_address}`);
    log(`\n⚙\u{fe0f}  Installing CLI plugins. This might take a while...`);
    log()

    stopSpinner();

    log(`🎉  Successfully created project.`)
    log()
    
  })
}


