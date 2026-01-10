'use strict';

import {createMainPage, isuBox} from "./main.js";
import * as strings from "./ui/strings.js";
import {setJwtToken, jwtToken} from "./api/api.js";
import {parseJwt} from "./utils/utils.js";

document.addEventListener('DOMContentLoaded', main);

async function main() {
    createMainPage()
}