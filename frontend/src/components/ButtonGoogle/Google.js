import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { loginToken } from '../auth/auth';
import axios from 'axios';

import styles from './styles.module.scss';


const Google = (props) => {

    let history = useHistory();
    
    const responseGoogle = async (response) => {

        let error = response.error;

        if(error == 'popup_closed_by_user'){
            console.log(response.error);
            return;
        }else{
            if(response.profileObj){

                const dadosGoogle = {
                    nome_pessoa: response.profileObj.name,
                    email: response.profileObj.email,
                    id_google: response.profileObj.googleId
                }

                if(props.id == "login"){

                    axios.get('http://localhost:5000/api/cadastrogoogle')
                    .then((logarGoogle) => {
                        if(logarGoogle.data.status == "ok"){
                            let dados = logarGoogle.data.message;
                            for (let i = 0; i < dados.length; i++) {
                                if(dados[i].email == dadosGoogle.email && dados[i].id_google == dadosGoogle.id_google){
                                    loginToken(dados[i]._id);
                                    history.push('/dashboard');
                                    return;
                                }
                            }
                            return console.log("Usuário não cadastrado");
                        }
                    });
                }

                if(props.id == "cadastro"){

                    axios.post('http://localhost:5000/api/cadastrogoogle', dadosGoogle)
                    .then((cadastroGoogle) => {
                        if(cadastroGoogle.data.status == "ok"){
                            alert(cadastroGoogle.data.message);
                            history.push('/');
                            return;
                        }else{
                            alert(cadastroGoogle.data.message);
                        }
                    });
                }
            }
        }
    }

    return(
        <div>
            <GoogleLogin
            id={props.id}
            clientId='349332171869-btsdfeaeakh96mincupuf1mftq2pc1vf.apps.googleusercontent.com'
            render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img src="icone_google.svg" alt="Google"/>
                    <span>{props.title}</span>
                </button>
              )}
            buttonText="Entrar com o Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>
    )

}

export default Google;