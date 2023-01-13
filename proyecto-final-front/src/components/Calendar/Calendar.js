import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import ModalNuevaReserva from '../Modales/ModalNuevaReserva/ModalNuevaReserva';
import { useParams } from 'react-router-dom';



function Calendar(props) {

    let { id } = useParams()
    const [userLocal, setUserLocal] = useState()

    let [tipoModal, setTipoModal] = useState('')
    let [eventos, setEventos] = useState([])
    let [openModal, setOpenModal] = useState(false)
    let [infoFecha, setInfoFecha] = useState('')
    let [infoHora, setInfoHora] = useState('')
    let [infoHoraFin, setInfoHoraFin] = useState('')
    let [idReserva, setIdReserva] = useState()
    let [usuariosReservas, setUsuariosReservas] = useState([])
    let [selectedRecursos, setselectedRecursos] = useState([])

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserLocal(JSON.parse(localStorage.getItem('user')))
        }
    }, [])


    useEffect(() => {
        if (props.tipoCalendario == 'global') {

            fetch('http://localhost:8000/bookings')
                .then(res => res.json())
                .then(res => {

                    let tempArr = []

                    res.map(reserva => {
                        if (id == reserva.roomId) {
                            let newObj = {
                                id: reserva.id,
                                start: reserva.timeInic,
                                end: reserva.timeFinish,
                                emails: reserva.emails
                            }

                            tempArr = [...tempArr, newObj]
                        }

                    })
                    setEventos(tempArr)
                })
        } else {
            fetch('http://localhost:8000/bookings')
                .then(res => res.json())
                .then(res => {

                    let tempArr = []

                    res.map(reserva => {
                        reserva.emails.forEach(email => {
                            if (email === userLocal.u._doc.email) {
                                let newObj = {
                                    id: reserva.id,
                                    start: reserva.timeInic,
                                    end: reserva.timeFinish,
                                    emails: reserva.emails
                                }

                                tempArr = [...tempArr, newObj]
                            }
                        })
                        setEventos(tempArr)
                    })
                })
        }
    }, [openModal, userLocal])

    function modalState() {
        if (openModal) {
            setOpenModal(false)
        } else {
            setOpenModal(true)
        }
    }

    function calculateFin(date) {
        let hora = parseInt(date.substring(11, 13)) + 1
        let minuto = date.substring(14, 16)

        setInfoHoraFin(hora < 10 ? '0' + hora + ':' + minuto : hora + ':' + minuto)
    }

    function getUsers(idReserva) {
        fetch('http://localhost:8000/bookings/' + idReserva)
            .then(res => res.json())
            .then(res => {
                setUsuariosReservas(res.emails)
            })
    }

    function getRecursos(idReserva) {
        fetch('http://localhost:8000/bookings/' + idReserva)
            .then(res => res.json())
            .then(res => {
                setselectedRecursos(res.means)
            })
    }


    if (props.tipoCalendario == 'global') {
        return (
            <>
            <h2 className='calendarTitle'>Calendario {id}</h2>

                <FullCalendar
                    contentHeight={'auto'}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    events={eventos}
                    allDaySlot={false}
                    eventColor='#DF1F1F'
                    stickyHeaderDates={true}

                    dateClick={
                        function (info) {
                            modalState()
                            setTipoModal('newReserva')
                            setInfoFecha(info.dateStr.substring(0, 10))
                            setInfoHora(info.dateStr.substring(11, 16))
                            // setOpenModal(true)
                            calculateFin(info.dateStr)
                        }
                    }

                />
                <ModalNuevaReserva modalState={modalState} openModal={openModal} infoFecha={infoFecha} infoHora={infoHora} infoHoraFin={infoHoraFin} id={props.idSala} tipoModal={tipoModal} idReserva={idReserva} usuariosReservas={usuariosReservas} selectedRecursos={selectedRecursos} />
            </>
        )
    } else {
        return (
            <>
            <h2 className='calendarTitle'>Mi calendario</h2>
                <FullCalendar
                    contentHeight={'auto'}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    events={eventos}
                    allDaySlot={false}
                    stickyHeaderDates={true}


                    eventClick={
                        function (info) {
                            modalState()
                            setTipoModal('editReserva')
                            setInfoFecha(info.event.startStr.substring(0, 10))
                            setInfoHora(info.event.startStr.substring(11, 16))
                            setInfoHoraFin(info.event.endStr.substring(11, 16))
                            setIdReserva(parseInt(info.event.id))
                            getUsers(info.event.id)
                            getRecursos(info.event.id)

                            info.jsEvent.preventDefault(); // don't let the browser navigate
                        }
                    }

                />
                <ModalNuevaReserva modalState={modalState} openModal={openModal} infoFecha={infoFecha} infoHora={infoHora} infoHoraFin={infoHoraFin} id={props.idSala} tipoModal={tipoModal} idReserva={idReserva} usuariosReservas={usuariosReservas} selectedRecursos={selectedRecursos} />
            </>
        )
    }

}

export default Calendar