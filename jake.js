desc('Migrate test database')
task('makeDatabases', { async: true }, function () {
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

task('dropDatabases', { async: true }, function () {
  var cmds = [
    'dropdb mailbox;',
    'dropdb testmailbox;'
  ]
  jake.exec(cmds, {printStdout: true}, function () {
    console.log('All tests passed.')
    complete()
  })
})
