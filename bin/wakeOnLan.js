const wol = require('wol');
require('dotenv').config();

/**
 * Send a WOL Packet to a macAddress on the network
 * 
 * @param {Object} next 
 * @param {String} macAddress 
 * @returns true in hoping that we send wol packet
 */
function wakeOnLan(macAddress, next) {
    var response = true;

    // console log that we have a new macaddress
    console.log(`[Info] Sending WOL packet to "${macAddress}"`);

    // wol request
    wol.wake(macAddress).catch((e) => {
        if (process.env.dev == 'true') console.log(e);
        // server 500
        const error = new Error(`❌ Failed to send WOL packet to "${macAddress}" ❌`);
        next(error);
        response = false;
    });
    return response;
}

module.exports = {
    wakeOnLan
}