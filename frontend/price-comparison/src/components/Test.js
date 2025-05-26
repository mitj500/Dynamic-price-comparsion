import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export default function Test() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const name = queryParams.get('name');
    const price = queryParams.get('price');
    const stars = queryParams.get('stars');
    const image = queryParams.get('image');
    const link = queryParams.get('link');


    return (
        <div className='Product'>
           {name+"  "+price}
        </div>
    );
}