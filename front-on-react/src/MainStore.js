import { makeAutoObservable } from 'mobx'

class MainStore {
    cnt = 0

    constructor() {
        makeAutoObservable(this)
    }

    increase() {
        this.cnt++
    }

    decrease() {
        this.cnt--
    }


    reset() {
        this.cnt = 0
    }
}


const mainStore = new MainStore()
export default mainStore