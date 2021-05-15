import React, { useState } from 'react';
import Modal from '../../components/Modal2/Modal';

const DadosModal = (text) => {

    const [ isModalVisibel, setIsModalVisible ] = useState(false);

    setIsModalVisible(true);

    console.log(isModalVisibel);
    console.log(text);

    return(
        <div>
            <button>teste</button>
            {isModalVisibel
            ? <Modal onClose={() => setIsModalVisible(false)}>
                <h1>{text}</h1>
            </Modal>    
            : null
            }
        </div>
    );
};

export default DadosModal;