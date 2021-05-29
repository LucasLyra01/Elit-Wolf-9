import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/index';
import { Chart } from 'react-google-charts';

import style from './Dashboard.module.scss';
import { Header } from '../../components/Header';


const Dashboard = () => {

    const dados = [
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000],
    ]

    const opcoes = {
        title: 'Population of Largest U.S. Cities',
        chartArea: { width: '30%' },
        hAxis: {
            title: 'Total Population',
            minValue: 0,
        },
        vAxis: {
            title: 'City',
        },
    }

    const [options, setOptions] = useState({
        title: "Gráfico de pizza"
    });

    const [data, setData] = useState([
        ['paridade', '80%']
    ]);


    return(
        <div>
            <div>
                <Sidebar text={'dashboard'}/>
            </div>
            <div>
                <div className={style.container}>

                    <div>
                        <Header title={`Bom dia, @usuário`} text={'Tenha um bom dia de investimento'}/>
                    </div>

                    <div className={style.content}>

                        <div className={style.barChart}>
                            <h1>Grafico de barras</h1>
                            <Chart
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={dados}
                                options={opcoes}
                                legendToggle
                            />
                        </div>

                        <div className={style.probability}>

                            <div className={style.percent}>
                                <h1>Par 1</h1>    
                            </div>

                            <div className={style.percent}>
                                <h1>Par 2</h1>    
                            </div>

                            <div className={style.percent}>
                                <h1>Par 3</h1>    
                            </div>

                            <div className={style.percent}>
                                <h1>Par 4</h1>    
                            </div>

                        </div>

                        <div className={style.list}>
                            <h1>Lista de sinais</h1>
                        </div>

                        <div className={style.pieChart}>
                            <h1>Gráfico de pizza</h1>
                            <Chart 
                                width={'25rem'}
                                height={'25rem'}
                                chartType='PieChart'
                                loader={<h1>Loading Chart</h1>}
                                data={dados}
                                options={opcoes}
                                legendToggle
                            />
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>

    )
}

export default Dashboard;