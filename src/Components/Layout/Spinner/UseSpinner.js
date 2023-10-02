import React,{useState} from 'react';
import Spinner from './Spinner';


const UseSpinner = overlay => {
    const [Visible,setVisible]= useState(false);
    const showSpinner = () => setVisible(true);
    const hideSpinner = () => setVisible(false);

    const spinner = Visible ? <Spinner  /> : null;

    return [spinner,showSpinner,hideSpinner];
   
};

export default UseSpinner;