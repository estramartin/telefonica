import React from "react";
import './Footer.css'
import html from '../../assets/html.png'
import css from '../../assets/css3.png'
import js from '../../assets/js.png'
import react from '../../assets/react.png'
import bootstrap from '../../assets/bootstrap.png'
import postgre from '../../assets/postgresql.png'
import py from '../../assets/py.png'
import fastapi from '../../assets/fastapi.svg'
import linkedin from '../../assets/Linkedin.png'


const Footer = () => {
    return (<>

        <div id="footer" className="row">

            <div className="row">
                <div className="col-10 title" ><h1>Tecnologias</h1></div>
                <div className="col-2 title" ><h1>Contacto</h1></div>
            </div>


            <div id="content" className="row justify-content-center ">

                <div className="col-1"><a href="https://developer.mozilla.org/es/docs/Web/HTML/Index" target="_blank"  rel="noreferrer"><img id="html" className="tecnologias" src={html} alt="" /> </a></div>
                <div className="col-1"><a href="https://developer.mozilla.org/es/docs/Web/CSS" target="_blank"  rel="noreferrer"><img className="tecnologias" src={css} alt="" /></a> </div>
                <div className="col-1"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"  rel="noreferrer"><img className="tecnologias" src={js} alt="" /> </a></div>
                <div className="col-1"><a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/" target="_blank"  rel="noreferrer"><img className="tecnologias" src={bootstrap} alt="" /></a> </div>
                <div className="col-1"><a href="https://es.reactjs.org/docs/getting-started.html" target="_blank"  rel="noreferrer"><img className="tecnologias" src={react} alt="" /></a> </div>
                <div className="col-1"><a href="https://www.postgresql.org/docs/" target="_blank"  rel="noreferrer"><img className="tecnologias" src={postgre} alt="" /> </a></div>
                <div className="col-1"><a href="https://docs.python.org/es/3.10/index.html" target="_blank"  rel="noreferrer"><img className="tecnologias" src={py} alt="" /></a> </div>
                <div className="col-3"><a href="https://fastapi.tiangolo.com/" target="_blank"  rel="noreferrer"><img className="tecnologias" src={fastapi} alt="" /></a> </div>
                <div className="col-2 ps-5"><a href="https://www.linkedin.com/in/estradamartin/" target="_blank" rel="noreferrer"><img className="tecnologias" src={linkedin} alt="" /> </a></div>

            </div>
        </div>
    </>

    )

}
export default Footer