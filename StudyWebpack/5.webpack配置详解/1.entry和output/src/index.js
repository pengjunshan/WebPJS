
import {addNum} from './add.js'
console.log('111111111')

addNum(3,6);

// import {getName} from './utils.js'

// console.log(getName())

import('./utils').then(({ getName }) => {
    console.log(getName());
  });