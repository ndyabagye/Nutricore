import React from 'react';
import { DocumentData } from 'firebase/firestore'


interface ProductProps {
    product: DocumentData;
}
const Product = ({product}) => {
    return (
        <div  className="bg-white shadow-md rounded-md flex items-center justify-center">


        </div>
    );
};

export default Product;