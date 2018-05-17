function merge(left, right) {
	let result = []
	console.log('\b')
	console.log('\b')
	console.log('merge function')
	console.log('*********************************')
    console.log(result)
	console.log(left)
	console.log(right)
	console.log('--------------分割线--------------')
	while(left.length > 0 && right.length > 0) {
		if (left[0] < right[0]) {
			result.push(left.shift())
		} else {
			result.push(right.shift())
		}
	}

	console.log(result)
	console.log(left)
	console.log(right)
	console.log('--------------分割线--------------')
    let newR = result.concat(left, right)
    console.log(newR)
	console.log('*********************************')
	return newR
}

function mergeSort(originArr) {
	let originArrLength = originArr.length
    console.log('\b')
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    console.log(originArr)
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
	console.log('\b')
	if (originArrLength < 2) return originArr

	let middle = Math.floor(originArrLength / 2)
	let left   = originArr.slice(0, middle)
	let right  = originArr.slice(middle)
	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
	console.log(originArr)
	console.log(left)
	console.log(right)
	console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

	return merge(mergeSort(left), mergeSort(right))
}

let arr = mergeSort([32, 1, 54])
console.log(arr)