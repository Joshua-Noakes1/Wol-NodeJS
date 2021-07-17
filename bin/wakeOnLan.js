const wol = require('wol');
require('dotenv').config();

/**
 * Send a WOL Packet to a macAddress on the network
 * 
 * @param {Object} next 
 * @param {String} macAddress 
 * @returns true in hoping that we send wol packet
 */
function wakeOnLan(macAddress) {
    // response
    var response = true;

   // console log that we have a new macaddress
    console.log(`[Info] Sending WOL packet to "${macAddress}"`);

    // wol request
    wol.wake(macAddress).catch((e) => {
        if (process.env.dev == 'true') console.log(e);
        return response = false;
    });
    return response;
}

module.exports = {
    wakeOnLan
}