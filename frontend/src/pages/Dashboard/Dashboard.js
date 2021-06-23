import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartistGraph from "react-chartist";

import { makeStyles } from "@material-ui/core/styles";

import AccessTime from "@material-ui/icons/AccessTime";
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";

import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import { emailsSubscriptionChart } from "../../variables/charts.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import style from './Dashboard.module.scss'

const useStyles = makeStyles(styles);

const Dashboard = () => {

    const lista_completa = [];
    const [lista, setLista] = useState([]);
    const [dataAtualizacao, setDataAtualizacao] = useState();
    const [catalogacao, setCatalogacao] = useState();
    const HeaderTable = ["Horário", "Paridade", "Assertividade", "Direção"];

    const [count, setCount] = useState(true);

    useEffect(() => {
        if(count){
            (async function(){
                await axios.get('http://localhost:5000/catalogacao')
                    .then(async(response) => {
                        var status_connection = await response.data.status;
                        var resposta_banco = await response.data.message;
                        setDataAtualizacao(resposta_banco[0].data_criacao);
                        setCatalogacao(resposta_banco[0].infos);
                        if(status_connection === 'ok'){
                            for (let c in catalogacao) {
                                for (let dados2 of catalogacao[c].dados) {
                                    if(dados2["%"] > 80 && dados2["%"] < 100){
                                        // console.log(`${catalogacao[c].par} | Horário: ${dados2.horario}`);
                                        lista_completa.push({horario: dados2.horario, paridade: catalogacao[c].par, porcentagem: dados2["%"], direcao: dados2.dir});
                                    }
                                }
                            }
                            // console.log(lista_completa);
                            if(await lista_completa.length > 0){
                                // console.log("Cheio");
                                lista_completa.sort();
                                setLista(lista_completa);
                            }else{
                                // console.log("Vazio");
                            }
                            
                            setCount(false);
                        }
                    })
            })();
        }
    });

    // console.log(lista);

    const classes = useStyles();
    return (
        <div className={style.container}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader stats icon>
                            <CardIcon color="success">
                                <BsIcons.BsBarChartFill />
                            </CardIcon>
                            <div className={style.textCard}>
                                <h2>Olá, Lucas</h2>
                                <h5>Tenha um bom dia de investimentos</h5>
                            </div>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <FcIcons.FcCheckmark />
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    {" "} Catalogação feita com sucesso
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                            <p className={classes.cardCategory}>Last Campaign Performance</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> campaign sent 2 days ago
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                            <p className={classes.cardCategory}>Last Campaign Performance</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> campaign sent 2 days ago
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color='success'>
                            <h4 className={classes.cardTitleWhite}>Lista de sinais completa</h4>
                            <p className={classes.cardCategoryWhite}>Atualização feita no dia {dataAtualizacao}</p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor=''
                                tableHead={HeaderTable}
                                tableData={lista.map((item, index) => {
                                    return(
                                        [
                                            [item.horario], [item.paridade], [`${item.porcentagem} %`], [item.direcao]
                                        ]
                                    )
                                })}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color='warning'>
                            <h4 className={classes.cardTitleWhite}>Lista de sinais completa</h4>
                            <p className={classes.cardCategoryWhite}>Atualização feita no dia {dataAtualizacao}</p>
                        </CardHeader>
                        <CardBody className={style.pie}>
                            <ChartistGraph 
                                data={{
                                    labels: ["40%", "20%"],
                                    series: [40, 20],
                                }}
                                type='Pie'
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            
        </div>
    );
}

export default Dashboard;