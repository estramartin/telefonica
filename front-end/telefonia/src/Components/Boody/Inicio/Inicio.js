import React from "react";
import logo from '../../../assets/Logo.png';
import './Inicio.css'

const Inicio = () => {
    return (
        <>
            <div className="row justify-content-center backg">
                
                <div className="col-8  pt-5 pe-5">
                    <h1 className="row justify-content-center link-warning">Bienvenido a CALL ME</h1>
                   
                </div>
                <div className="col-1 me-5 "></div>
            </div>
            <div className="row justify-content-center backg">
                <div className="col-3"></div>
                <div className="col-9  pt-5 pb-5">
                     <img id="imagen" src={logo} className="w-50" alt="" />
                   
                </div>

             
            </div>
        </>
    )
}
export default Inicio