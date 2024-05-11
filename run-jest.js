const { exec } = require('child_process');

exec('npx cypress run', (error, stdout, stderr) => {
  if (error) {
    console.error('Error running Cypress tests:', error);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
