import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/index';
import { isAuthenticated } from '../../components/auth/auth';
import { Link } from 'react-router-dom';

import axios from 'axios';

import style from './PerfilEdit.module.scss';
import { Header } from '../../components/Header';

const Perfil = () => {

    function initialState(){
        return { new_name: '', new_sobrenome: '', new_email: '', new_selectOption: '', new_selectOptionMonth: '', new_selectOptionYear: ''}
    }

    function atualizaValues(){
        return { name: '', sobrenome: '', email: '' }
    }

    const [values, setvalues] = useState(initialState);
    const [count, setCount] = useState(true);
    const [name, setName] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [atualiza, setAtualiza] = useState(atualizaValues);

    useEffect(() => {
        if(count){
            async function buscaDados(){
                axios.get(`http://localhost:5000/api/cadastro/${isAuthenticated()}`)
                    .then(async(response) => {
                        const dados = await response.data.message
                        // console.log(dados);
                        setName(dados.nome_pessoa);
                        setEmail(dados.email);
                        setDataNascimento(dados.data_nascimento)
                        setSobrenome(dados.sobrenome)
                        setSenha(dados.senha);
                        // console.log("Dados coletados");
                        setCount(false);
                });
            }
            buscaDados();
        }
    });

    async function Salvar(){

        if(values.new_name != name && values.new_name != ""){
            atualiza.name = values.new_name;
        }else if(values.new_name == "" || values.new_name == name){
            atualiza.name = name;
        }

        if(values.new_sobrenome != sobrenome && values.new_sobrenome != ""){
            atualiza.sobrenome = values.new_sobrenome;
        }else if(values.new_sobrenome == "" || values.new_sobrenome == sobrenome){
            atualiza.sobrenome = sobrenome
        }

        if(values.new_email != email && values.new_email != ""){
            atualiza.email = values.new_email;
        }else if(values.new_email == "" || values.new_email == email){
            atualiza.email = email;
        }

        console.log(atualiza.name);
        console.log(atualiza.sobrenome);
        console.log(atualiza.email);

        let dados = {
            nome_pessoa: atualiza.name,
            sobrenome: atualiza.sobrenome,
            email: atualiza.email,
            senha: senha,
            data_nascimento: dataNascimento
        }

        console.log(dados);

        axios.put(`http://localhost:5000/api/cadastro/${isAuthenticated()}`, dados)
            .then((response) => {
                console.log(response.data.message);
            });

        console.log("-------------------------");

    }

    function onSubmit(event){
        event.preventDefault();

        Salvar(values);
        
    }

    function onChange(event){

        const { value, name } = event.target;

        setvalues({
            ...values,
            [name]: value
        });
    }



    return(
        <div>
            <div>
                <Sidebar text={"perfil"}/>
            </div>

            <div>
                <div className={style.container} id='container'>

                <div>
                    <Header title={'Perfil'} text={'Clique em salvar para alterar seus dados ou cancelar para voltar '}/>
                </div>

                    <div className={style.content}>
                        
                        <form onSubmit={onSubmit}>
                            <div className={style.floatLabel}>
                                <input 
                                    // className={style.upper} 
                                    placeholder={name} 
                                    id='new_name' 
                                    type='text' 
                                    name='new_name' 
                                    onChange={onChange} 
                                    value={values.new_name}/>
                            </div>
                            <div className={style.floatLabel}>
                                <input 
                                    // className={style.upper} 
                                    placeholder={sobrenome ? sobrenome : 'Definir Sobrenome'} 
                                    id='new_sobrenome' 
                                    type='text' 
                                    name='new_sobrenome' 
                                    onChange={onChange} 
                                    value={values.new_sobrenome}/>
                            </div>
                            <div className={style.floatLabel}>
                                <input 
                                    placeholder={email} 
                                    id='new_email' 
                                    type='email' 
                                    name='new_email' 
                                    onChange={onChange} 
                                    value={values.new_email}/>
                            </div>

                            <div className={style.floatLabel}>
                                <input 
                                    // placeholder={numero ? numero : '(99) 99999-9999'}
                                    placeholder = '(99) 99999-9999'
                                    id='new_numero' 
                                    type='text'
                                    name='new_numero' 
                                    onChange={onChange} 
                                    // value={values.new_email}
                                    />
                            </div>

                            <div className={style.buttons}>
                                <button className={style.save} type="submit">Salvar</button>
                                <Link to='/profile'>
                                    <button className={style.cancel}>Cancelar</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Perfil;