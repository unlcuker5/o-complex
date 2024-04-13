import React from 'react';
import styles from './cart.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


interface BuyProps {
  productName: string;
  quantity: number;
  price: number;
  id?: number;
}

export function Cart() {
  const buy = useSelector((state: RootState) => state.buy);
  const filteredBuy = buy.filter((action:BuyProps) => action.productName !== '');

  const multiply= (num1: number, num2: number) => num1 * num2
  
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Добавленные товары</h3>
      <form action="/" method="post" className={styles.form}>
        <ul className={styles.list}>
          {filteredBuy.length > 0 ? (
            filteredBuy.map((item:BuyProps, index:number)=> {
              return(
                <li className={styles.listItem} key={index}>
                  <span className={styles.name}>{item.productName}</span>
                  <span className={styles.quantity}>X{item.quantity}</span>
                  <span className={styles.price}>{multiply(item.price, item.quantity)} ₽</span>
                </li>
              )
            })
          ):(
            <li className={styles.listItem}>
            <span className={styles.name}>пример товара</span>
            <span className={styles.quantity}>x4</span>
            <span className={styles.price}>12312 ₽</span>
          </li>)}
          
        </ul>
        
        <div className={styles.formWrapper}>
          <input type="tel" className={styles.input} placeholder='+7 (***) *** - ** -**'/>
          <button className={styles.button} type='submit'>заказать</button>
        </div>
      </form>
      
    </div>
  );
}
