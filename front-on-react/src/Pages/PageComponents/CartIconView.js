import { observer } from 'mobx-react-lite'

import {Link } from "react-router-dom";

import { BsCartFill } from "react-icons/bs";

const CartIconView = observer((props) => {

    const { mainState } = props

        return (
            <>
                {
                    //выводим состояние кнопок
                }
                <Link title="Перейти к корзине" className="nav-link" to="/shopping-cart">   <BsCartFill style={{fontSize:"1.9rem", color:"white"}} />   </Link>
                <span style={{color:"white"}}>{mainState.cartTitle}</span>

            </>
        )
    })
    

export default CartIconView