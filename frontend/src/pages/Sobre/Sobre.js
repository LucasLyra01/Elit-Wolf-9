import React from 'react';

import Card from "../../components/Card/Card.js";
import CardAvatar from '../../components/Card/CardAvatar';
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Button from "../../components/CustomButtons/Button.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

import acsa from '../../assets/img/faces/acsa.jpeg';
import ana from '../../assets/img/faces/ana.jpg';
import lucas from '../../assets/img/faces/lucas.jpeg';
import vinicius from '../../assets/img/faces/vinicius.jpg';

import * as BsIcons from "react-icons/bs"; 
import * as SiIcons from "react-icons/si";

import style from "./Sobre.module.scss";

const Sobre = () => {

    return(

        <div className={style.container}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className={style.card}>
                        <CardHeader stats icon>
                            <CardIcon color="success">
                                <BsIcons.BsInfoCircle />
                            </CardIcon>
                            <div className={style.textCard}>
                                <h2>Sobre</h2>
                                <h5>Informações sobre os desenvolvedores</h5>
                            </div>
                        </CardHeader>
                        <CardBody>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <Card profile >
                        <CardAvatar profile>
                            <a href='#lucas' onClick={(e) => e.preventDefault()}>
                                <img src={acsa} alt={'...'}/>
                            </a>
                        </CardAvatar>
                        <CardBody profile className={style.corpo}>
                            <h6>CEO / CO-FOUNDER</h6>
                            <h4>Acsa Lourencio Alves</h4>
                            <p>
                                Desenvolvedora Front-end e especialista de UX/UI
                            </p>
                            
                        </CardBody>
                        <CardFooter profile className={style.footer}>
                            <Button color='success'><SiIcons.SiInstagram/>Follow</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card profile >
                        <CardAvatar profile>
                            <a href='#lucas' onClick={(e) => e.preventDefault()}>
                                <img src={ana} alt={'...'}/>
                            </a>
                        </CardAvatar>
                        <CardBody profile className={style.corpo}>
                            <h6>CEO / CO-FOUNDER</h6>
                            <h4>Ana Clara Herbst</h4>
                            <p>
                                Desenvolvedora Front-end e especialista de UX/UI
                            </p>
                            
                        </CardBody>
                        <CardFooter profile className={style.footer}>
                            <Button color='success'><SiIcons.SiInstagram/>Follow</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card profile >
                        <CardAvatar profile>
                            <a href='#lucas' onClick={(e) => e.preventDefault()}>
                                <img src={lucas} alt={'...'}/>
                            </a>
                        </CardAvatar>
                        <CardBody profile className={style.corpo}>
                            <h6>CEO / CO-FOUNDER</h6>
                            <h4>Lucas Lacerda Lyra</h4>
                            <p>
                                Desenvolvedor Back-end e analista de sistemas web
                            </p>
                            
                        </CardBody>
                        <CardFooter profile className={style.footer}>
                            <Button color='success'><SiIcons.SiInstagram/>Follow</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card profile >
                        <CardAvatar profile>
                            <a href='#lucas' onClick={(e) => e.preventDefault()}>
                                <img src={vinicius} alt={'...'}/>
                            </a>
                        </CardAvatar>
                        <CardBody profile className={style.corpo}>
                            <h6>CEO / CO-FOUNDER</h6>
                            <h4>Vinicius Ludiger Ramos</h4>
                            <p>
                                Desenvolvedor Back-end e analista de sistemas web
                            </p>
                            
                        </CardBody>
                        <CardFooter profile className={style.footer}>
                            <Button  color='success'><SiIcons.SiInstagram/>Follow</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                
            </GridContainer>
            

        </div>
    );
}

export default Sobre;