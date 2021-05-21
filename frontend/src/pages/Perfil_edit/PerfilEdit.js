import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from '../../components/Sidebar/index';
import { isAuthenticated } from '../../components/auth/auth';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';

import style from './PerfilEdit.module.scss';

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

    const [atualiza, setAtualiza] = useState(atualizaValues);

    useEffect(() => {
        if(count){
            async function buscaDados(){
                axios.get(`http://localhost:5000/api/cadastro/${isAuthenticated()}`)
                    .then(async(response) => {
                        const dados = await response.data.message
                        console.log(dados);
                        setName(dados.nome_pessoa);
                        setEmail(dados.email);
                        setDataNascimento(dados.data_nascimento)
                        setSobrenome(dados.sobrenome)
                        setSenha(dados.senha);
                        console.log("Dados coletados");
                        setCount(false);
                });
            }
            buscaDados();
        }
    });

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

    async function Salvar(){

        if(values.new_name != name && values.new_name != ""){
            atualiza.name = values.new_name;
        }else if(values.new_name == "" || values.new_name == name){
            atualiza.name = name;
        }

        if(values.new_sobrenome != sobrenome && values.new_sobrenome != ""){
            atualiza.sobrenome = values.new_sobrenome;
        }else if(values.new_sobrenome == "" || values.new_sobrenome == sobrenome){
            atualiza.sobrenome = sobrenome
        }

        if(values.new_email != email && values.new_email != ""){
            atualiza.email = values.new_email;
        }else if(values.new_email == "" || values.new_email == email){
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



    return(
        <div>
            <div>
                <Sidebar text={"perfil"}/>
            </div>

            <div>
                <div className={style.container} id='container'>
                    <div className={style.quadrado}>
                        <h1>Perfil</h1>
                        <form onSubmit={onSubmit}>
                            <div className={style.floatLabel}>
                                <input 
                                    className={style.upper} 
                                    placeholder={name} 
                                    id='new_name' 
                                    type='text' 
                                    name='new_name' 
                                    onChange={onChange} 
                                    value={values.new_name}/>
                            </div>
                            <div className={style.floatLabel}>
                                <input 
                                    className={style.upper} 
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
                                <label>{dataNascimento ? 'Data de nascimento ' + dataNascimento : 'Definir data de nascimento'}</label>
                            </div>

                            <div className={style.dropdown}>
                                <div>
                                    <select
                                        className={style.buttonSelect}
                                        name="new_selectOption"
                                        onChange={onChange}
                                        value={values.new_selectOption}
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
                                        name="new_selectOptionMonth"
                                        onChange={onChange}
                                        value={values.new_selectOptionMonth}
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
                                        name="new_selectOptionYear"
                                        onChange={onChange}
                                        value={values.new_selectOptionYear}
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
                            <div className={style.botoes}>
                                <button className={style.salvar} type="submit">Salvar</button>
                                <Link to='/profile'>
                                    <button className={style.cancelar}>Cancelar</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Perfil;