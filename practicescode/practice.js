//forEach polyfil
// const  names = ['s','b','dfhhhd','dfg','d','df','gdg']
// names.forEach(element => {
    
//     console.log(element+5)
// }); 

// Array.prototype.Myforeach = function(cb){
//     for(let i=0; i<this.length; i++){
//         cb(this[i])
//     }
// }

// names.Myforeach(elements=>{
//     console.log("MYforeachAns->",elements)
// })

//map polyfill

// let arr = [10,20,30,40,50]
// let ans = arr.map((ele)=>{
//      return ele*ele
// })
// console.log(ans)

// Array.prototype.myMap=function(ele){
//     let ans = []
//     for(let i=0;i<this.length;i++){
//         ans.push(ele(this[i]))
//     }
//     return ans
// }

// let result = arr.myMap((e)=>{
//     return e*e
// })

// console.log(result)

//reduce polyfill

// let arr = [1,2,3,4,5]
// let ans = arr.reduce((pre,curr)=>{
//     return curr = pre-curr
// })
// console.log(ans)

// Array.prototype.myReduce = function(cb,intialvalue){
//     let accumulator = intialvalue
//     for(let i=0;i<this.length;i++){
//         accumulator = cb(accumulator,this[i])
//     }
//     return accumulator
// }

// let ans2 = arr.myReduce((pre,curr)=>{
//     return curr = pre+curr
// },0)
// console.log(ans2)

// Array.prototype.myReduce = function(cb,intialvalue){
//     let accumulator;
//     let firstvalue;

//     if(arguments.length===1){
//         accumulator = this[0]
//         firstvalue = 1
//     }else{
//         accumulator = intialvalue
//         firstvalue = 0
//     }
//     for(let i=firstvalue;i<this.length;i++){
//         accumulator = cb(accumulator,this[i])
//     }
//     return accumulator
// }

// let ans3 = arr.myReduce((pre,curr)=>{
//     return curr = pre+curr
// },5)
// console.log(ans3)

// let status = 'hi'
// setTimeout(()=>{
//     let status = 'hello'
//     const data = {
//         status:'bye',
//         getStatus(){
//             return this.status;
//         },
//     }
//     console.log(data.getStatus())
//     console.log(data.getStatus.call(this))
// },0)

// let myPromise = new Promise(function(resolve, reject){
//     const a = 4
//     const b = 4

//     if(a == b) {
//         resolve('Yes They are Equal')
//     }
//     else {
//         reject('No They are not Equal')
//     }
// })


// // then method
// console.log(myPromise)
// myPromise.then(function(data){
//     console.log(data)
// })

// const fs = require('fs')

// let promiseReadFile = fs.promises.readFile('f1.txt')

// promiseReadFile.then(function(data) {
//     console.log('This is file data -> ' + data)
// })

// promiseReadFile.catch(function(err) {
//     console.log('This is Your Error -> ' + err)
// })
function placeOrder(drink) {
    return new Promise(function(resolve, reject) {
        if(drink === 'coffee') {
            resolve('Order for Coffee Placed.')
        }
        else {
            reject('Order can not be Placed.')
        }
    })
}

function processOrder(orderPlaced) {
    return new Promise(function(resolve) {
        resolve(`${orderPlaced} and Served.`)
    })
}

placeOrder('coffee').then(function(orderStatus) {
    console.log(orderStatus)
    return orderStatus
}).then(function(orderStatus) {
    let orderIsProcessed = processOrder(orderStatus)
    console.log(orderIsProcessed)
    return orderIsProcessed
}).then(function(orderIsProcessed) {
    console.log(orderIsProcessed)
})