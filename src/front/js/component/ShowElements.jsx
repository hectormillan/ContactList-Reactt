import React, {useActionState, useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const ShowElements = () => {

     const { store, actions  } = useContext(Context);
     const navigate = useNavigate();
     const [categoria, setCategoria ] = useState(store.selectedCategory);

     


     const vistaDetalle = (element) => {

     //    actions.setSelectedElements(element);
     //   actions.setSelectedElementId(index);
      actions.getElementInfo(element);
       navigate("/detail-view");


     }
      
    return (

         <div className="container">
                    <h1 className="text-center my-4">{store.selectedCategory.toUpperCase()}</h1>

                    <div className="row">
                      
       
                                  
                            {/* recorre el array contact usando la función map(); */}
                            {/* loop through the contact array using the map() function; */}
                            {store.elements.map((iterator, index) =>
                            <div className="col-md-4 mb-4">
                               
                                        <div className="card" >
                                            
                                        <div className="card-body">
                                            <img class="card-img-top" src={`https://starwars-visualguide.com/assets/img/${store.selectedCategory=== "people" ? "characters" : store.selectedCategory }/${iterator.uid}.jpg`} alt="Card image cap"/>
                                            <h5 className="card-title mb-2">{iterator.name}</h5>
                                                                                  
                                            <Link to="/detail-view" >
                                                        <button type="button" className="btn btn-primary mb-2" onClick={(event) => actions.getElementInfoByShow(iterator.uid)} >Ver elemento</button>
                                            </Link>
                                            
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() => actions.addFavorite(iterator, store.selectedCategory)}
                                            >
                                                <i className="fas fa-heart"></i> Add to Favorites
                                            </button>
                                        
                                        </div>
                                        </div>
                                    </div>
                                
                                )}
            
                           
                           
                        </div>
                </div>
    )   
}