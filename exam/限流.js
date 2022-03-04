class WorkerPool {
  constructor(size) {
    this.limitSize = size;
    this.pool = [];
    this.workers = [];
  }

  addWorker (work) {
    this.pool.push(work)
    this.start()
  }

  start () {
    for (let i = 0; i < this.limitSize&&this.workers.length <this.limitSize&&this.pool.length > 0; i++ ) {
      const work = this.pool.shift()
      const poolItem = new Promise(async (resolve, reject) => {
        let ret = null;
        try {
          ret = await work()
        } catch (e) {
          return reject(e)
        }
        return resolve(ret)
      }).then((res) => {
        const idx = this.workers.findIndex((i) => {
          return poolItem === i
        })
        this.workers.splice(idx, 1)
        return res;
      }).catch((err) => {
        const idx = this.workers.findIndex((i) => {
          return poolItem === i
        })
        this.workers.splice(idx, 1)
        return res;
      }).finally(() => {
        this.start()
      })
      this.workers.push(poolItem)
    }
  }
}

const pool = new WorkerPool(2) 

for (let i = 0; i < 10; i++) {
  pool.addWorker(() => {
    return new Promise((r) => {
      let num = 1000 - 100*i
      setTimeout(() => {
        console.log('done', num)
        r()
      }, num)
    })
  })
}
