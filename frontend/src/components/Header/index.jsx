import { useState } from 'react';
import style from './style.module.scss';


export function Header(props){
    
    return(
        <div className={style.header}>
            <h1>{props.title}</h1>
            <h2>{props.text}</h2>
        </div>
    )
  }