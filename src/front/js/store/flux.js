const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			cohorte: 'Spain-93',
			user: '',
			contact: [],
			selectedContact: {},
			isEditing: false,
			host: "https://playground.4geeks.com",
			isLogged: false,
			alert : {text: 'Mi primer alert', visible: false, background: 'success'},
			selectedCategory: "",
			elements: [],
			selectedElement: {},
			selectedElementId: "",
			favorites: [] 
			

		},
		actions: {

			setUser: (newUser) => {setStore({user: newUser})},
			setSelectedElements: (elemento) => {setStore({selectedElement: elemento})},
			setSelectedElementId: (valor) => {setStore({selectedElementId: valor+1})},
			
			setAlert: (newAlert) => {
				setStore({alert: newAlert});

				const ReiniciarAlerta = {text: '', visible: false, background: 'success'};
		
				setTimeout(() => {
						setStore({ alert: ReiniciarAlerta});
						console.log("alerta reiniciada");
				}, 3000);
					
			}, 

			setIsLogged: (value) => {setStore({isLogged: value})}, 
			setContact: (contact) => {setStore({contact: contact})},
			setSelectedContact: (contact) => {setStore({selectedContact: contact})},
			setiIsEditing: (valor) => {setStore({isEditing: valor})},


			// Use getActions to call a function within a fuction

			addFavorite: (item,categoria) => {
                const store = getStore();
				const favorito = {elemento: item, categoria: categoria}
                const isAlreadyFavorite = store.favorites.some((fav) => fav.elemento.name === item.name);
				
				
				

                if (!isAlreadyFavorite) {
                    setStore({ favorites: [...store.favorites,{ elemento: item, categoria: categoria} ] });
                }

				
            },

             //  const updatedFavorites = store.favorites.filter((fav) => fav !== name); 
            removeFavorite: (index) => {
                const store = getStore();
             
			    const updatedFavorites = store.favorites.filter((_,i) => i !== index);
                setStore({ favorites: updatedFavorites });
				console.log(index);
            },

			getElements: async (event) => {

				event.preventDefault();
			

				const store = getStore();
				const actions = getActions();

			
				
				
					const uri = `https://www.swapi.tech/api/${store.selectedCategory}`; 
				
							
				
				
		//		const uri = `https://www.swapi.tech/api/people`;
				
				const options = {
					method: 'GET'
				}
			
				const response = await fetch(uri,options);
		
				if (!response.ok) {
															
					return
				}
		
				const data = await response.json();
				setStore({elements: data.results});
				
						
			},

			getElementInfo: async (event) => {

			

				const store = getStore();
				const actions = getActions();
			
				
				const uri = `https://www.swapi.tech/api/${store.selectedCategory}/${event}`;
		//		const uri = `https://www.swapi.tech/api/people`;

		
				
				const options = {
					method: 'GET'
				}
			
				const response = await fetch(uri,options);
		
				if (!response.ok) {
															
					return
				}
		
				
				const data = await response.json();
				setStore({selectedElement: data.result.properties});
				setStore({selectedElementId: data.result.uid});
				
				
			
				
		
			},

			setSelectedCategory: (c) => {

				const store = getStore();
				const actions = getActions();
				
				setStore({selectedCategory: c});
							
				actions.getElements(event);

			
			},		

			

			


			createUser: async (event) => {

				
				const store = getStore(); // Use getStore(); to use "store" datas. 

				const uri = `https://playground.4geeks.com/contact/agendas/${store.user}`;
				
				const options = {
					method: 'POST'
				}
			
				const response = await fetch(uri,options);
			
				if (!response.ok) {
													
					return
				}
		
				const data = await response.json();


			},

			DesLogging: async (event) => {

							
				const actions = getActions();

				setStore({isLogged: false});
				setStore({user: ""});


				const message = {
					text: `Se ha deslogueado con exito`,
					visible: true,
					background: 'warning'
				}
				
				actions.setAlert(message);

			
			},

			getContactList: async (event) => {

				if (event) event.preventDefault();
			

				const store = getStore();
				const actions = getActions();
			
				
				const uri = `https://playground.4geeks.com/contact/agendas/${store.user}/contacts`;
				
				const options = {
					method: 'GET'
				}
			
				const response = await fetch(uri,options);
		
				if (!response.ok) {
					if(response.status=="404"){
						console.log("usuario no encontrado");
						actions.createUser(store.user);
						
					}
										
					return
				}
		
				const data = await response.json();
				setStore({contact: data.contacts});
		
			},

			
			addContact: async (contacto) => {
				
				const store = getStore();
				           
				const uri = `https://playground.4geeks.com/contact/agendas/${store.user}/contacts`;
				const dataToSend = {
					name: contacto.name,
					phone: contacto.phone,
					email: contacto.email,
					address: contacto.address,
				}
		
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
		
					body: JSON.stringify(dataToSend)
				  
				}
		
				const response = await fetch(uri, options)
				if(!response.ok)
					{
						return;
					}
					const data = await response.json()

				
					
					actions.getContactList(event);
		
			},

			editContact: async (contacto) => {
				
				const store = getStore();    
				const uri = `https://playground.4geeks.com/contact/agendas/${store.user}/contacts/${contacto.id}`;

				const dataToSend = {
					name: contacto.name,
					phone: contacto.phone,
					email: contacto.email,
					address: contacto.address,
				}
		
				const options = {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
		
					body: JSON.stringify(dataToSend)
				  
				}
		
				const response = await fetch(uri, options)

				if(!response.ok)
					{
						return;
					}
					const data = await response.json()
		
			},


			 delContact: async (contactId) => {

				const store = getStore();
				const actions = getActions();

     			const uri = `https://playground.4geeks.com/contact/agendas/${store.user}/contacts/${contactId}`;
			  		
				const options = {
					method: 'DELETE'
				}
				
				const response = await fetch(uri,options)
			
				if(!response.ok)
					{
					  
						return;
					}
				   
					
			
					await actions.getContactList();
					navigate("/");
		
			
			},

			


			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
