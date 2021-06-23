import React, { useState, useEffect } from 'react';

import { logout } from '../../components/auth/auth';
import { useHistory, useLocation } from 'react-router-dom';
import Modal from '../../components/Modal2/Modal';


const Logout = () => {

    const [ isModalVisibel, setIsModalVisible ] = useState(true);

    const history = useHistory();
    const { pathname } = useLocation();
    // logout();
    // history.push('/')

    return(

        <div>
            {isModalVisibel ?
                <Modal onClose={() => setIsModalVisible(false)} text={'sair'}>
                    <h1>Tem certeza que deseja sair da aplicação?</h1>
                </Modal>
            : ''
            }
        </div>

    )
}

export default Logout;