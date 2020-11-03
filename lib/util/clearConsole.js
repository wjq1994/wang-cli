const getVersions = require('./getVersions')
const {
  chalk,
  clearConsole,
} = require('../share-utils')

exports.generateTitle = async function (checkUpdate) {
  const { current } = await getVersions()
  let title = chalk.bold.blue(`WANG CLI v${current}`)

  let upgradeMessage = `当前版本 ${current}`;
  const upgradeBox = require('boxen')(upgradeMessage, {
    align: 'center',
    borderColor: 'green',
    dimBorder: true,
    padding: 1
  })

  title += `\n${upgradeBox}\n`

  return title
}

exports.clearConsole = async function clearConsoleWithTitle (checkUpdate) {
  const title = await exports.generateTitle(checkUpdate)
  clearConsole(title)
}
