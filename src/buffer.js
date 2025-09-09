#!/usr/bin/env node
'use strict';

// update the require below
const output = require('./asetup');

const renderer = 'dir'; // log | table | dir

const args = [output]
  .concat(
    renderer === 'dir' ? {depth: null, colors: true} : null,
  )
  .filter((item) => item);

console.log(
  // clear the console
  '\x1Bc',
  '---',
  new Date().toLocaleTimeString(),
  '---'
);

console[renderer](
  ...args,
);
