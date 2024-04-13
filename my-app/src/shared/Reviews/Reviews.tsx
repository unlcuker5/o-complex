import React from 'react';
import styles from './reviews.module.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

interface ReviewProps {
  id: number;
  text: string;
}

export function Reviews() {
  const [appState, setAppState] = useState([]);
 
  useEffect(() => {
    const apiUrl = 'http://o-complex.com:1337/reviews';
    axios.get(apiUrl).then((resp) => {
      const allPersons = resp.data;
      setAppState(allPersons);
    });
  }, [setAppState]);


  return (
    <div className={styles.reviewWrapper}>
      {appState.length > 0 ? (
        appState.map((review:ReviewProps, index:number)=> {
          return (
            <div className={styles.reviewCard} key={index}>
              <div className={styles.text}>{parse(review.text)}</div>
            </div>
          )
        })
       ) : (
        <div>нет отзывов</div>
       )
       }
    </div>
  );
}
