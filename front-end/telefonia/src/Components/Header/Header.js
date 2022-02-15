import React from "react";
import './Header.css'
import logo from '../../assets/Logo.png';

const Header = () => {
  return (
    <>
      <div id="header" className="row">
        <div id="logo" className="col-1">
          <img src={logo} alt="" />
        </div>
        <div id="titulo" className="col-2">

          <h1 id="nombre">CALL ME</h1>

        </div>

        <div className="col-8">
            <div  id="banner"></div>
            
          </div>
      </div>



      <div id="banner">



      </div>
    </>
  )

}
export default Header