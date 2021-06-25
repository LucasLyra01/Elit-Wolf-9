import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';


import stylescss from "./Cadastro.module.scss";
import logo_name from "../../assets/img/logos/logo_name.svg";

import CardBody from "../../components/Card/CardBody";
import Modal from '../../components/Modal2/Modal';

function initialState() {
  return {
    username: "",
    email: "",
    password: "",
    selectOption: "",
    selectOptionMonth: "",
    selectOptionYear: "",
  };
}

const Cadastro = () => {

  const [ isModalVisibel, setIsModalVisible ] = useState(false);
  const [respostaOK, setRespostaOK] = useState();
  const [respostaError, setRespostaError] = useState();
   
  function Login({ username, email, password, selectOption, selectOptionMonth, selectOptionYear }) {
    const data_aniversario =
      selectOption + "/" + selectOptionMonth + "/" + selectOptionYear;
    const dados = {
      nome_pessoa: username,
      data_nascimento: data_aniversario,
      email: email,
      senha: password,
    };

    axios.post('http://localhost:5000/api/cadastro/', dados)
      .then((response) => {
        console.log(response.data.message);
        if(response.data.status === 'ok'){
          setRespostaOK(response.data.message);
          setIsModalVisible(true);
        }else{
          setRespostaError(response.data.message);
          setIsModalVisible(true);
        }
      });
  
    return { error: "Usuário ou senha inválido" };
  };

  const [values, setValues] = useState(initialState);

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  function onSubmit(event) {
    event.preventDefault();

    Login(values);
  };

  const ArrayData = {
    ArrayMeses: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  };

  function funcDias() {
    const dias = [];
    // dias.push('Dia')
    for (let index = 1; index <= 31; index++) {
      dias.push(index);
    }

    return dias;
  };

  function funcAnos() {
    const anos = [];

    for (let index = 1921; index <= 2021; index++) {
      anos.push(index);
    }

    anos.reverse();
    return anos;
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    
    paper: {
      margin: theme.spacing(10, 8, 10),
      color: "#FFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    avatar: {
      margin: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(0),
      color: "#FFF",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      height: "50px",
      borderRadius: "5px",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={12} md={8} className={stylescss.image} />
        <Grid item xs={12} sm={12} md={4} className={stylescss.fundo}>
            <CardBody>
              <div className={classes.paper}>
                <img src={logo_name} alt={"Logo Elite Wolf"}/>
                <h1>Cadastre-se</h1>
                <form className={classes.form} onSubmit={onSubmit}>
                  <TextField className={stylescss.campos}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Digite seu nome"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={onChange}
                    value={values.username}
                  />
                  <h5>Data de nascimento</h5>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} className={stylescss.dropdown}>
                      <FormControl variant='filled' className={stylescss.buttonSelect}>
                        <InputLabel htmlFor='filled-dia-native-simple'>Dia</InputLabel>
                        <Select
                          native
                          value={values.selectOption}
                          onChange={onChange}
                          inputProps={{
                            name: 'selectOption',
                            id: 'filled-dia-native-simple'
                          }}
                        >
                          <option aria-label="None" value=""/>
                          {funcDias().map((data) => (
                            <option>{data}</option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl variant='filled' className={stylescss.buttonSelect}>
                        <InputLabel htmlFor='filled-mes-native-simple'>Mês</InputLabel>
                        <Select
                          native
                          value={values.selectOptionMonth}
                          onChange={onChange}
                          inputProps={{
                            name: 'selectOptionMonth',
                            id: 'filled-mes-native-simple'
                          }}
                        >
                          <option aria-label="None" value=""/>
                          {ArrayData.ArrayMeses.map((data) => (
                            <option>{data}</option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl variant='filled' className={stylescss.buttonSelect}>
                        <InputLabel htmlFor='filled-ano-native-simple'>Ano</InputLabel>
                        <Select
                          native
                          value={values.selectOptionYear}
                          onChange={onChange}
                          inputProps={{
                            name: 'selectOptionYear',
                            id: 'filled-ano-native-simple'
                          }}
                        >
                          <option aria-label="None" value=""/>
                          {funcAnos().map((data) => (
                            <option>{data}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <TextField className={stylescss.campos}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Digite seu e-mail"
                    type="text"
                    id="email"
                    autoComplete="email"
                    onChange={onChange}
                    value={values.email}
                  />
                  <TextField className={stylescss.campos}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Digite sua senha"
                    type="password"
                    id="password"
                    autoComplete="password"
                    onChange={onChange}
                    value={values.password}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Cadastrar
                  </Button> 
                  
                  
                  <Grid container>
                    <Grid item xs className={stylescss.center}>
                      <p>
                          Já possui cadastro?{" "}
                          <Link className={stylescss.link} to='/'>Entrar</Link>
                      </p>
                    </Grid>
                  </Grid>
                  
                </form>
              </div>
            </CardBody>
        </Grid>
      </Grid>
        <>
          {isModalVisibel ? 
            <Modal onClose={() => setIsModalVisible(false)} text={respostaOK ? 'cadastrook' : 'cadastroError'}>
              <h5>{respostaOK ? respostaOK : respostaError}</h5>
            </Modal>
          : ''
          }
        </>
    </>
  );
};

export default Cadastro;
