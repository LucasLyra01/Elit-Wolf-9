import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


import { isAuthenticated, loginToken } from "../../components/auth/auth";
import logo_name from "../../assets/img/logos/logo_name.svg";

import stylescss from "./Login.module.scss";

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

function Copyright() {
  return (
    <Typography variant="body2" color="success" align="center">
      {"Copyright © "}
      <Link color="inherit">
        Investimentos
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function initialState() {
  return { email: '', password: '' };
}

const Login = () => {
  
  const [token, setToken] = useState('');

  let history = useHistory();

  if(isAuthenticated()){
    history.push('/dashboard')
  }


  function Login({ email, password }) {

    console.log(email);
  
    axios.get('http://localhost:5000/api/cadastro')
      .then((response) => {
        let dados = response.data.message;
        for (let i = 0; i < dados.length; i++) {
          if(dados[i].email == email && dados[i].senha == password){
            console.log("logado com sucesso");
            loginToken(dados[i]._id);
            setToken(dados[i]._id);
            // export default token;
            history.push('/dashboard');
            return;
          }
        }
        return console.log("Dados incorretos");
      });
    return { error: 'Usuário ou senha inválido' };
  }


  const [values, setValues] = useState(initialState);

  function onChange(event) {

    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    const { token } = Login(values);

  }

  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={8} className={stylescss.image} />
      <Grid item xs={12} sm={12} md={4} className={stylescss.fundo}>
        <div className={classes.paper}>
          <img src={logo_name} alt={"Logo Elite Wolf"}/>
          <h1>Bem Vindo(a)</h1>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField className={stylescss.campos}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
              value={values.email}
            />
            <TextField className={stylescss.campos}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
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
              Entrar
            </Button>
            
            <Grid container>
              <Grid item xs className={stylescss.center}>
                <p>
                    Esqueceu sua senha?
                </p>
                <p>
                    Ainda não possui senha?{" "}
                    <Link className={stylescss.link}>Cadastre-se</Link>
                </p>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
