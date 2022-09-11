import { observer } from 'mobx-react'

import {Link } from "react-router-dom";

import { BsCartFill } from "react-icons/bs";

const CartIconView = observer((props) => {

    const { mainState } = props

        return (
            <>
                {
                    //выводим состояние кнопок
                }
                <button onClick={() => mainState.increase()}>Добавить + </button>
                <h3>Seconds: {mainState.cnt}</h3>
                <button  onClick={() => mainState.decrease()} >Убрать -</button>

                <Link title="Перейти к корзине" className="nav-link" to="/shopping-cart">   <BsCartFill style={{fontSize:"1.9rem", color:"white"}} />   </Link>
                <span style={{color:"white"}}>{mainState.cartTitle}</span>

            </>
        )
    })
    

export default CartIconView