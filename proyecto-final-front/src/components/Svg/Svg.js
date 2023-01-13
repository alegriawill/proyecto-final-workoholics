import './Svg.css';
import React from 'react';
import { useEffect } from 'preact/hooks';

function Svg(props) {
    return (
        <div className="svg">
            <svg id="Layer_1" data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2199.8 1292">
                <title>plano-horizontal</title>
                <path d="M2098.5,1278.7v-6.5M1003,1127.2V993.7M91,290.7H0V62.2H91m0,1167H0V993.7H91m0-80.5H60v-130H91m0-275.5H60V374.2H91m2007.5,898h89v-17.5m-89,17.5v-17.5m0,0h89m-89,0v-20.5m89,20.5v-20.5m-89,0h89m-89,0v-21.5m89,21.5v-21.5m-89,0h89m-89,0v-22.5m89,22.5v-22.5m-89,0h89m-89,0v-20.5m89,20.5v-20.5m-89,0h89m-89,0v-24m89,24v-24m-89,0V906.2h89v239.5m-89,0h89" transform="translate(1.5 1.5)" fill="none" stroke="#212222" strokeWidth="3" />
                <path className='blue_small' d="M851.5,292.5V11.5h235v281Z" transform="translate(1.5 1.5)" fill="#3bd165" fillOpacity="0.8" opacity="0.2" style={{ isolation: "isolate" }} onClick={() => { props.changeModalState(); props.setIdSala('Sala de maternidad'); props.setInfoSala("Sala de maternidad") }} />
                <path className='pink_small2' d="M1265.5,612.5,1304,529l-64.5-118a63,63,0,0,0-63,63V612.5Z" transform="translate(1.5 1.5)" fill="#fb088c" opacity="0.2" style={{ isolation: "isolate" }} onClick={() => { props.changeModalState(); props.setIdSala('Pecera 2'); props.setInfoSala("Sala principalmente para reuniones de manera telefonica o virtual, la capacidad de esta sala es de 2 personas.") }} />
                <path className='pink_small' d="M1266,784V612h-89V784Z" transform="translate(1.5 1.5)" fill="#fb088c" stroke="#212222" opacity="0.2" style={{ isolation: "isolate" }} onClick={() => { props.changeModalState(); props.setIdSala('Pecera 1'); props.setInfoSala("Sala principalmente para reuniones de manera telefonica o virtual, la capacidad de esta sala es de 2 personas.") }} />
                <path className='pink_medium' d="M90.4,292.5H493.9V11.5H90.4Z" transform="translate(1.5 1.5)" fill="#fb088c" opacity="0.2" style={{ isolation: "isolate" }} onClick={() => { props.changeModalState(); props.setIdSala('Sala de reuniones'); props.setInfoSala("Sala de reuniones mas importantes donde se juntan los jefes y/o encargados para tomar decisiones de proyectos o gestionar soluciones") }} />
                <path className='pink_large' d="M2096.8,1278H1811.3V638h285.5v40h89V905.5h-89Z" transform="translate(1.5 1.5)" fill="#fb088c" opacity="0.2" style={{ isolation: "isolate" }} onClick={() => { props.changeModalState(); props.setIdSala('Sala de reuniones grande'); props.setInfoSala("Sala principalmente para reuniones donde dispone de recursos mobiles y estaticos para su eleccion, la capacidad de esta sala es de 15 personas.") }} />
                <path className='blue_medium' d="M1811.7,1278.2H1402.2V1126.7h51V993.2h358.5Z" transform="translate(1.5 1.5)" fill="#60ccfa" opacity="0.2" style={{ isolation: "isolate" }} onClick={() => { props.changeModalState(); props.setIdSala('Cocina'); props.setInfoSala("Sala principalmente para reuniones donde dispone de recursos mobiles y estaticos para su eleccion, la capacidad de esta sala es de 6 personas.") }} />
                <path d="M80.3,1289v-78h20v58h892V984h249.5v43.4h-20V1004H1012.3v113.5h209.5v-50h20v50h100v20h-32.5V1269h83.5V1137.5h-15.9v-20h66.9V1004H1312.3V984H1633v20H1463.7v133.5h-51V1269h389.5V1004h-79.6V984h79.6V816.5h20V1269h265.5V1058h20v231H1289.2V1137.5h-277V1289Zm0-274.5v-112h20v112Zm0-216.5V494h20V798Zm0-409V251h20v30h90.9v20H100.3v88Zm0-282.5V0h1017V281h205V0h442V85h307.9l53.5,223h91.1V562h-89V669h89V916.5h-89v49.9h-20V879h20v17.5h69V689h-69v19.5h-20V649H1822.3v78.8h-20V629h285.5V497h20v45h69V328h-69v46.5h-20V319.2L2036.4,105H1724.3V20H1565.8V301H1434V281h111.8V20H1322.3V301h-245V20H860.8V291h-20V20H664.3V171.5h-20v-11H614.2v-20h30.1V20H503.8V140.5H574v20H503.7V281H644.2V233h20v68H292V281H483.8V20H100.3v86.5Z" transform="translate(1.5 1.5)" fill="#fff" stroke="#212222" strokeWidth="3" fillRule="evenodd" />
                <path d="M1168.6,794.8v-96h20v76h69v-152h-69v33h-20V543.6h20v59.3h72.6l33.7-73.1-59.1-108.1a52.89,52.89,0,0,0-47.2,52.7V509h-20V474.4a73,73,0,0,1,73-73h5.9l64.5,118h176.7l38.3,91.5V745.4h-20V614.8l-31.6-75.5h-163L1277.5,615V867.8h114.8v20H1257.6v-93Zm286.1,93v-20h52.4V811.5h20v76.3Z" transform="translate(1.5 1.5)" fill="#fff" stroke="#212222" strokeWidth="3" fillRule="evenodd" />
                <path d="M1242.1,401.1h312.8c45.9,0,81.7,38.7,81.7,84.7V804.5a83.26,83.26,0,0,1-83.2,83.2h-97.6M1168.6,701.5v103a83.26,83.26,0,0,0,83.2,83.2h139.1" transform="translate(1.5 1.5)" fill="none" stroke="#212222" strokeWidth="3" />
                <path d="M852.1,817.5h104a91.54,91.54,0,0,0,91.5-91.5V563a91.54,91.54,0,0,0-91.5-91.5h-104v-17h104A108.53,108.53,0,0,1,1064.6,563V726A108.53,108.53,0,0,1,956.1,834.5h-104Z" transform="translate(1.5 1.5)" fill="#fff" stroke="#212222" strokeWidth="3" />
                <path d="M428,836V453H751V836Zm20-20H731V473H448Z" transform="translate(1.5 1.5)" fill="#fff" stroke="#212222" strokeWidth="3" fillRule="evenodd" />
            </svg>
        </div>
    )
};

export default Svg;