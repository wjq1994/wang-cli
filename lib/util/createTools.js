exports.getPromptModules = () => {
  return [
    'clone-wang-cli'
  ].map(file => require(`../promptModules/${file}`));
}
