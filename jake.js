desc('Create main local Databse')
task('makeLocalDatabases', { async: true }, function () {
  var cmds = [
    'createdb mailbox;',
    'createdb testmailbox;',
    'node models/TableGenerator.js'
  ]
  jake.exec(cmds, {printStdout: true}, function () {
    console.log('All tests passed.')
    complete()
  })
})
