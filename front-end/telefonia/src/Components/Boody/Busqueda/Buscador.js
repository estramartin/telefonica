import React from "react";

const Buscador =(props)=>{


    
    return(
    <>
    <div className="row" >
                
            <div className="col-6 mt-4">
                
                
                <input  type={props.tipo}  className="input form-control w-100 " 
                placeholder={props.mensaje}
                name ='busqueda'
                onKeyPress={(e)=>e.charCode ===13 && props.listar()}
                value= {props.busqueda}
                onChange={(e)=>props.setBusqueda(e.target.value)}
                required
                />
              </div>   
              <div className="col-6">     
                 
                
                 <button className="boton-buscar btn btn-primary ps-5 pe-5 mt-4" onClick={()=>props.listar()}> Buscar</button>    
                
                 </div>
             
            </div>         
    </>
    )
    }
    export default Buscador