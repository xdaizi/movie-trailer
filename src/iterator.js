// 迭代器
// function makeIterator(arr) {
//     let index = 0
//     // 返回迭代器对象
//     return {
//         next: () => {
//          // 返回结果对象
//             if (index < arr.length) {
//                 return {
//                     value: arr[index++],
//                     done: false
//                 }
//             }
//             return {
//                 done: true
//             }
//         }
//     }
// }
// const tempArr = ['吃饭', '睡觉', '打豆豆']

// const it = makeIterator(tempArr)
// console.log('首先', it.next())
// console.log('其次', it.next())
// console.log('然后', it.next())
// console.log('最后', it.next())

// http://es6.ruanyifeng.com/#docs/generator
// 生成器 --- 生成迭代器

function* makeIterator(arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i]
    }
}
const tempArr = ['吃饭', '睡觉', '打豆豆']

const gen = makeIterator(tempArr)
console.log('首先', gen.next())
console.log('其次', gen.next())
console.log('然后', gen.next())
console.log('最后', gen.next())