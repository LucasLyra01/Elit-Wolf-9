import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import style from './PerfilEdit.module.scss';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar/index';
import { isAuthenticated, logout } from '../../components/auth/auth';
import Modal from '../../components/Modal2/Modal';

import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';

import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
// import CustomInput from "../../components/CustomInput/CustomInput";
import Danger from "../../components/Typography/Danger.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

import * as FiIcons from "react-icons/fi";

const Perfil = () => {

    let history = useHistory();

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
    const [showModal, setShowModal] = useState(false);

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

        console.log(values);

        if(values.new_name !== name && values.new_name !== ""){
            atualiza.name = values.new_name;
        }else if(values.new_name === "" || values.new_name === name){
            atualiza.name = name;
        }

        if(values.new_sobrenome !== sobrenome && values.new_sobrenome !== ""){
            atualiza.sobrenome = values.new_sobrenome;
        }else if(values.new_sobrenome === "" || values.new_sobrenome === sobrenome){
            atualiza.sobrenome = sobrenome
        }

        if(values.new_email !== email && values.new_email !== ""){
            atualiza.email = values.new_email;
        }else if(values.new_email === "" || values.new_email === email){
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

    function voltar_para_dashboard(){
        history.push('/dashboard');
    }



    return(
        <div className={style.container}>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <form onSubmit={onSubmit}>
                        <Card>
                            <CardHeader stats icon>
                                <CardIcon color="info">
                                    <FiIcons.FiEdit />
                                </CardIcon>
                                <div className={style.textCard}>
                                    <h2>Editar Perfil</h2>
                                    <h5>Você está prestes a alterar seu perfil</h5>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField 
                                            label={`Atualizar ${name} para: `}
                                            variant='standard'
                                            margin='normal'
                                            fullWidth
                                            id='new_name'
                                            type='text'
                                            name='new_name'
                                            autoFocus
                                            onChange={onChange}
                                            value={values.new_name}
                                            
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField 
                                            label={sobrenome ? `Atualizar ${sobrenome} para: ` : 'Definir Sobrenome'}
                                            variant='standard'
                                            margin='normal'
                                            fullWidth
                                            id='new_sobrenome'
                                            type='text'
                                            name='new_sobrenome'
                                            autoFocus
                                            onChange={onChange}
                                            value={values.new_sobrenome}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            label={email ? `Atualizar ${email} para: ` : 'Definir email'}
                                            variant='standard'
                                            margin='normal'
                                            fullWidth
                                            id='new_email'
                                            type='email'
                                            name='new_email'
                                            autoFocus
                                            onChange={onChange}
                                            value={values.new_email}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            label={'(99) 99999-9999'}
                                            variant='standard'
                                            margin='normal'
                                            fullWidth
                                            id='new_numero'
                                            type='text'
                                            name='new_numero'
                                            autoFocus
                                            onChange={onChange}
                                            // value={values.new_email}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>

                            <CardFooter chart className={style.footer}>
                                <button className={style.save} type="submit" onClick={() => setShowModal(true)}>Salvar</button>
                                
                                <button className={style.cancel} onClick={voltar_para_dashboard}>Cancelar</button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
            <div>
                {showModal ?
                    <Modal onClose={() => setShowModal(false)} text={'saved'}>
                        <h1>Salvando informações</h1>
                    </Modal>
                : ''
                }
            </div>
            

            {/* <div>
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
            </div> */}
        </div>

    )
}

export default Perfil;