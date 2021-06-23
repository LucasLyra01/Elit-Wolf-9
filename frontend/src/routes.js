import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../src/components/auth/auth';

import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Dashboard from './pages/Dashboard/Dashboard';
import Perfil from './pages/Perfil/Perfil';
import PerfilEdit from './pages/Perfil_edit/PerfilEdit';
import Seguranca from './pages/Seguranca/Seguranca';
import Logout from './pages/Logout/Logout.js';
import Sobre from "./pages/Sobre/Sobre.js";

import Google from './components/ButtonGoogle/Google';

import Navbar from './components/sidebar2/Navbar';

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
            <Navbar />
            <Switch>
                <Route exact path='/' component={Login}/>
                {/* <Route exact path='/' component={Teste}/> */}
                <Route path='/cadastro' component={Cadastro}/>
                <PrivateRoute path='/dashboard' component={Dashboard}/>
                <PrivateRoute path='/profile' component={Perfil}/>
                <PrivateRoute path='/profile_edit' component={PerfilEdit}/>
                <PrivateRoute path='/security' component={Seguranca}/>
                <PrivateRoute path='/logout' component={Logout}/>
                <PrivateRoute path='/about' component={Sobre}/>
                <Route path="/google" component={Google}/>
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;