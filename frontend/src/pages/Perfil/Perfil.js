import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/index';
import { isAuthenticated } from '../../components/auth/auth';
import { Link } from 'react-router-dom';

import axios from 'axios';

import style from './Perfil.module.scss';
import { Header } from '../../components/Header';

const Perfil = () => {

    const [count, setCount] = useState(true);

    const [name, setName] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [numero, setNumero] = useState('');

    useEffect(() => {
        if(count){
            async function buscaDados(){
                await axios.get('http://localhost:5000/api/cadastro/' + isAuthenticated())
                    .then(async (response) => {
                        const dados = await response.data.message
                        console.log(dados);
                        setName(dados.nome_pessoa);
                        setSobrenome(dados.sobrenome);
                        setEmail(dados.email);
                        setDataNascimento(dados.data_nascimento);
                        setNumero(dados.numero);
                        setCount(false);
                });
            }
            buscaDados();
        }
    });

    let data = dataNascimento.split('/');

    return(
        <div>
            <div>
                <Sidebar text={'dashboard'}/>
            </div>

            <div className={style.container}>

                <div>
                    <Header title={'Perfil'} text={'Clique em editar, para alterar seus dados'}/>
                </div>

                <div className={style.content}>
                    
                    <div className={style.form}>

                        <p>Nome: <span>{name}</span></p>
                        {sobrenome ? <p>Sobrenome: <span>{sobrenome}</span></p> : <p>Sobrenome: <span>Sobrenome não informado</span></p>}
                        <p>Email: <span>{email}</span></p>
                        <p>Data de nascimento: <span>{`${data[0]} / ${data[1]} / ${data[2]}`}</span></p>
                        {numero ? <p>Telefone: <span>{numero}</span></p> : <p>Telefone: <span>Telefone não informado</span></p>}
                        
                    </div>

                        <div className={style.buttons}>
                            <Link to='profile_edit'>
                                <button>Editar</button>
                            </Link>

                            <button className={style.drop}>
                                Excluir conta
                            </button>
                        </div>
                </div>
            </div>

           
        // </div>

    );
}

export default Perfil;