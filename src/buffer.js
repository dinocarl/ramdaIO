#!/usr/bin/env node
"use strict";

// update the require below
const output = require('./asetup');

// clear the console
console.log('\x1Bc');
// print the output to the console
console.log(
  '---', new Date().toLocaleTimeString(), '---', '\n\n',
  output,
  '\n',
);
