const lcl = require("cli-color"),
    ping = require('ping');

async function checkIP(ipAddress) {
    // running check
    console.log(lcl.blue("[IPCheck - Info]"), `Running IP check on "${ipAddress}"`);

    // check ipaddress
    if (await ping.promise.probe(ipAddress).alive != true) return false;

    return true;
}

module.exports = {
    checkIP
}