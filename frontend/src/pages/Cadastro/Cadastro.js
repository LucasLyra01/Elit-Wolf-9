import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Google from '../../components/ButtonGoogle/Google';
import axios from 'axios';

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import stylescss from "./Cadastro.module.scss";
import logo_name from "../../assets/img/logos/logo_name.svg";


function initialState() {
  return {
    username: "",
    user: "",
    password: "",
    selectOption: "",
    selectOptionMonth: "",
    selectOptionYear: "",
  };
}

const Cadastro = () => {
  let history = useHistory();
  
  function Login({ username, user, password, selectOption, selectOptionMonth, selectOptionYear }) {
    const data_aniversario =
      selectOption + "/" + selectOptionMonth + "/" + selectOptionYear;
    const dados = {
      nome_pessoa: username,
      data_nascimento: data_aniversario,
      email: user,
      senha: password,
    };

    axios.post('http://localhost:5000/api/cadastro/', dados)
      .then((response) => {
        console.log(response.data.message);
        if(response.data.status == 'ok'){
          alert(response.data.message);
          history.push('/');
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
                    <Link className={stylescss.link} to='/cadastro'>Cadastre-se</Link>
                </p>
              </Grid>
            </Grid>
            
          </form>
        </div>
      </Grid>
    </Grid>
    // <div className={style.container}>
    //   <div className={style.containerLogo}>
    //     <img src="logo_lobo.svg" alt="Logo lobo" />
    //   </div>
    //   <div className={style.containerConteudo}>
    //     <img src="logo_name.svg" alt="Logo ELite Wolf" />
    //     <h1>Cadastre-se</h1>
    //     <form onSubmit={onSubmit}>
    //      <Google id={'cadastro'} title={"Cadastre-se com o Google"}/>
    //       <p className={style.textCadastro}>
    //         Se não quiser usar sua conta do Google,
    //         <br /> 
    //         faça seu cadastro com seu melhor email
    //       </p>

    //       <div className={style.floatLabel}>
    //         <input
    //           id="username"
    //           type="text"
    //           placeholder="Digite seu nome"
    //           name="username"
    //           onChange={onChange}
    //           value={values.username}
    //           />

    //       </div>
    //       {/* <br/> */}
    //       <div className={style.dropdown}>
    //         <div>
    //           <select
    //             className={style.buttonSelect}
    //             name="selectOption"
    //             onChange={onChange}
    //             value={values.selectOption}
    //           >
    //             <option selected hidden>
    //               Dia
    //             </option>
    //             {funcDias().map((data) => (
    //               <option>{data}</option>
    //             ))}
    //           </select>
    //         </div>
    //         <div>
    //           <select
    //             className={style.buttonSelect}
    //             name="selectOptionMonth"
    //             onChange={onChange}
    //             value={values.selectOptionMonth}
    //           >
    //             <option selected hidden>
    //               Mês
    //             </option>
    //             {ArrayData.ArrayMeses.map((data) => (
    //               <option>{data}</option>
    //             ))}
    //           </select>
    //         </div>
    //         <div>
    //           <select
    //             className={style.buttonSelect}
    //             name="selectOptionYear"
    //             onChange={onChange}
    //             value={values.selectOptionYear}
    //           >
    //             <option selected hidden>
    //               Ano
    //             </option>
    //             {funcAnos().map((data) => (
    //               <option>{data}</option>
    //             ))}
    //           </select>
    //         </div>
    //       </div>
    //       <div className={style.floatLabel}>
    //         <input
    //           id="user"
    //           type="text"
    //           placeholder="Digite seu email"
    //           name="user"
    //           onChange={onChange}
    //           value={values.user}
    //           />
    //       </div>
    //       <div className={style.floatLabel}>
    //       <input
    //         id="password"
    //         type="password"
    //         placeholder="Digite sua senha"
    //         name="password"
    //         onChange={onChange}
    //         value={values.password}
    //         />
    //       </div>

    //       <button type="submit">Cadastrar</button>
          
    //     </form>
    //   </div>
    // </div>
  );
};

export default Cadastro;
