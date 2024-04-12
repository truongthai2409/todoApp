// import React from 'react';

import { useState } from "react";
import Loading from "./Loading";

const LoadingButton = ({ onClick, children }) => {
    const [load, setLoad] = useState(false);
    const handleClick = async () => {
        setLoad(true); 
        try {
            await onClick();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoad(false); 
        }
    };

    return (
        <div onClick={handleClick} disabled={load}>
            {load ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'linear'}}>
                    <Loading />Mark Done
                </div>
                : children}
        </div>
    );
}
export default LoadingButton;