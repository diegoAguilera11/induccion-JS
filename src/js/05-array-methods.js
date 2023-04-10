// filter
// find
// includes
// findIndex
// map
// some

const array = [2,3,4,5]
const arrayFiltrado = array.filter(elemento => elemento > 2)
const arrayFind = array.findIndex(elemento => elemento === 100)

const arraySome = array.some(elemento => elemento === 3)

const arrayMap = array.map(elemento => elemento * 2)

// console.log(array)
// console.log(arrayFiltrado)
// console.log(arrayFind)
// console.log(arraySome)
// console.log(arrayMap)

console.log(array.includes("Diego"))

