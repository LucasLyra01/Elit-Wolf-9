import { useState } from 'react';
import styles from './styles.module.scss';

export function Input(props){
    
  return(
    <div className={styles.floatLabel}>
      <input 
      
      />

    </div>
  )
}
// return(
//   <div className={styles.floatLabel}>
//       <input 
//       id={props.id}
//       // type='email'
//       type={props.type}
//       // value={value}
//       onChange={(e) => handleTextChange(e.target.value)}
//       />

//       <label 
//       className={ isActive ? styles.Active : '' } 
//       // htmlFor="email"
//       >
//       {props.title}
//       </label>
//   </div>
// )