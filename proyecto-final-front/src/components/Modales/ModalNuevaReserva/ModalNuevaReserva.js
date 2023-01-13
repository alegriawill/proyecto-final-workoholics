import { useEffect, useState } from "react"
import styles from './ModalNuevaReserva.module.css'
import { useParams } from 'react-router-dom';


function ModalNuevaReserva(props) {

    let { id } = useParams()
    const [userLocal, setUserLocal] = useState()
    let recursosMoviles = ['Impresora', 'Conexión de alta velocidad', 'Ordenador portátil']


    let [fechaInicioInput, setFechaInicioInput] = useState(props.infoFecha)
    let [horaInicio, setHoraInicio] = useState(props.infoHora)
    let [fechaFinInput, setFechaFinInput] = useState(props.infoFecha)
    let [horaFin, setHoraFin] = useState(props.infoHoraFin)
    let [inputUsuarios, setInputUsuarios] = useState('')
    let [usuariosReservas, setUsuariosReservas] = useState([])
    let [reload, setReload] = useState('false')
    let [selectedRecursos, setSelectedRecursos] = useState([])
    let [selectedRecursos2, setSelectedRecursos2] = useState([])


    useEffect(() => {
        setFechaInicioInput(props.infoFecha)
        setHoraInicio(props.infoHora)
        setFechaFinInput(props.infoFecha)
        setHoraFin(props.infoHoraFin)
        if (props.tipoModal === 'newReserva') {
            if (props.openModal) {
                if (usuariosReservas.length < 1)
                    setUsuariosReservas([...usuariosReservas, userLocal.u._doc.email])
            } else {
                setUsuariosReservas([])
            }

        } else {
            setUsuariosReservas(props.usuariosReservas)
        }
        setInputUsuarios('')
        setSelectedRecursos2(props.selectedRecursos)
    }, [props.modalState])
    console.log(props.selectedRecursos)
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserLocal(JSON.parse(localStorage.getItem('user')))
        }
    }, [])


    function reloadState() {
        if (reload) {
            setReload(false)
        } else {
            setReload(true)
        }
    }

    function modalState() {
        return (
            props.modalState
        )
    }

    function calcularTiempoUso() {
        let minutosInicio = parseInt(horaInicio.substring(0, 2)) * 60 + parseInt(horaInicio.substring(3, 5))
        let minutosFin = parseInt(horaFin.substring(0, 2)) * 60 + parseInt(horaFin.substring(3, 5))
        return ((minutosFin - minutosInicio))
    }

    function confirmarReserva() {

        let nuevaReserva = {
            timeInic: fechaInicioInput + ' ' + horaInicio,
            timeFinish: fechaFinInput + ' ' + horaFin,
            timeBooking: calcularTiempoUso(),
            emails: usuariosReservas,
            roomId: id,
            means: selectedRecursos2
        }

        fetch('http://localhost:8000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaReserva),
        })
            .then(res => res.json())
            .then(res => {
                props.modalState()
            })

    }

    function editReserva() {
        let editReserva = {
            timeInic: fechaInicioInput + ' ' + horaInicio,
            timeFinish: fechaFinInput + ' ' + horaFin,
            timeBooking: calcularTiempoUso(),
            emails: usuariosReservas,
            roomId: id,
            means: selectedRecursos2
        }

        fetch('http://localhost:8000/bookings/' + props.idReserva, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editReserva),
        })
            .then(res => res.json())
            .then(res => {
                props.modalState()
            })
    }

    function deleteReserva() {
        fetch('http://localhost:8000/bookings/' + props.idReserva, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                props.modalState()
            })
    }

    function anadirUsuario(e) {
        var key = e.key;
        if (key == 'Enter') {
            if (inputUsuarios.trim() != '') setUsuariosReservas([...usuariosReservas, inputUsuarios])
            setInputUsuarios('')
        }


    }

    function eliminarUser(position) {
        usuariosReservas.splice(position, 1)
        reloadState()
    }

    function PintarRecursos() {
        console.log(recursosMoviles)
        return (
            recursosMoviles.map((recurso) => {
                if (selectedRecursos.length != 0) {
                    return (
                        <div className={styles.checkbox}>
                            <input type="checkbox" name={recurso} onClick={checkedCheckbox} checked={selectedRecursos2.includes(recurso) ? true : false} />
                            <label htmlFor={recurso}>{recurso}</label>
                        </div>

                    )
                } else {
                    return (
                        <div className={styles.checkbox}>
                            <input type="checkbox" name={recurso} onClick={checkedCheckbox} checked={selectedRecursos2.includes(recurso) ? true : false} />
                            <label htmlFor={recurso}>{recurso}</label>
                        </div>
                    )
                }
            })
        )
    }

    function checkedCheckbox(e) {
        if (e.target.checked) {
            setSelectedRecursos2([...selectedRecursos2, e.target.name])
        } else {
            setSelectedRecursos2(selectedRecursos2.filter(recurso => recurso != e.target.name))
        }
    }



    if (props.openModal) {
        return (
            <>
                <div className={styles.modal}>
                    <div className={styles.title}>
                        {props.tipoModal === 'newReserva' ? <h2>Nueva reserva</h2> : <h2>Editar reserva</h2>}
                        <p className={styles.close} onClick={modalState()}>X</p>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.fechaHora}>
                            <div className={styles.grupoFechaHora}>
                                <div className={styles.form}>
                                    <label htmlFor="fechaInicio" className={styles.title}>Inicio</label>
                                    <input type="date" name="fechaInicio" placeholder={fechaInicioInput} value={fechaInicioInput} onChange={(e) => { setFechaInicioInput(e.target.value) }} />
                                </div>

                                <div className={styles.form}>
                                    {/* <label htmlFor="horaInicio" className={styles.title}>Hora de inicio</label> */}
                                    <input type="time" name="horaInicio" value={horaInicio} onChange={(e) => { setHoraInicio(e.target.value) }} />
                                </div>
                            </div>

                            <div className={styles.grupoFechaHora}>
                                <div className={styles.form}>
                                    <label htmlFor="fechaFin" className={styles.title}>Fin</label>
                                    <input type="date" name="fechaFin" value={fechaFinInput} onChange={(e) => { setFechaFinInput(e.target.value) }} />
                                </div>

                                <div className={styles.form}>
                                    {/* <label htmlFor="horaFin" className={styles.title}>Hora de fin</label> */}
                                    <input type="time" name="horaFin" value={horaFin} onChange={(e) => { setHoraFin(e.target.value) }} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.form}>
                            <label htmlFor="" className={styles.title}>Recursos móviles</label>
                            <div>
                                <PintarRecursos />
                            </div>
                        </div>

                        <div className={styles.form}>
                            <label htmlFor="usuarios" className={styles.title}>Emails</label>
                            <input type="text" placeholder="Invita usuarios" name="usuarios" value={inputUsuarios} onKeyPress={(e) => { anadirUsuario(e) }} onChange={(e) => { setInputUsuarios(e.target.value) }} />
                        </div>

                        <div className={styles.espacioChips}>
                            {usuariosReservas.length > 0 ? usuariosReservas.map((usuario, index) => {
                                return (
                                    <div className={styles.chip}>
                                        <p>{usuario}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => eliminarUser(index)} className={styles.icon}><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" /></svg>
                                    </div>
                                )
                            }) : <></>}
                        </div>
                    </div>

                    <div className={styles.botones}>
                        {props.tipoModal === 'newReserva' ? <button onClick={confirmarReserva}>Reservar</button> : <>  <button className={styles.button_secundario_alert} onClick={() => { deleteReserva() }}>Eliminar reserva</button> <button onClick={() => { editReserva() }}>Editar reserva</button></>}
                    </div>
                </div>
                <div className={styles.blurBG} onClick={modalState()}></div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default ModalNuevaReserva