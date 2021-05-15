import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import Modal from '../../components/Modal2/Modal';
import Google from '../../components/ButtonGoogle/Google';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import style from "./Cadastro.module.scss";

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

    const [ isModalVisibel, setIsModalVisible ] = useState(false);
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState('');
    
    function Login(props){

        // useEffect(() => {
        //     async function logar(){    
        //         axios.get('http://localhost:5000/api/cadastro')
        //             .then((response) => {
        //                 console.log(response.data.status);
        //                 setError(response.data.status)
        //             }).catch((error) => {
        //                 console.log(error);
        //                 setError(error)
        //             })
        //         }
        //         logar();
        // })


        // console.log(props.username);

        return (
            <div>
                <h1>Janela de informações</h1>
                <h1>Olá, {props.username}</h1>
                <h1>{error}</h1>
                <h1>
                    Sua data de nascimento é:{" "}
                    {props.dia}/{props.mes}/{props.ano}
                </h1>
            </div>
        );
    }

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





    return(
        <div className={style.container}>
            <div className={style.containerLogo}>
                <img src='/logo_lobo.svg' alt='Logo Lobo'/>
            </div>

            <div className={style.containerConteudo}>
                <img src='/logo_name.svg' alt='Logo Elite Wolf'/>
                <h1>Cadastre-se</h1>
                <form onSubmit={onSubmit}>
                    <Google id={'cadastro'} title={'Cadastre-se com o Google'}/>
                    <p className={style.textCadastro}>
                        Se não quiser usar sua conta do Google,
                        <br/>
                        faça seu cadastro com seu melhor email.
                    </p>
                    <div className={style.floatLabel}>
                        <input
                        id="username"
                        type="text"
                        placeholder="Digite seu nome"
                        name="username"
                        onChange={onChange}
                        value={values.username}
                        />
                    </div>
                    
                    <div className={style.dropdown}>
                        <div>
                        <select
                            className={style.buttonSelect}
                            name="selectOption"
                            onChange={onChange}
                            value={values.selectOption}
                        >
                            <option selected hidden>
                            Dia
                            </option>
                            {funcDias().map((data) => (
                            <option>{data}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <select
                            className={style.buttonSelect}
                            name="selectOptionMonth"
                            onChange={onChange}
                            value={values.selectOptionMonth}
                        >
                            <option selected hidden>
                            Mês
                            </option>
                            {ArrayData.ArrayMeses.map((data) => (
                            <option>{data}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <select
                            className={style.buttonSelect}
                            name="selectOptionYear"
                            onChange={onChange}
                            value={values.selectOptionYear}
                        >
                            <option selected hidden>
                            Ano
                            </option>
                            {funcAnos().map((data) => (
                            <option>{data}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    
                    <div className={style.floatLabel}>
                        <input
                        id="user"
                        type="text"
                        placeholder="Digite seu email"
                        name="user"
                        onChange={onChange}
                        value={values.user}
                        />
                    </div>
                    <div className={style.floatLabel}>
                        <input
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        name="password"
                        onChange={onChange}
                        value={values.password}
                        />
                    </div>
                    
                    <button onClick={() => setIsModalVisible(true)} type="submit">Cadastrar</button>
                    { isModalVisibel ? 
                    <Modal onClose={() => setIsModalVisible(false)}>
                        <Login 
                            username={values.username}
                            email={values.user}
                            password={values.password}
                            dia={values.selectOption}
                            mes={values.selectOptionMonth}
                            ano={values.selectOptionYear}
                            />
                    </Modal> 
                    : null
                    }
                </form>
            </div>
        </div>
    )
};

export default Cadastro;