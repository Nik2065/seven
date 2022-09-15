import { observer } from 'mobx-react-lite'
import mainStore from '../../MainStore';


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
    //const { mainState } = props
    const {currentProduct} = props;

    
    const productCount = () => {
        const a = mainStore.getProductCount(currentProduct.id);
        //console.log({a});
        //console.log("id:" + currentProduct.id)
        return a;

    }


    return (
        <>
            {
                //выводим состояние кнопок
            }
            <button onClick={() => mainStore.addToCart(currentProduct)}>Добавить + </button>
            
            <h3>{mainStore.getProductCount(currentProduct.id)}</h3>
            <button onClick={() => mainStore.deleteFromCart(currentProduct)} >Убрать -</button>


        </>
    )
})


export default CartButtonsView