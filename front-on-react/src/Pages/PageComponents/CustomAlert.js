
import {Spinner, Alert} from 'react-bootstrap';



export const AlertStatusEnum = {
	show: "show",
	hide: "hide",
	processing: "procesing"
}


export function CustomAlert(key, variant, text, alertType, status) {

    // status - принимает значения show/hide/procesing
    //
    //

    
    if(status === AlertStatusEnum.processing)
        return(
            <Spinner animation="border" variant="primary" />
        )
    else {
        return(
            <Alert key={key} variant={variant} show={status === AlertStatusEnum.show}  dismissible >{text}</Alert>
        )
    }




}
