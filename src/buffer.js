#!/usr/bin/env node
'use strict';

const prettier = require('prettier');
// update the require below
const output = require('./asetup');

// clear the console
console.log('\x1Bc');
// print the output to the console
prettier.format(
  JSON.stringify(output), {parser: 'babel'}
).then(
  (outputStr) => {
    console.log(
      '---',
      new Date().toLocaleTimeString(),
      '---',
      '\n\n',
      outputStr,
      '\n',
    );
  }
);
