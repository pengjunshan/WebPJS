import './index.css';
// import {getName} from './utils.js'

import $ from 'jquery'

/**
 * 相加
 * @param {*} x
 * @param {*} y
 */
function add(x, y) {
  return x + y;
}

console.log(add(3, 8));

console.log($)

/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/
import(/* webpackChunkName: 'utils' */'./utils')
  .then(({ getName }) => {
    // 文件加载成功~
    // eslint-disable-next-line
    console.log(getName())
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });
