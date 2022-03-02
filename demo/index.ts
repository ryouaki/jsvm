console.log('start')

async function test1() {
  console.log('test1 1')
  await test2()
  await test3()
}

function test2() {
  console.log('test2')
}

function test3() {
  console.log('test3')
}

test1()