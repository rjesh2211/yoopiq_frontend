import React from 'react';
import './spinner.css';
import loader from "./spinner.gif"
const Spinner=props => {
    
    return (
        <>
        <div id="overlayspi">
        <div className='loader'>
        <img src = {loader} alt='spinner'  style={{'width':'11%','zindex':'1000'}} />



        </div>
        </div>
        </>
    );
}

export default Spinner;
