import { useEffect, useState } from 'react';
import './Estadisticas.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function Estadisticas() {
    let [time, setTime] = useState([])
    const labels = ['Sala de reuniones grande ', 'Sala de reuniones pequeña', 'Pecera 1', 'Pecera 2', 'Sala maternal', 'Sala de reuniones mediana'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Uso de las salas en minutos',
                data: time,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: '#FBEAE9',
                hoverBackgroundColor: "#FB088C"
            },
        ],
    }
    useEffect(() => {
        fetch('http://localhost:8000/bookings')
            .then(res => res.json())
            .then(res => {
                let newTimes = [[], [], [], [], [], []]
                res.forEach(booking => {
                    console.log(booking)
                    switch(booking.roomId){
                        case 'Sala de reuniones grande':
                        newTimes[0].push((booking.timeBooking))
                        break;
                        case 'Sala de reuniones':
                        newTimes[1].push((booking.timeBooking))
                        break;
                        case 'Pecera 1':
                        newTimes[2].push((booking.timeBooking))
                        break;
                        case 'Pecera 2':
                        newTimes[3].push((booking.timeBooking))
                        break;
                        case 'Sala de maternidad':
                        newTimes[4].push((booking.timeBooking))
                        break;
                        case 'Cocina':
                        newTimes[5].push((booking.timeBooking))
                        break;
                    }
                });
                newTimes = newTimes.map(time => {
                    if (time.length > 0) {
                        let sum = 0
                        time.forEach((t => {
                            sum += t
                        }))
                        let result = sum / time.length
                        return result

                    } else {
                        return 0
                    }
                })
                setTime(newTimes)
            })

    }, [])
    return (
        <div className="estadisticas">
            <Bar width={350} height={window.innerHeight < 700 ? 450 : 150} options={options} data={data} className={"grafico"}/>
        </div>
    );
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    animation: true,
    // aspectRatio:2.5,
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,  
            text: 'Uso de salas',
        },
    },
};

const labels = ['Sala de reuniones grande ', 'Sala de reuniones', 'Pecera 1', 'Pecera 2', 'Sala de maternidad', 'Cocina'];

export default Estadisticas;