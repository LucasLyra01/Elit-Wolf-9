import React from 'react';
import { Sidebar } from '../../components/Sidebar/index';

import style from './Dashboard.module.scss';

const Dashboard = () => {

    return(
        <div>
            <div>
                <Sidebar text={'dashboard'}/>
            </div>
            <div>
                <div className={style.container}>

                    <div className={style.header}>
                        <h1>Bom dia, <span>Gente</span></h1>
                        <h2>Tenha um bom dia de investimento</h2>
                    </div>

                    <div className={style.graficos}>
                        <div className={style.esquerda}>
                            <div className={style.graficoLista}>
                                <h1>grafico</h1>
                            </div>    
                            <div className={style.lista}>
                                <h1>lista</h1>
                            </div>
                        </div>            
                        <div className={style.direita}>
                            <div className={style.payout}>
                                <h1>payout</h1>
                            </div>    
                            <div className={style.direcoes}>
                                <h1>pizza</h1>
                            </div>
                        </div>            
                    </div>
                    
                </div>
            </div>
        </div>

    )
}

export default Dashboard;