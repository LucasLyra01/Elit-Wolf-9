import React from 'react';
import style from './styles.module.scss';
import { useHistory } from 'react-router-dom';

import Grid from "@material-ui/core/Grid"

import Info from "@material-ui/icons/Info";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardIcon from "../../components/Card/CardIcon";
import CardFooter from "../../components/Card/CardFooter";
import styles_material from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { logout } from '../auth/auth';

const Modal = ({ id = 'modal', onClose = () => {}, children, text }) => {

    const history = useHistory();
    // const { children } = props;

    const sair_clicando_fora = (e) => {
        if (e.target.id === id){
            history.push('/');
        }
    }

    const primeiro_login = () => {
        history.push('/');
    }

    const cadastrar_novamente = () => {
        onClose()
    }

    if(text === 'sair'){
        console.log(text);
    }

    const sair_da_aplicação = () => {
        console.log("Cliquei em sair");
        logout();
        history.push('/');
    }

    const cancelar = () => {
        console.log("Cliquei em cancelar");
        history.push('/');
    }

    return(
        <div id={id} className={style.modal} onClick={sair_clicando_fora}>
            <Grid container className={style.container}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card chart className={style.borderRadius}>
                        <CardHeader color="info" stats icon>
                            <CardIcon color={text === 'sair' ? "danger" : text === 'cadastrook' ? 'success' : 'danger'}>
                                {text === 'sair' ? <Info/> : text === 'cadastrook' ? <CheckCircleOutlineIcon /> : <Info />}
                            </CardIcon>
                        </CardHeader>
                        <CardBody className={styles_material.content}>
                            {children}
                        </CardBody>
                        <CardFooter chart className={style.center}>
                            {text === 'sair' ? 
                                <>
                                    <button onClick={cancelar}>Cancelar</button>
                                    <button className={style.botaoSair} onClick={sair_da_aplicação}>Sair</button>
                                </>
                            : text === 'cadastrook' ?
                                <>
                                    <button onClick={primeiro_login}>Realizar Login</button>
                                </>
                            : text === 'cadastroError' ?
                                <>
                                    <button onClick={cadastrar_novamente}>Cadastrar Novamente</button>
                                </>
                            : ''
                            }
                        </CardFooter>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};


export default Modal;