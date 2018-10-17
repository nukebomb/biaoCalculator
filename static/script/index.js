//基准平均价
function avg_stander(priceArr) {
  var length = priceArr.length
  var avg_result
  if (length < 5) {
    avg_result = avg(priceArr)
  } else if (length === 5) {
    var realArr = priceArr.slice(0, 4)
    //console.log(realArr)
    var afterten = maxMinInduce(realArr)
    //console.log(afterten)
    avg_result = avg(afterten)
  } else {
    console.log("现在不支持公司数目大于5的计算")
  }
  return avg_result
}

function avg(arr) {
  let sum = arr.reduce((previous, current) => current += previous);
  let avg = (Math.round(sum / arr.length * 1000000)) / 1000000
  return avg
}

function maxMinInduce(arr) {
  var maxIndex = 0
  var minIndex = 0
  var maxitem = 0
  var minitem = 0
  for (var i = 1; i < arr.length; i++) {
    if (arr[maxIndex] <= arr[i]) {
      maxIndex = i
    } else if (arr[minIndex] > arr[i]) {
      minIndex = i
    }
  }
  maxitem = Math.round((arr[maxIndex] * 0.9) * 1000000) / 1000000
  minitem = Math.round((arr[minIndex] * 0.9) * 1000000) / 1000000
  arr.splice(maxIndex, 1, maxitem)
  arr.splice(minIndex, 1, minitem)
  return arr
}

//经济标得分
function companyScore(arr) {
  var avgStander = avg_stander(arr)
  var resultmin = []
  var result = []
  arr.forEach(element => {
    var r = element - avgStander >= 0 ? 0.5 : 0
    //var current = Math.round((100 - Math.round(Math.abs((element - avgStander) / avgStander) * 100000000) / 1000000 * r) * 1000000) / 1000000
    var current = 100 - Math.abs((element - avgStander) / avgStander) * 100 * r
    //当经济标出现负数，经济标为0
    current = current > 0 ? current : 0
    resultmin.push(Math.round(current * 0.4 * 100000000) / 100000000)
    result.push(Math.round(current * 100000000) / 100000000)
    //result.push(current)
  });
  return { avgStander, resultmin, result }
}

export {companyScore}