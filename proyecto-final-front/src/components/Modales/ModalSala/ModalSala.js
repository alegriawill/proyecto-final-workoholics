import Sala from '../../Media/sala1.jpg'
import { Link } from 'react-router-dom'
import Flecha from '../../Media/Flecha_atras.png'
import './ModalSala.css'


function ModalSala(props) {

    function closeModal() {
        const modal = document.getElementById('main_text');
        modal.style.display = 'none';
    }

    return (
        <div id="main_text" >
            <p className='return'><img id="button" src={Flecha} alt="Cerrar " className='main_img' onClick={closeModal} /></p>
            <img classname='sala1' src={Sala} alt="Sala" width='100%' height='50%' />
            <h3 className='main_title'>{props.idSala}</h3>
            <p className='main_p'>{props.infoSala}</p>
            
                <button className='main_button'><Link to={'/reservas/' + props.idSala}>Ver disponibilidad</Link></button>
            
        </div>
    )
}

export default ModalSala