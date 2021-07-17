const ping = require('ping');

async function checkIP(ipAddress) {
    // response
    var response = true;

    // running check
    console.log(`[Info] Running IP check on "${ipAddress}"`);

    // check ipaddress
    var response = await ping.promise.probe(ipAddress);
    if (response.alive != true) return response = false;

    return response;
}

module.exports = {
    checkIP
}