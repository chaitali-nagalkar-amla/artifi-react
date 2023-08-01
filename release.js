/*
 * Important!! do not make any changes in this file.
 */
const path = require('path');
const shell = require('shelljs');
const releaseFolder = path.join(__dirname, `/artifi-headless-releases/`);
const componentFolder = __dirname;

const FG_RED = '\x1b[31m';
// Keep empty to target all packages
const packageScope = [];
// Keep empty for the base layout e.g. maxwell
(async () => {
    //Change to release folder
    shell.cd(releaseFolder);
    //Change to component folder
    shell.cd(componentFolder);
    // Get the current branch name using git command
    const { execSync } = require('child_process');
    let branchName = '';
    try {
        // Get the current branch name using git command
        branchName = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
        console.log(`Current branch: ${branchName}`);
    } catch (error) {
        console.error('Error occurred while retrieving the branch name:', error.message);
    }
    console.log(`prerelease --preid ${branchName}`);

    let getVersionString = () => {
        return `prerelease --preid ${branchName}`;
    };

    let getScopeString = () => {
        let scopeString = packageScope.length === 0 ? `` : `--scope=`;
        scopeString = packageScope.length === 1 ? scopeString + packageScope[0] : scopeString;
        scopeString = packageScope.length > 1 ? scopeString + `{${packageScope.join()}}` : scopeString;
        return scopeString;
    };
    if (
        shell.exec(
            `lerna version ${getVersionString()} --force-publish --yes`
        ).code !== 0
    ) {
        console.log(
            FG_RED,
            `Error: Publishing the code to the causes an error, Please check!`
        );
        shell.exit(1);
    }
    shell.exit(0);
})();
