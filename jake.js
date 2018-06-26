//npm install -g jake

//jake --jakefile jake.js makeDatabases

desc('Create main local Databse');
task('makeDatabases', {async: true}, function () {
  var cmds = [
    'createdb mailbox;',
    'createdb testmailbox;',
    'node models/TableGenerator.js'
  ];
  jake.exec(cmds, {printStdout: true}, function () {
    console.log('All tests passed.');
    complete();
  });
});
