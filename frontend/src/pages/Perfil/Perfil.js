import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/index';
import { isAuthenticated } from '../../components/auth/auth';
import { Link } from 'react-router-dom';

import axios from 'axios';

import style from './Perfil.module.scss';

const Perfil = () => {

    const [count, setCount] = useState(true);

    const [name, setName] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');

    useEffect(() => {
        if(count){
            async function buscaDados(){
                await axios.get('http://localhost:5000/api/cadastro/' + isAuthenticated())
                    .then(async (response) => {
                        const dados = await response.data.message
                        console.log(dados);
                        setName(dados.nome_pessoa);
                        setEmail(dados.email);
                        setDataNascimento(dados.data_nascimento);
                        setNumero(dados.numero);
                        setCount(false);
                });
            }
            buscaDados();
        }
    });

    let data = dataNascimento.split('/')

    return(
        <div>
            <div>
                <Sidebar text={"perfil"}/>
            </div>

            <div>
                <div className={style.container}>
                    <div className={style.quadrado}>
                        <h1>Perfil</h1>
                        <div className={style.floatLabel}>
                            <label className={style.upper}>{name}</label>
                            <label>{email}</label>
                            {/* {dataNascimento ? <label>{dataNascimento}</label> : null } */}
                            {numero ? <label>{numero}</label> : <label>Defina seu número</label>}

                            <div className={style.dropdown}>
                                
                                <div>
                                    <select className={style.buttonSelect}>
                                        <option selected hidden>{data[0]}</option>
                                    </select>
                                </div>
                                <div>
                                    <select className={style.buttonSelect}>
                                        <option selected hidden>{data[1]}</option>
                                    </select>
                                </div>
                                <div>
                                    <select className={style.buttonSelect}>
                                        <option selected hidden>{data[2]}</option>
                                    </select>
                                </div>

                            </div>
                            
                        </div>
                        <div className={`${style.floatLabel} ${style.botoes}`}>
                            <Link to='/profile_edit'>
                                <button className={style.editar}>Editar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil;