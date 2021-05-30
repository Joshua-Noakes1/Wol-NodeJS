var ping_await = require('ping');

async function ping(ip) {
    // stop if ip undefined
    if (ip == undefined) return {
        "message": false,
        "ip": "0.0.0.0"
    };

    // ping ip and timeout after 25 seconds
    var response = await ping_await.promise.probe(ip, {
        timeout: 25,
    });

    // return ip status
    return response.alive;
}

module.exports = {
    ping
}