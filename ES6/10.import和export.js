// - import：导入模块
// - export：导出模块
// - 注意1：export default 每个模块只能使用一次
// - 注意2：export 每个模块可以使用多次
// - 注意3：一个模块可以导出多个内容，export default 和 export 可以一起使用

/**
 * 导入第三方库、插件
 * import引入一个依赖包，不需要相对路径
 */
import vue from 'vue'
import axios from 'axios'

/**
 * 使用export{}抛出的变量,一个文件里可以多个export
 * 可以导出多个变量, 当使用导出变量时, 需要了解导出变量原来的命名
 */
// A.js导出
const name = '邓紫棋'
function fn() { }
function getName() {
    return name
}
export { name, getName }
//给fn另起个名字 as后面的值就是新名字
export { fn as fnn }

// 导入1 B.js导入，用{}分别接收每个变量和方法
import { name, fnn, getName } from 'A.js'
console.log(name)
console.log(fn())
//导入2 B.js导入，一次性导入整个类
import * as utils from 'A.js'
console.log(utils.name)
console.log(utils.getName())


/**
 * 使用export default{}抛出,一个文件里只能有一个export default
 * 默认无法同时导出多个变量
 * 导出变量的方式非常优雅, 当使用导出变量时, 无需了解导出变量原来的命名
 */
// A.js导出
//方式一
function getAge() { return 18 }
export default { getAge }

// export default function () {
//     let name = "zhaoolee";
//     let age = new Date().getFullYear() - 1995;
//     return { name, age };
// }

// B.js接收导入 接收export导出的数据需要用{}接收，接收export default导出的数据不需要用{}接收并且接收名字可以更改
import getAge from 'A.js'

// export 和 export default的区别
// 1.export
// import {getCurrTime} from './util';  //需要加花括号  可以一次导入一个也可以一次导入多个，但都要加括号
// 如果是两个方法
// import {getCurrTime,post} from './util'; 

// 2.export default 
// import utils from './util';  //不需要加花括号  只能一个一个导入
// *export default有单次限制，只能使用export default向外暴露一次*


