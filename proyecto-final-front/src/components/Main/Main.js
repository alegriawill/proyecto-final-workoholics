import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Svg from '../Svg/Svg';
import { useState } from 'react'
import ModalSala from '../Modales/ModalSala/ModalSala';


function Main(props) {
  let [infoSala, setInfoSala] = useState('')
  let [openModal, setOpenModal] = useState(false)

  function changeModalState() {
    if (openModal) {
      setOpenModal(false)
    } else {
      setOpenModal(true)
    }
  }

  return (
    <div className="main">
      <div className="main_svg" >
        <Svg changeModalState={changeModalState} setIdSala={props.setIdSala} idSala={props.idSala} infoSala={infoSala} setInfoSala={setInfoSala} />
      </div>
      <div className='modalSala'>
        {openModal && <ModalSala idSala={props.idSala} infoSala={infoSala} />}
      </div>
    </div>
  )
}

export default Main