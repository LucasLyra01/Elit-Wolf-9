import React, { useState, useEffect } from 'react';
import axios from 'axios';

import style from './Security.module.scss';

import { isAuthenticated } from '../../components/auth/auth';

import TextField from '@material-ui/core/TextField';

import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

import * as RiIcons from 'react-icons/ri';

const Seguranca = () => {
    
    function initialState(){
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    const [values, setValues] = useState(initialState);
    const [count, setCount] = useState(true);
    const [name, setName] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if(count){
            async function buscaDados(){
                axios.get(`http://localhost:5000/api/cadastro/${isAuthenticated()}`)
                    .then(async(response) => {
                        const dados = await response.data.message
                        // console.log(dados);
                        setName(dados.nome_pessoa);
                        setEmail(dados.email);
                        setDataNascimento(dados.data_nascimento);
                        setSenha(dados.senha);
                        // console.log("Dados coletados");
                        setCount(false);
                });
            }
            buscaDados();
        }
    });

    async function alterarSenha(){
        
        if(values.currentPassword === senha){

            if(values.newPassword !== "" || values.confirmPassword !== ""){
                if(values.newPassword === values.confirmPassword){
                    
                    let dados = {
                        nome_pessoa: name,
                        email: email,
                        data_nascimento: dataNascimento,
                        senha: values.newPassword
                    }
    
                    axios.put(`http://localhost:5000/api/cadastro/${isAuthenticated()}`, dados)
                        .then((response) => {
                            console.log(response.data.status);
                            console.log(response.data.message);
                    });
                }
            }else{
                console.log("Campos vazios");
            }

            


        }else{
            console.log("Atual senha incorreta");
        }


    }

    function onSubmit(event){
        event.preventDefault();

        alterarSenha(values);
    }

    function onChange(event){
        const { value, name } = event.target;

        setValues({
            ...values,
            [name]: value,
        });
    }

    

            
    return(

        <div className={style.container}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <form onSubmit={onSubmit}>
                        <Card>
                            <CardHeader stats icon>
                                <CardIcon color='danger'>
                                    <RiIcons.RiLockPasswordLine />
                                </CardIcon>
                                <div className={style.textCard}>
                                    <h2>Segurança</h2>
                                    <h6>Para uma senha mais forte e segura recomendamos o uso de letras minúsculas e maiúsculas, números e caracteres especiais, como !@#</h6>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        {/* <CardIcon color='warning'>
                                            <IoIcons.IoWarningOutline />
                                        </CardIcon> */}
                                        <TextField 
                                            label='Senha atual'
                                            variant='standard'
                                            margin='normal'
                                            fullWidth
                                            id='currentPassword'
                                            type='password'
                                            name='currentPassword'
                                            autoFocus
                                            onChange={onChange}
                                            value={values.currentPassword}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        {/* <CardIcon color='warning'>
                                            <IoIcons.IoWarningOutline />
                                        </CardIcon> */}
                                        <TextField 
                                            label='Nova senha'
                                            variant='standard'
                                            margin='normal'
                                            fullWidth
                                            id='newPassword'
                                            type='password'
                                            name='newPassword'
                                            autoFocus
                                            onChange={onChange}
                                            value={values.newPassword}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        {/* <CardIcon color='warning'>
                                            <IoIcons.IoWarningOutline />
                                        </CardIcon> */}
                                        <TextField 
                                            label='Confirme a senha'
                                            variant='standard'
                                            margin='normal'
                                            fullWidth
                                            id='confirmPassword'
                                            type='password'
                                            name='confirmPassword'
                                            autoFocus
                                            onChange={onChange}
                                            value={values.confirmPassword}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter chart className={style.footer}>
                                <button type='submit'>Salvar</button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
        </div>

        // <div>
        //     <div className={style.container}>

        //         <div>
        //             <Header title={'Segurança'} text={'Clique em salvar para alterar sua senha'}/>
        //         </div>

        //         <div className={style.content}>
        //             <div className={style.tips}>

        //                 <div className={style.info}>
        //                     <img src={'/info.svg'} alt='Info'/>
        //                 </div>

        //                 <div className={style.text}>
        //                     <p>
        //                         <span>Fica a dica:</span>
        //                         Para uma senha mais forte e segura recomendamos o uso de letras minúsculas e maiúsculas, números e caracteres especiais, como !@#)
        //                     </p>
        //                 </div>
        //             </div>

        //             <div className={style.inputs}>
        //                 <form onSubmit={onSubmit}>  

        //                     <input 
        //                         placeholder='Senha atual'
        //                         id='currentPassword' 
        //                         type='password'
        //                         name='currentPassword'
        //                         onChange={onChange}
        //                         value={values.currentPassword}
        //                         />
        //                     <input 
        //                         placeholder='Nova senha'
        //                         id='newPassword' 
        //                         type='password'
        //                         name='newPassword'
        //                         onChange={onChange}
        //                         value={values.newPassword}
        //                         />
                        
        //                     <input 
        //                         placeholder='Confirmar senha'
        //                         id='confirmPassword'
        //                         type='password'
        //                         name='confirmPassword'
        //                         onChange={onChange}
        //                         value={values.confirmPassword}
        //                         />
                            
        //                     <button type='submit'>Salvar</button>
        //                 </form>

        //             </div>
        //         </div>
        //     </div>

           
        // </div>

    );
}

export default Seguranca;