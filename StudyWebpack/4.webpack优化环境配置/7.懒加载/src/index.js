import './index.css';
// import {getName} from './utils.js'

/**
 * 相加
 * @param {*} x
 * @param {*} y
 */
function add(x, y) {
  return x + y;
}

console.log(add(3, 8));

document.querySelector('#btn').onclick = function(){
  // 懒加载~：当文件需要使用时才加载~
  // 预加载 prefetch：会在使用之前，提前加载js文件  webpackPrefetch: true
  // 正常加载可以认为是并行加载（同一时间加载多个文件）  
  // 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  // 慎用预加载，兼容性问题，移动端和低版本浏览器不支持
  import(/* webpackChunkName: 'test' */'./utils').then(({getName})=>{
    console.log(getName())
  })
}
