/*
 * Important!! do not make any changes in this file.
 */
const path = require('path');
const shell = require('shelljs');
const prompts = require('prompts');
const releaseFolder = path.join(__dirname, `../artifi-component-releases/`);
const componentFolder = __dirname;
const FG_YELLOW = '\x1b[33m%s\x1b[0m';
const FG_RED = '\x1b[31m';
// Keep empty to target all packages
const packageScope = [];
// Keep empty for the base layout e.g. maxwell
const client = '';

(async () => {
    const branchResponse = await prompts({
        type: 'select',
        name: 'branch',
        message: 'select a target branch',
        choices: [
            { title: 'integration-dev', value: 'integration-dev' },
            { title: 'integration', value: 'integration' },
            { title: 'stage-dev', value: 'stage-dev' },
            { title: 'stage', value: 'stage' },
            { title: 'master', value: 'master', description: 'Please make sure what you are doing!' },
        ],
    });

    const publishResponse = await prompts({
        type: 'select',
        name: 'publish',
        message: 'Do you really want to publish?',
        choices: [
            { title: 'Yes', value: true, description: 'This will create release tag on GitHub!' },
            { title: 'No, Just testing the release (no push)', value: false },
        ],
    });

    //Change to release folder
    shell.cd(releaseFolder);

    //Check git available or not
    if (!shell.which('git')) {
        console.log(FG_RED, 'Sorry, this script requires git');
        shell.exit(1);
    }

    // Add all local changes
    if (shell.exec('git add .').code !== 0) {
        console.log(FG_RED, 'Error: Git adding failed');
        shell.exit(1);
    }

    // Stash current branch changes against date
    if (shell.exec(`git stash push -m "your pending work at date ${new Date()} "`).code !== 0) {
        console.log(FG_RED, 'Error: Git adding failed');
        shell.exit(1);
    }

    // Change to selected branch
    if (shell.exec(`git checkout ${branchResponse.branch}`).code !== 0) {
        console.log(FG_RED, 'Error: Git branch switching failed');
        shell.exit(1);
    }

    // Change to selected branch
    if (shell.exec(`git pull origin ${branchResponse.branch}`).code !== 0) {
        console.log(FG_RED, 'Error: Git branch take pull failed');
        shell.exit(1);
    }

    //Change to component folder
    shell.cd(componentFolder);

    let getVersionString = () => {
        if (client !== '') {
            if (branchResponse.branch === 'master') {
                return `prerelease --preid ${client}`;
            } else {
                return `prerelease --preid ${client}-${branchResponse.branch}`;
            }
        } else {
            if (branchResponse.branch === 'master') {
                return `patch`;
            } else {
                return `prerelease --preid ${branchResponse.branch}`;
            }
        }
    };

    let getScopeString = () => {
        let scopeString = packageScope.length === 0 ? `` : `--scope=`;
        scopeString = packageScope.length === 1 ? scopeString + packageScope[0] : scopeString;
        scopeString = packageScope.length > 1 ? scopeString + `{${packageScope.join()}}` : scopeString;
        return scopeString;
    };

    if (publishResponse.publish === true) {
        if (
            shell.exec(
                `lerna version ${getVersionString()} --force-publish --yes && lerna run build:publish --parallel ${getScopeString()}`
            ).code !== 0
        ) {
            console.log(
                FG_RED,
                `Error: Publishing the code to the ${branchResponse.branch} causes an error, Please check!`
            );
            shell.exit(1);
        }
    } else {
        console.log(
            FG_YELLOW,
            `Please note:: It will be published with ${getVersionString()} tag and will take ${getScopeString()} components in scope!`
        );
        if (shell.exec(`lerna run build:publish --parallel ${getScopeString()}`).code !== 0) {
            console.log(FG_RED, 'Error: Publishing the code in release repository');
            shell.exit(1);
        }
    }
})();
