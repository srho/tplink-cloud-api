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

const TPLink = require("./tplink.js")
const HS100 = require("./hs100.js")
var uuidV4 = require('uuid/v4');

const TPLINK_USER = process.env.TPLINK_USER;
const TPLINK_PASS = process.env.TPLINK_PASS;
const TPLINK_TERM = process.env.TPLINK_TERM || uuidV4();

async function main(){

  const myTPLink = await TPLink.login(TPLINK_USER, TPLINK_PASS,TPLINK_TERM);

  console.log( myTPLink.getToken() )

  const dl = await myTPLink.getDeviceList();

  console.log( dl )

  const myPlug = new HS100(myTPLink, "My Smart Plug");

  console.log("deviceId=" + myPlug.getDeviceId())

}

console.log("TPLINK_TERM=" + TPLINK_TERM)
main();
