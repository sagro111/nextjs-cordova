#! /usr/bin/env node
import {generateStatic} from './generate-static.mjs';
import {generateCordova} from './generate-cordova.mjs';

async function nextCordovaExecute() {
    await generateStatic();
    await generateCordova();
}

nextCordovaExecute();
