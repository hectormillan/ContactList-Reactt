import React, {useActionState, useContext, useEffect, useInsertionEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const DetailView = () => {

     const { store, actions  } = useContext(Context);
     const navigate = useNavigate();
     const [categoria, setCategoria ] = useState(store.selectedCategory);
     const [elemento, setElemento ] = useState(store.selectedElement);
     const [arrayDelElemento, setArrayDelElemento] = useState(Object.entries(store.selectedElement));
     

     const actualizarInfo = () => {
          setElemento(store.selectedElement);
     }
         
              
    return (

         <div className="container single-container">
                  <div className="card d-flex" >
                     <div className="row">
                 
                              <div className="card-body col col-4">
                                                                  
                                 
                                   <h5 className="card-title">{store.selectedElement.name}</h5>
                                   
                                  
                                   <img className="card-img-top" style={{ width: '400px', height: '400px' }} src={`https://starwars-visualguide.com/assets/img/${store.selectedCategory=== "people" ? "characters" : store.selectedCategory }/${store.selectedElementId}.jpg`} alt="Card image cap"/>
                                                                  
                              </div>

                              <div className="card-body col col-4"></div>
                    </div>
                </div>
                        
                <Link to="/show-elements" >
                                        <a href="#" className="btn btn-primary">Back</a>
                                
              </Link>
                  
        </div>
    )   
}