import Calendar from "../Calendar/Calendar"
import Header from "../Header/Header"

function ReservasUsuario(){
    return(
        <>
        <Header/>
        <Calendar tipoCalendario={'personal'}/>
        </>
    )
}

export default ReservasUsuario