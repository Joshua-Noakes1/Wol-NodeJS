const lcl = require('cli-color'),
    wol = require('wol');
require('dotenv').config();

/**
 * Send a WOL Packet to a macAddress on the network
 * 
 * @param {String} macAddress 
 * @returns boolean true if successful
 */
async function wakeOnLan(macAddress) {
    // console log that we have a new macaddress
    console.log(lcl.blue("[WOL - Info]"), `Sending WOL packet to "${macAddress}"`);

    // wol request
    await wol.wake(macAddress).then((wol) => {
        console.log(lcl.green("[WOL - Success]"), `Sent WOL packet to "${macAddress}"`);
    }).catch((error) => {
        console.log(lcl.red("[WOL - Error]"), `Failed to send WOL packet to "${macAddress}"`, error);
        return false;
    });
    
    return true;
}

module.exports = wakeOnLan;