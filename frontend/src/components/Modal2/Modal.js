import React from 'react';
import style from './styles.module.scss';

const Modal = ({ id = 'modal', onClose = () => {}, children }) => {

    // const { children } = props;

    const sair_clicando_fora = (e) => {
        if (e.target.id === id) onClose();
    }

    return(
        <div id={id} className={style.modal} onClick={sair_clicando_fora}>
            <div className={style.container}>
                <button className={style.close} onClick={onClose}/>
                <div className={style.content}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;