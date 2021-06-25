import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from 'react-chartjs-2';
import { makeStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";

import Card from "../../components/Card/Card.js";
import CardAvatar from '../../components/Card/CardAvatar';
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import style from './Dashboard.module.scss'

import PulseLoader from 'react-spinners/PulseLoader';

import AUDCAD from '../../assets/img/paridades/AUDCAD.png';
import EURUSD from '../../assets/img/paridades/EURUSD.png';
import GBPJPY from '../../assets/img/paridades/GBPJPY.png';
import USDCHF from '../../assets/img/paridades/USDCHF.png';

const useStyles = makeStyles(styles);



const Dashboard = () => {

    

    const data = new Date();
    const hora = data.getHours();

    const [bomDia, setBomDia] = useState();
    const [atualizaHora, setAtualizaHora] = useState();

    let call = 0;
    let put = 0;
    let doji = 0;

    const [porcentagemCall, setPorcentagemCall] = useState(0);
    const [porcentagemPut, setPorcentagemPut] = useState(0);
    const [porcentagemDoji, setPorcentagemDoji] = useState(0);

    const lista_completa = [];
    const [lista, setLista] = useState([]);
    const [listaCALL, setListaCALL] = useState(0);
    const [listaPUT, setListaPUT] = useState(0);
    const [listaDoji, setListaDoji] = useState(0);

    const [showSppiner, setShowSpinner] = useState(true);

    const [dataAtualizacao, setDataAtualizacao] = useState();
    const [catalogacao, setCatalogacao] = useState();
    const HeaderTable = ["Horário", "Paridade", "Assertividade", "Direção"];
    const HeaderTablePie = ["CALL", "PUT", "DOJI"];
    
    const [count, setCount] = useState(true);
    
    useEffect(() => {
        if(count){
            (async function(){
                setAtualizaHora(hora);
            
                if(atualizaHora > 0 && atualizaHora < 7){
                    setBomDia("uma boa madrugada");
                }else{
                    if(atualizaHora >= 7 && atualizaHora < 13){
                        setBomDia("um bom dia");
                    }else{
                        if(atualizaHora >= 13 && atualizaHora <= 17){
                            setBomDia("uma boa tarde");
                        }else{
                            setBomDia("uma boa noite");
                        }
                    }
                }
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
                                        if(dados2.dir === "CALL"){
                                            call += 1;
                                            
                                        }
                                        if(dados2.dir === "PUT"){
                                            put += 1;
                                        }
                                        if(dados2.dir === 'DOJI'){
                                            doji += 1;
                                        }
                                    }
                                }
                            }
                            // console.log(lista_completa);
                            if(await lista_completa.length > 0){
                                // console.log("Cheio");

                                lista_completa.sort();
                                setLista(lista_completa);
                                setListaCALL(call);
                                setListaPUT(put);
                                setListaDoji(doji);
                                setPorcentagemCall( ( (call * 100 ) / (call + put + doji) ) );
                                setPorcentagemPut( ( (put * 100) / (call + put + doji) ) );
                                if(doji === 0){
                                    setPorcentagemDoji(0);                                    
                                }else{
                                    setPorcentagemDoji( ( (doji * 100) / (call + put + doji) ) );
                                }
                                porcentagemCall.toFixed(2);
                                porcentagemPut.toFixed(2);


                            }else{
                                // alert('teset')
                            }
                            setShowSpinner(false);
                            
                            setCount(false);
                        }
                    })
            })();
        }
    });

    const sessionsChannelChartData = {
        labels: ["CALL", "PUT", "DOJI"],
        datasets: [{
          data: [porcentagemCall.toFixed(2), porcentagemPut.toFixed(2), porcentagemDoji],
          backgroundColor: ['rgb(108, 201, 41)','#e6442b', '#979899'],
        }]
    };
    const sessionsChannelChartOptions = {
        cutoutPercentage: 50,
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          position: 'left'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
    };

    const barChartData = {
        labels: lista.map((item) => item.horario),
        datasets: [{
            label: "Porcentagem %",
            data: lista.map((item) => item.porcentagem),
            backgroundColor: lista.map((item) => {
                if(item.direcao === "PUT") {
                    return '#e6442b';
                }else{
                    if(item.direcao === "CALL"){ 
                        return 'rgb(108, 201, 41)';
                    }else{
                        return '#979899';
                    }
                }
            }),
            borderColor: lista.map((item) => {
                if(item.direcao === "PUT") {
                    return '#e6442b';
                }else{
                    if(item.direcao === "CALL"){ 
                        return 'rgb(108, 201, 41)';
                    }else{
                        return '#979899';
                    }
                }
            }),
          borderWidth: 1,
          fill: true,
          
        }]
    };
    const barChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
            labels: {
              display: true
            }
       },
    }

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
                                <h5>Tenha {bomDia} de investimentos</h5>
                            </div>
                        </CardHeader>
                        <CardFooter stats>
                            {showSppiner ? 
                                <div className={style.sppiner}>
                                    <PulseLoader color='#000' size={10}/>
                                </div>
                            : 
                                <div className={classes.stats}>
                                    <FcIcons.FcCheckmark />
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        {" "} Catalogação feita com sucesso
                                    </a>
                                </div>
                            }
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="success">
                            <h1>Gráfico de Assertividade</h1>
                            
                        </CardHeader>
                        <CardBody className={style.cardBody}>
                            {showSppiner ?
                                <div className={style.sppiner}>
                                    <PulseLoader color='#000' />
                                </div>
                            : 
                                <Bar data={barChartData} options={barChartOptions}/>
                            }
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
                        <CardHeader color="success">
                            <h1>Pagamento por paridades</h1>
                        </CardHeader>
                        <CardBody className={style.cardBody}>
                            {showSppiner ? 
                                <div className={style.sppiner}>
                                    <PulseLoader color='#000'/>
                                </div>
                            : 
                                <div>
                                    <GridContainer>
                                        <GridItem xs={6} sm={6} md={6}>
                                            <Card profile>
                                                <CardAvatar profile className={style.cardAvatar}>
                                                    <img src={AUDCAD} alt='AUDCAD'/>
                                                </CardAvatar>
                                                <CardBody>
                                                    <h5>AUDCAD</h5>
                                                    <h5>Payout: 95%</h5>
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>
                                            <Card profile>
                                                <CardAvatar profile className={style.cardAvatar}>
                                                    <img src={USDCHF} alt='USDCHF'/>
                                                </CardAvatar>
                                                <CardBody>
                                                    <h5>USDCHF</h5>
                                                    <h5>Payout: 91%</h5>
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>
                                            <Card profile>
                                                <CardAvatar profile className={style.cardAvatar}>
                                                    <img src={EURUSD} alt='EURUSD'/>
                                                </CardAvatar>
                                                <CardBody>
                                                    <h5>EURUSD</h5>
                                                    <h5>Payout: 87%</h5>
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>
                                            <Card profile>
                                                <CardAvatar profile className={style.cardAvatar}>
                                                    <img src={GBPJPY} alt='GBPJPY'/>
                                                </CardAvatar>
                                                <CardBody>
                                                    <h5>GBPJPY</h5>
                                                    <h5>Payout: 77%</h5>
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                        
                                    </GridContainer>
                                </div>
                            }
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
                            {showSppiner ? 
                                <div className={style.sppiner}>
                                    <PulseLoader color='#000'/>
                                </div>
                            : 
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
                            }
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color='success'>
                            <h4 className={classes.cardTitleWhite}>Quantidade de direções</h4>
                            <p className={classes.cardCategoryWhite}>Quantidade de CALL e PUT da catalogação</p>
                        </CardHeader>
                        <CardBody className={style.pie}>
                            {showSppiner ? 
                                <div className={style.sppiner}>
                                    <PulseLoader color='#000'/>
                                </div> 
                            :
                                <div>
                                    <GridItem>
                                        <Pie data={sessionsChannelChartData} options={sessionsChannelChartOptions}/>
                                    </GridItem>
                                    <GridItem>
                                        <Table 
                                            tableHeaderColor=''
                                            tableHead={HeaderTablePie}
                                            tableData={[
                                                [`${porcentagemCall.toFixed(2)} %`, `${porcentagemPut.toFixed(2)} %`, `${porcentagemDoji} %`]
                                            ]}
                                        />
                                    </GridItem>
                                </div>
                            }
                            {/* <div className={style.graphicPie}>
                                <div className={style.direita}>
                                    <Pie data={sessionsChannelChartData} options={sessionsChannelChartOptions}/>
                                </div>
                                <div  className={style.esquerda}>
                                    <Table 
                                        tableHeaderColor=''
                                        tableHead={HeaderTablePie}
                                        tableData={[
                                            [`${porcentagemCall}%`, `${porcentagemPut}%`, `${porcentagemDoji}%`]
                                        ]}
                                    />
                                </div>
                            </div> */}

                            {/* <div className="row row-sm mg-b-20">
                                <div className="col-lg-20 mg-t-20 mg-lg-t-0">
                                    <div className="card card-dashboard-four">
                                        <div className="card-header">
                                            <h6 className="card-title">Sessions by Channel</h6>
                                        </div>
                                    <div className="card-body row">
                                        <div className="col-md-12 d-flex align-items-center">
                                            <div className="chart">
                                                <Pie data={sessionsChannelChartData} options={sessionsChannelChartOptions} />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-10 mg-lg-l-auto mg-t-20 mg-md-t-0">
                                            <div className="az-traffic-detail-item">
                                                <div>
                                                    <span>Organic Search</span>
                                                    <span>1,320 <span>(25%)</span></span>
                                                </div>
                                            <div className="progress">
                                            <div className="progress-bar bg-purple wd-25p" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="az-traffic-detail-item">
                                            <div>
                                            <span>Email</span>
                                            <span>987 <span>(20%)</span></span>
                                            </div>
                                            <div className="progress">
                                            <div className="progress-bar bg-primary wd-20p" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div> */}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            
        </div>
    );
}

export default Dashboard;