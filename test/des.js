// 测试装饰器模式
class Boy {
    @speak('中文')
    run() {
        console.log('I can run!' + this.language)
    }
}
// target:装饰的对象, key:装饰的方法,descriptor对象属性的描述
// function speak(target, key, descriptor) {
//     console.log(target)
//     console.log(key)
//     console.log(descriptor)
// }
function speak(language) {
    return function(target, key, descriptor) {
        console.log(target)
        console.log(key)
        console.log(descriptor)
        target.language = language
        // return descriptor
    }
}
const Luke = new Boy()
Luke.run()