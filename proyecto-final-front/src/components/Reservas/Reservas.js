import Header from "../Header/Header"
import Calendar from '../Calendar/Calendar'

function Reservas(props){
    return(
        <>
        <Header/>
        <Calendar idSala={props.idSala} tipoCalendario={'global'}/>
        </>
    )
}

export default Reservas