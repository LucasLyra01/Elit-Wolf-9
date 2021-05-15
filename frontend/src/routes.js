import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../src/components/auth/auth';

import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Dashboard from './pages/Dashboard/Dashboard';
import Perfil from './pages/Perfil/Perfil';
import PerfilEdit from './pages/Perfil_edit/PerfilEdit';
import Seguranca from './pages/Seguranca/Seguranca';

import Google from './components/ButtonGoogle/Google';

const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route 
        { ...rest }
        render={props =>
        isAuthenticated()
        ? ( <Component { ...props }/>)
        : ( <Redirect to={{ pathname: '/', state: { from: props.location } }}/> )
        }
    />
)

const Routes = () => {
    
    return(

        <BrowserRouter>

            <Route exact path='/' component={Login}/>
            {/* <Route exact path='/' component={Teste}/> */}
            <Route path='/cadastro' component={Cadastro}/>
            <PrivateRoute path='/dashboard' component={Dashboard}/>
            <PrivateRoute path='/profile' component={Perfil}/>
            <PrivateRoute path='/profile_edit' component={PerfilEdit}/>
            <PrivateRoute path='/security' component={Seguranca}/>
            <Route path="/google" component={Google}/>
        
        </BrowserRouter>
    );

}

export default Routes;