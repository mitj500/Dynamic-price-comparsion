import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

export default function Proxy(props) {
    useEffect(() => {
        redirect();
    }, []);
    const navigate = useNavigate();
    navigate('/search');
    const redirect = () => {
        navigate('/search');
    }
    return (
        <div>

        </div>
    )
}
