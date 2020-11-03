const {inquirer, chalk, logWithSpinner, log, stopSpinner, execa} = require("./share-utils");
const EventEmitter = require('events');
const { clearConsole } = require('./util/clearConsole');
const debug = require('debug')

const PromptModuleAPI = require('./PromptModuleAPI');

module.exports = class Creator extends EventEmitter {
  constructor (name, context, promptModules) {
    super();
    this.name = name;
    this.context = context;
    const { featurePrompt } = this.resolveIntroPrompts();
    this.featurePrompt = featurePrompt;
    this.injectedPrompts = [];
    this.promptCompleteCbs = [];

    const promptAPI = new PromptModuleAPI(this)
    promptModules.forEach(m => m(promptAPI))
  }

  async create(options) {
    this.options = options;
    let preset = await this.promptAndResolvePreset();
  }

  async promptAndResolvePreset() {
    await clearConsole(true);
    let answers = await inquirer.prompt(this.resolveFinalPrompts());
    debug('vue-cli:answers')(answers);
    // run cb registered by prompt modules to finalize the preset
    this.promptCompleteCbs.forEach(cb => cb(answers))
  }

  resolveFinalPrompts() {
    const prompts = [
      this.featurePrompt,
      ...this.injectedPrompts,
    ]
    debug('vue-cli:prompts')(prompts)
    return prompts
  }

  resolveIntroPrompts () {
    const featurePrompt = {
      name: 'features',
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [],
      pageSize: 10
    }
    return {
      featurePrompt
    }
  }
  
}
