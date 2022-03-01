console.log('start')

async function test1() {
  console.log('test1 1')
  await test2()
  console.log('test1 2')
}

function test2() {
  console.log('test2')
}

test1()