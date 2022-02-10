const lcl = require("cli-color"),
    ping = require('ping');

async function checkIP(ipAddress) {
    // running check
    console.log(lcl.blue("[IPCheck - Info]"), `Running IP check on "${ipAddress}"`);

    // run ip check
    const result = await ping.promise.probe(ipAddress);

    // return result
    if (result.alive != true) return false;

    return true;
}

module.exports = checkIP;