import React, { useState, useContext } from 'react';
import { Route, Redirect, BrowserRouter, useHistory } from 'react-router-dom';
import axios from 'axios';

import { isAuthenticated, loginToken } from '../../components/auth/auth';

import { Link } from 'react-router-dom'

import style from './Login.module.scss'

import Google from '../../components/ButtonGoogle/Google';


function initialState() {
  return { user: '', password: '' };
}


const UserLogin = () => {

  const [token, setToken] = useState('');

  let history = useHistory();

  if(isAuthenticated()){
    history.push('/dashboard')
  }


  function Login({ user, password }) {
  
    axios.get('http://localhost:5000/api/cadastro')
      .then((response) => {
        let dados = response.data.message;
        for (let i = 0; i < dados.length; i++) {
          if(dados[i].email == user && dados[i].senha == password){
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

  return (
    <div className={style.container}>
        
        <div className={style.containerLogo}>
                <img src="logo_lobo.svg" alt="Logo lobo"/>
        </div>
        
        <div className={style.conteinerConteudo}>

            <img src="logo_name.svg" alt="Logo ELite Wolf"/>
            <h1>Bem-vindo(a)</h1>

            <form onSubmit={onSubmit}>

              <Google id={"login"} title={"Entre com o Google"}/>

                <div className={style.floatLabel}>
                  <input id='user' type='text' placeholder='Digite seu email' name='user' onChange={onChange} value={values.user} disabled=""/>
                </div>

                <div className={style.floatLabel}>
                  <input id='password' type='password' placeholder='Digite sua senha' name='password' onChange={onChange} value={values.password} disabled=""/>
                </div>
                
                {/* <Link to={"/dashboard"}>
                  <button type="submit">Entrar</button>
                </Link>*/}

                 <button type='submit'>
                  Entrar
                </button> 


                <Link to="/" className={style.link}>Esqueceu sua senha?</Link>

                <br/>

                <p>
                    Ainda não possui senha?{" "}
                    <Link to="/cadastro" className={style.link}>Cadastre-se</Link>
                </p>

            </form>

        </div>
    </div>
  );
};

export default UserLogin;
