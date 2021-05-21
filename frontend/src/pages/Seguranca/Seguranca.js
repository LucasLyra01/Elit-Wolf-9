import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/index';
import { isAuthenticated } from '../../components/auth/auth';
import { Link } from 'react-router-dom';

import axios from 'axios';

import style from './Security.module.scss';
import { Header } from '../../components/Header';

const Seguranca = () => {
            
    return(
        <div>
            <div>
                <Sidebar text={'dashboard'}/>
            </div>

            <div className={style.container}>

                <div>
                    <Header title={'Segurança'} text={'Clique em salvar para alterar sua senha'}/>
                </div>

                {/* <div className={style.header}>
                    <h1>Segurança</h1>
                    <h2>Clique em salvar para alterar sua senha </h2>
                </div> */}

                <div className={style.content}>
                    <div className={style.tips}>

                        <div className={style.info}>
                            <img src={'/info.svg'} alt='Info'/>
                        </div>

                        <div className={style.text}>
                            {/* <h1>Fica a dica: </h1>
                            <p>Para uma senha mais forte e segura recomendamos o uso de
                                letras minúsculas e maiúsculas, números e caracteres especiais, como !@#)
                            </p> */}

                            <p>
                                <span>Fica a dica:</span>
                                Para uma senha mais forte e segura recomendamos o uso de letras minúsculas e maiúsculas, números e caracteres especiais, como !@#)
                            </p>
                        </div>
                    </div>

                    <div className={style.inputs}>
                        <input id='currentPassword' placeholder='Senha atual'/>
                        <input id='newPassword' placeholder='Nova senha'/>
                        <input id='confirmPassword' placeholder='Confirmar senha'/>

                        <button>Salvar</button>
                    </div>
                </div>
            </div>

           
        // </div>

    );
}

export default Seguranca;