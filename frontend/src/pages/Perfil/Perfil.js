import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import style from './Perfil.module.scss';

import { isAuthenticated } from '../../components/auth/auth';

import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

import * as BsIcons from "react-icons/bs"; 

const Perfil = () => {

    let history = useHistory();

    const [count, setCount] = useState(true);

    const [name, setName] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sobrenome, setSobrenome] = useState('');

    useEffect(() => {
        if(count){
            async function buscaDados(){
                await axios.get('http://localhost:5000/api/cadastro/' + isAuthenticated())
                    .then(async (response) => {
                        const dados = await response.data.message
                        // console.log(dados);
                        setName(dados.nome_pessoa);
                        setSobrenome(dados.sobrenome);
                        setDataNascimento(dados.data_nascimento);
                        setCount(false);
                });
            }
            buscaDados();
        }
    });

    let data = dataNascimento.split('/');

    function ir_para_editar(){
        history.push('/profile_edit');
    }

    return(

        <div className={style.container}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className={style.card}>
                        <CardHeader stats icon>
                            <CardIcon color="success">
                                <BsIcons.BsPersonCheck />
                            </CardIcon>
                            <div className={style.textCard}>
                                <h2>Perfil</h2>
                                <h5>Clique em editar para alterar seus dados</h5>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput 
                                        labelText={`Nome: ${name}`}
                                        id='primeiroNome'
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput 
                                        labelText={sobrenome ? `Sobrenome: ${sobrenome}` : 'Sobrenome não informado'}
                                        id='sobrenome'
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput 
                                        labelText={`Data de aniversário: ${data[0]} / ${data[1]} / ${data[2]}`}
                                        id='data'
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput 
                                        labelText={"Telefone não informado"}
                                        id='telefone'
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            
                        </CardBody>
                        <CardFooter chart className={style.footer}>
                            <button className={style.botaoEditar} onClick={ir_para_editar}>Editar Perfil</button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            

        </div>

        // <div className={style.container}>
        //     <GridContainer className={style.container}>

        //             <GridItem>
        //                 <Header title={'Perfil'} text={'Clique em editar, para alterar seus dados'}/>
        //             </GridItem>

        //             <GridItem className={style.content}>
                        
        //                 <GridItem className={style.form}>

        //                     <p>Nome: <span>{name}</span></p>
        //                     {sobrenome ? <p>Sobrenome: <span>{sobrenome}</span></p> : <p>Sobrenome: <span>Sobrenome não informado</span></p>}
        //                     <p>Email: <span>{email}</span></p>
        //                     <p>Data de nascimento: <span>{`${data[0]} / ${data[1]} / ${data[2]}`}</span></p>
        //                     {numero ? <p>Telefone: <span>{numero}</span></p> : <p>Telefone: <span>Telefone não informado</span></p>}
                            
        //                 </GridItem>

        //                 {/* <div className={style.photo}>

        //                 </div> */}

        //                 <GridItem className={style.buttons}>
        //                     <Link to='profile_edit'>
        //                         <button>Editar</button>
        //                     </Link>

        //                     <button className={style.drop} onClick={() => setDeleteAccount(true)}>
        //                         Excluir conta
        //                     </button>
        //                     {deleteAccount ? deletarConta() : null}
        //                 </GridItem>
        //             </GridItem>

            
        //     </GridContainer>

        // </div>

    );
}

export default Perfil;