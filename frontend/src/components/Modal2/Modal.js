import React from 'react';
import style from './styles.module.scss';
import { useHistory } from 'react-router-dom';

import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import Warning from "@material-ui/icons/Warning";
import Info from "@material-ui/icons/Info";


import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardIcon from "../../components/Card/CardIcon";
import CardFooter from "../../components/Card/CardFooter";
import Danger from "../../components/Typography/Danger";
import styles_material from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { grid } from '@material-ui/system';
import { logout } from '../auth/auth';

const useStyles = makeStyles(styles_material);

const Modal = ({ id = 'modal', onClose = () => {}, children, text }) => {

    const classes = useStyles();
    const history = useHistory();
    // const { children } = props;

    const sair_clicando_fora = (e) => {
        if (e.target.id === id){
            history.push('/');
        }
    }

    const clique_no_X = (e) => {
        history.push('/');
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
                            <CardIcon color={text === 'sair' ? "danger" : 'success'}>
                                <Info/>
                            </CardIcon>
                        </CardHeader>
                        <CardBody className={styles_material.content}>
                            {children}
                        </CardBody>
                        <CardFooter chart>
                            <button onClick={cancelar}>Cancelar</button>
                            <button className={style.botaoSair} onClick={sair_da_aplicação}>Sair</button>
                        </CardFooter>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};


export default Modal;