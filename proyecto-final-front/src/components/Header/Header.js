
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { json, Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

function Header() {

    function logout() {
        localStorage.clear()
    }
    function timeOut() {
        setTimeout(function () {
            window.location.reload()
        }, 100000000000000)
    }
    function timeOutInmediato() {
        setTimeout(function () {
            window.location.reload()
        }, 1500)
    }



    function cerrarSesion() {
        Swal.fire({
            title: 'Quieres cerrar sesion?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#FB088C',
            cancelButtonColor: '#FB088C',
            confirmButtonText: 'Si, cerrar sesion!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Cerrando sesion...',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    })
                    logout()
                    timeOutInmediato()
                }
            })
    }

    const [userLocal, setUserLocal] = useState(undefined)
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const reload = () => { window.location.reload() }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const user = { name: username, password: password, email: email }
    const form = document.getElementById('modalLogin')
    const formRegistro = document.getElementById('modalRegistro')
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1600,
        timerProgressBar: true,
    })

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserLocal(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    const handleAddUser = () => {
        var loadingDialog = Swal.fire({
            title: 'Cargando...',
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: () => !Swal.isLoading(),
            backdrop: "blur(1px)",
        })
        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(res => {
                if (res.msg === "Usuario creado") {
                    Swal.fire({
                        position: 'middle',
                        icon: 'success',
                        title: 'Usuario creado',
                        showConfirmButton: true,
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                reload()
                                setEmail('')
                                setPassword('')
                            }
                        })
                } else if (res.msg === "El usuario ya existe") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El email ya esta registrado',
                    })
                        .then(result => {
                            setUsername('')
                            setEmail('')
                            setPassword('')
                        })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salio mal',
                    })
                        .then(result => {
                            setUsername('')
                            setEmail('')
                            setPassword('')
                        })
                }
            })
            .catch(error => {
                error = Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal',
                })
                    .then(result => {
                        setUsername('')
                        setEmail('')
                        setPassword('')
                    })
            });
    }

    const handleLogin = (e) => {
        e.preventDefault()
        var loadingDialog = Swal.fire({
            title: 'Cargando...',
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: () => !Swal.isLoading(),
            backdrop: "blur(1px)",
        })
        fetch('http://localhost:8000/users/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setTimeout(function () {
                    if (res.msg === "Usuario o contraseña incorrectos") {
                        loadingDialog.close()
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuario o contraseña incorrectos',
                        })
                            .then(result => {
                                setEmail('')
                                setPassword('')
                            })
                    } else {
                        Toast.fire({
                            icon: 'success',
                            title: 'Logeado correctamente'
                        })
                            .then(result => {
                                setEmail('')
                                setPassword('')
                                localStorage.setItem('user', JSON.stringify(res))
                                reload()
                            })
                        { handleClose() }
                    }
                }, 2000)
            })
            .catch(error => {
                loadingDialog.close()
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal',
                })
                    .then(result => {
                        setEmail('')
                        setPassword('')
                    })
            });
    }

    return (

        <header className="header">
            <Link to="/"><h1 className='title_header'>worköSpaces</h1></Link>
            <div className='links_header'>
                <div className='modal_login'>
                    {userLocal == undefined ? <button className='button_header' onClick={handleShow}>Iniciar sesion</button> : <div class="dropdown">
                        <button className="dropbtn">{userLocal.u._doc.name}</button>
                        <div className="dropdown-content">
                            <Link to="/mis-reservas">Mis reservas</Link>
                            <Link to="/estadisticas">Estadisticas salas</Link>
                            <Link onClick={cerrarSesion}>Cerrar sesion</Link>
                        </div>
                    </div>}
                    {/* onClick={logout} >Cerrar sesion</Link> */}
                    <Modal id="modalLogin" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='header_login_title'>Iniciar sesion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id="header_login_form" className='header_login_form' onSubmit={(e) => (e.preventDefault())}>
                                <label className='header_login_label'>Email</label>
                                <input className='header_login_input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                <label className='header_login_label'>Contraseña</label>
                                <input className='header_login_input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                <button className='button_header' onClick={handleLogin}>Entrar</button>
                                <div className='info_login'>
                                    <span className="span_login">Todavia no tienes cuenta?</span><button onClick={(e) => { e.preventDefault(); setShow2(true); setShow(false) }} className='button_header'>Registrate</button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className='modal_register'>
                    <Modal id="modalRegistro" show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title className='header_register_title'>Registro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id="header_register_form" className='header_register_form' onSubmit={(e) => (e.preventDefault())}>
                                <label className='header_register_label'>Usuario</label>
                                <input className='header_register_input' type='name' placeholder='Nombre' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                                <label className='header_register_label'>Email</label>
                                <input className='header_register_input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                <label className='header_register_label'>Contraseña</label>
                                <input className='header_register_input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                <button className='header_register_button' onClick={(e) => { e.preventDefault(); handleAddUser() }}>Registrarse</button>
                                <div className='info_register'>
                                    <span className="span_register">Ya tienes cuenta?</span><button onClick={(e) => { e.preventDefault(); setShow(true); setShow2(false) }} className='button_register_register'>Entrar</button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                {/* <p className='bar'>|</p>
                <Link className='stats_header'>Stats</Link> */}

            </div>
        </header >
    )
}

export default Header