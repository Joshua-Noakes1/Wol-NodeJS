const lcl = require("cli-color"),
    path = require("path"),
    {
        exec
    } = require('child_process')

async function ssh(host, username, password, command) {
    // exec command on host
    const sshCommand = `echo ${password} | ssh  -o StrictHostKeyChecking=no ${username}@${host} ${command}`;

    // run ssh command
    try {
        const sshResult = await exec(sshCommand);
    } catch (err) {
        console.log(err);
    }
}

ssh('127.0.0.1', 'joshua', '', 'whoami');

module = ssh;