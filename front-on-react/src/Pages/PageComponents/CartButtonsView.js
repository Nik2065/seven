import { observer } from 'mobx-react-lite'
import mainStore from '../../MainStore';

import { Button }  from 'react-bootstrap';
import { BsCartFill, BsPlusSquare} from "react-icons/bs";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
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
    const productCount = mainStore.getProductCount(currentProduct.id);


    return (
        <>
            {
                //выводим состояние кнопок
            }

            {

            (productCount === 0) ?
            <div style={{ textAlign:"center"}}>
                <Button onClick={() => mainStore.addToCart(currentProduct)} variant="outline-success">&nbsp;&nbsp;&nbsp;<BsCartFill/>&nbsp;&nbsp;&nbsp;</Button>
            </div>

            :
            <div style={{ textAlign:"center"}}>
                <Button onClick={() => mainStore.addToCart(currentProduct)}  variant="outline-success">&nbsp;<AiOutlinePlus/>&nbsp;</Button>
                <span className='h6'>&nbsp;{productCount}&nbsp;</span>
                <Button onClick={() => mainStore.deleteFromCart(currentProduct)} variant="outline-success">&nbsp;<AiOutlineMinus/>&nbsp;</Button>
            </div>
            }
        </>
    )
})


export default CartButtonsView