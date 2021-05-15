import styles from './styles.module.scss';

export function Modal(){

    function isOk(){
        return true;
    }

    return(

        <div className={styles.overlay}>
        <div className={styles.container}>
            <header><img src='/error.svg'
            // {
            //     isOk
            //     ? '/check.svg'
            //     : '/error.svg'
            // }
            
            /></header>

            <strong>Cadastro não realizado
                {/* {
                isOk
                ? 'CADASTRO REALIZADO!'
                : 'CADASTRO NÃO REALIZADO!'
                } */}
            </strong>
            <p>Não foi possível realizar o seu cadastro
                {/* {
                isOk
                ? 'O seu cadastro foi salvo com sucesso!!'
                : 'Não foi possível realizar o seu cadastro!!'
            } */}
            </p>

            <button type="button">
                <img src="/close.svg" alt="Close"/>
            </button>
        </div> 
       </div>
    )
}