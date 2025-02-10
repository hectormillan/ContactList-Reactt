import React, { useContext,useState, useEffect } from "react";  
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';


export const Navbar = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const categorias = ["PEOPLE","PLANETS","SPECIES", "STARSHIPS", "VEHICLES"];
	const favorites = store.favorites || [];


	const selectedCategory = (category) => {

	//	actions.getElements(category);

	actions.setSelectedCategory(category);
	
	
	
	}

	const vistaDetalle = (element) => {

        actions.setSelectedElements(element);
     //   actions.setSelectedElementId(index);
       navigate("/detail-view");


     }
	

	const desLoguearse = () => {

		
		if (store.isLogged) {

			actions.DesLogging();
			navigate('/no-logged');

		} else navigate('/Login')
		

	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">

				<div className="d-flex justify-content-center col col-lg-3 p-4">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">{"HOME"}</span>
					</Link>
				</div>
				
				<div className="d-flex justify-content-center col col-lg-3 p-4">
					<Link to="/contact-list">
						<span className="navbar-brand mb-0 h1">{"CONTACTS"}</span>
					</Link>
				</div>

				
					{categorias.map((iterator) =>
							<div className="d-flex justify-content-center col col-lg-3 p-4">
								<Link to="show-elements">
									<span className="navbar-brand mb-0 h1" onClick={(e)=> actions.setSelectedCategory(iterator.toLowerCase())} >{iterator}</span>
								</Link>
							</div>
		
						
					)}

				
						<div className="dropdown mx-1">
								<button
									className="btn btn-primary dropdown-toggle"
									type="button"
									id="favoritesDropdown"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									aria-label="Toggle Favorites Dropdown"
								>
									Favorites ({favorites.length})
								</button>
						<ul className="dropdown-menu" aria-labelledby="favoritesDropdown">
							{favorites.length > 0 ? (
								favorites.map((fav, index) => (
									<li key={index} className="dropdown-item d-flex justify-content-between">

									

									 <Link to="/detail-view" >
									   <span type="button" className="" onClick={(element) => vistaDetalle(fav.elemento)} >{fav.elemento.name}</span>
									</Link>

										<button className="btn btn-sm btn-danger ms-2" onClick={() => actions.removeFavorite(index)}>
											<i className="fas fa-trash"></i>
										</button>
									</li>
								))
							) : (
								<>
									<li className="dropdown-item">No favorites added</li>
									<li className="dropdown-divider"></li>
								</>
							)}
						</ul>
					</div>
				

			</div>
		</nav>
	);
};
