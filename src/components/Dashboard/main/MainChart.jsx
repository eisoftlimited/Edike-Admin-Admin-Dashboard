import classes from './MainChart.module.scss';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { faker } from '@faker-js/faker';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: '',
        // data: [1000, 2000, 5000, 10000],
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        // data: labels.map(label => {
        //     if(label === 'Mon') {
        //         return 1000;
        //     } else if(label === 'Tue') {
        //         return 2000;
        //     }

        //     return 0;
        // }),
        backgroundColor: '#47B88F',
      }
    ],
  };

function MainChart({className}) {
    return ( 
        <div className={`${classes['main-chart']} ${className ? className : ''}`}>
            <h2>Customers Growth</h2>
            <Bar options={options} data={data} />
        </div>
     );
}

export default MainChart;