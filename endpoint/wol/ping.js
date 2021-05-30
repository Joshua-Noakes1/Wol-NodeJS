const ping_await = require('ping');
const delay = require('delay');

async function ping(ip) {
    // stop if ip undefined
    if (ip == undefined || ip == "") return false;

    // delay to make sure computer isnt dead before we ping it 
    await delay(process.env.delay * 1000);

    // ping ip 
    var response = await ping_await.promise.probe(ip);

    // return ip status
    return response.alive;
}

module.exports = {
    ping
}