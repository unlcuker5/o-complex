import React, { useRef } from 'react';
import styles from './products.module.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, addQuatity, removeQuatity } from '../../store/reducer';

interface ProductProps {
  id: number; 
  image_url: string;
  title: string;
  description: string;
  price: number;
  isBuyed: boolean;
}

export function Products() {
  const [data, setData] = useState<ProductProps[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{ [key: number]: boolean }>({});
  const dispatch = useDispatch()
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const apiUrl = 'http://o-complex.com:1337/products?page=1&page_size=20';
    axios.get(apiUrl).then((resp) => {
      const allData = resp.data;
      const data = allData.products;
      setData(data);
    });
  }, []);

  const handleBuyClick = (index: number, product: ProductProps) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [index]: !prevSelectedProducts[index],
    }));
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: 1,
    }));
    dispatch(addProduct({ productName: product.title, quantity: 1, price: product.price, id: product.id }));
  };
 

  const handleAddQuantity = (index: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1,
    }));
    dispatch(addQuatity(index+1))
  };

  const handleRemoveQuantity = (index: number) => {
    if (quantities[index] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: prevQuantities[index] - 1,
      }));
      dispatch(removeQuatity(index+1))
    }
  };


  return (
    <div className={styles.grid}>
      {data.length > 0 ? (
        data.map((product: ProductProps, index: number, q) => (
          <div className={styles.card} key={index}>
            <img src={product.image_url} className={styles.image} alt='картинка не загрузилась'></img>
            <span className={styles.title}>{product.title}</span>
            <span className={styles.description}>{product.description}</span>
            <span className={styles.price}>{product.price}  ₽</span>
            {selectedProducts[index] ? (
              <div className={styles.buttonsWrapper}>
                <button className={styles.btnS} onClick={()=> handleRemoveQuantity(index)}>-</button>
                <button className={styles.btnM}>{quantities[index]}</button>
                <button className={styles.btnS} onClick={()=> handleAddQuantity(index) }>+</button>
              </div>
            ) : (
              <button className={styles.btn} onClick={() => handleBuyClick(index,product )}>Купить</button>
            )}
          </div>
        ))
      ) : (
        <div>нет товаров</div>
      )}
    </div>
  );
}
