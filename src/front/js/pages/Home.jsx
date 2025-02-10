import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>STAR WARS</h1>
			<h1>Héctor Millán</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
						
		</div>
	);
};
