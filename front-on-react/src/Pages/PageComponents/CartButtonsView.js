import { observer } from 'mobx-react'

/*
const TimerView = observer((props) => {
    const { timerState } = props
    return (
        <>
            <h3>Seconds: {timerState.seconds}</h3>
            <button onClick={() => timerState.reset()}>Reset timer</button>
        </>
    )
})

export default TimerView
*/

const CartButtonsView = observer((props) => {
    const { mainState } = props
    return (
        <>
            {
                //выводим состояние кнопок
            }
            <button onClick={() => mainState.increase()}>Добавить + </button>
            <h3>Seconds: {mainState.cnt}</h3>
            <button  onClick={() => mainState.decrease()} >Убрать -</button>
        </>
    )
})

export default CartButtonsView