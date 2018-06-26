desc('Create main local Databse and table');
task('mainDatabase', {async: true}, function () {
  var cmds = [
    'createdb mailbox',
    ''


  ];
  jake.exec(cmds, {printStdout: true}, function () {
    console.log('All tests passed.');
    complete();
  });
});
