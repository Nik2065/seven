//const Map = require("immutable").Map;
import { Map }  from 'immutable';


const reducer = function(state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
        return state.merge(action.state);
    case "ADD_PRODUCT":
        return state.update("phones", (phones) => [...phones, action.product]);
    case "DELETE_PRODUCT":
        return state.update("phones",
            (products) => products.filter(
                (item) => item !== action.product
            )
        );
  }
  return state;
}


//module.exports = reducer;
export default reducer;