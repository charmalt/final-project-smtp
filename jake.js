//npm install -g jake

//jake --jakefile jake.js makeDatabase

desc('Create main local Databse');
task('makeDatabase', {async: true}, function () {
  var cmds = [
    'createdb mailbox;'
  ];
  jake.exec(cmds, {printStdout: true}, function () {
    console.log('All tests passed.');
    complete();
  });
});
// jake --jakefile jake.js testDatabase
desc('Create main local test Databse');
task('testDatabase', {async: true}, function () {
  var cmds = [
    'createdb testmailbox;'
  ];
  jake.exec(cmds, {printStdout: true}, function () {
    console.log('All tests passed.');
    complete();
  });
});
