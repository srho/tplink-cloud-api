/**
 * @package     tplink-hs100-cloud-api
 * @author      Alexandre Dumont <adumont@gmail.com>
 * @copyright   (C) 2017 - Alexandre Dumont
 * @license     https://www.gnu.org/licenses/gpl-3.0.txt
 * @link        http://itnerd.space
 */

/* This file is part of tplink-hs100-cloud-api.

tplink-hs100-cloud-api is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

tplink-hs100-cloud-api is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details.

You should have received a copy of the GNU General Public License along with
Foobar. If not, see http://www.gnu.org/licenses/. */

var rp = require('request-promise');

class TPLink {
  constructor(token, termid){
    this.token = token;
    this.termid = token;
  }

  static async login(user,passwd,termid){

    const params = {
      appName: 'Kasa_Android',
      termID: termid,
      appVer: '1.4.4.607',
      ospf: 'Android+6.0.1',
      netType: 'wifi',
      locale: 'es_ES'
    };

    const login_payload = JSON.stringify( { "method": "login", "url": "https://wap.tplinkcloud.com",
        "params":{
          "appType": "Kasa_Android",
          "cloudPassword": passwd,
          "cloudUserName": user,
          "terminalUUID": termid
        }
      }
    );

    const request = {
      method: 'POST',
      uri: "https://wap.tplinkcloud.com",
      qs: params,
      body: login_payload,
      headers: {
        'Connection': 'Keep-Alive',
        'Content-Type': 'application/json',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 6.0.1; A0001 Build/M4B30X)'
      },
    };

    const response = await rp( request );
    const token = JSON.parse(response).result.token;
    return new TPLink(token, termid);
  }

  getToken() {
    return this.token;
  }

  async getDeviceList() {

    const params = {
      appName: 'Kasa_Android',
      termID: this.termid,
      appVer: '1.4.4.607',
      ospf: 'Android+6.0.1',
      netType: 'wifi',
      locale: 'es_ES',
      token: this.token
    };

    const request = {
      method: 'POST',
      uri: 'https://wap.tplinkcloud.com',
      qs: { token: this.token },
      body: JSON.stringify( {method:"getDeviceList"} ),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await rp( request )
    const deviceList = JSON.parse(response).result.deviceList
    this.deviceList = deviceList

    return deviceList
  }

}

module.exports = TPLink;
