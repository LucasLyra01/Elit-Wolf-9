import React, { useState } from 'react';

import Modal from '../../components/Modal2/Modal';

const Logout = () => {

    const [ isModalVisibel, setIsModalVisible ] = useState(true);

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