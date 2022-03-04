/** 给一组数字，i标识第i天的股票价格，每天只可买或卖一次，求解，如何获取最大利润是多少。
 * [12,4,5,3,11,8, 1,10]
 * 买4卖5赚1
 * 买3卖11赚8
 * 买1卖10赚9
 * 输出18
 */
const arr = [12,4,5,3,11,8, 1,10]
let a = []
let count = a.length;
let k = 3
test(k, arr, 0, [])
const ret = []

a.forEach((f) => {
  let lastIdx = 0
  let val = 0

  f.forEach((s) => {
    val += getMax(arr.slice(lastIdx, lastIdx + s))
    lastIdx += s
  })

  ret.push(val)
})

console.log(Math.max(...ret))

function test(k, arr, v, c) {
  if (k <= 0) {
    return -1;
  }

  for (let i = 1; i <= arr.length ; i++) {
    if ((v + i) === arr.length) {
      a[count] ? a[count].push(...c, i):a[count] = [i, ...c]
      count++
    } else if (v + i < arr.length) {
      test(k - 1, arr, v + i, [...c, i])
    }
  }

  return -1;
}

function getMax(arr) {
  let max = -1;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
      max = Math.max(max, arr[j] - arr[i]);
    }
  }
  return max;
}
