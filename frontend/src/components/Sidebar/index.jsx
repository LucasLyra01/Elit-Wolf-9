import styles from './styles.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '../auth/auth';

export function Sidebar(){

    let history = useHistory();
    const { pathname } = useLocation();

    function handleDashboard(){
        history.push('/dashboard');
    }

    function handleProfile(){
        history.push('/profile') 

    }

    function handleSecurity(){
        history.push('/security') 
    }
    
    function sair(){
        console.log("Saindo da aplicação");
        logout();
        history.push('/');
    }


    return(
        <div className={styles.container}>
            <header>
                <img src="/logo_sidebar.svg" className={styles.logo} alt="logo"/>
            </header>
            
            <div className={styles.navigation}>
                <button 
                className={
                    `${styles.btnNavigation}  ${pathname === '/dashboard' && styles.isActive }`}
                onClick={handleDashboard}
                >
                    <img src="/icon_dashboard.svg" alt="dashboard"/>
                </button>


                <button 
                className={`${styles.btnNavigation} ${pathname === ('/profile') && styles.isActive } ${pathname === ('/profile_edit') && styles.isActive } `}
                onClick={handleProfile}
                >
                    <img src="/icon_user.svg" alt="Usuário"/>
                </button>

                <button 
                className={`${styles.btnNavigation} ${pathname === '/security' && styles.isActive } `}
                onClick={handleSecurity}
                >
                    <img src="/icon_security.svg" alt="Segurança"/>
                </button>
            </div>

            <div className={styles.exit}>
                <button onClick={sair}>
                    <img src="/icon_exit.svg" alt="Sair"/>
                </button>
            </div>
        </div> 
    )
}

