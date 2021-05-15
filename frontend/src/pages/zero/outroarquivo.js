import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const Cadastro = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [dados, setDados] = useState('');

    function MyVerticallyCenteredModal(props) {
        
        console.log(props.show);

        useEffect(() => {
            if(props.show){
                async function logar(){
                    await axios.get('http://localhost:5000/api/cadastro')
                        .then((response) => {
                            console.log(response.data);
                            setDados(response.data)
                            console.log(dados);
                            return(
                                <Modal
                                    {...props}
                                    size='lg'
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    >

                                        <Modal.Title id="contained-modal-title-vcenter">
                                            {dados.message}
                                        </Modal.Title>

                                </Modal>
                            )
                        }).catch((error) => {
                            console.log(error);
                        });
                }
                logar();
            }else{
                console.log("Não entrei");
            }
        });
        
        
        
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p>Modal heading</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Novos
                </p>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
                
        );
    }
            

    return (
        <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
            Launch vertically centered modal
        </Button>

        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
        </>
    );
}
  
export default Cadastro;