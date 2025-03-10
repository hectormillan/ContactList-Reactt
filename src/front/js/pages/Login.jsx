import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom'


export const Login = () => {

  const { actions  } = useContext(Context);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleEmail = (event) => {
     setEmail(event.target.value.toLowerCase())
  }

  const handlePassword = (event) => {
    setPassword(event.target.value.toLowerCase())
  }
  

// Funcion cuando se ejecuta el submit del formulario. 
// Function when the form submit is executed.
  const handelSubmit = async  (event) => {
    event.preventDefault();   
    
    // crea la constante dataToSend para gestionar los datos que se van a enviar 
    // Ya no se usa: const dataToSend = { email }
   
    // Ejecuta "actions" para almacenar user y isLogged en flux.js.
    // Run "actions" to store user and isLogged in flux.js.

    const success = await actions.login(email, password);
        if (success) {
            navigate("/");
            actions.setUser(email);
            actions.setIsLogged(true);
        } else {
            setError("Invalid credentials. Please try again.");
        }
    

    // Crea el mensaje que se va a enviar en la alerta
    // Create the message to be sent in the alert
   
    const message = {
      text: `Bienvenido ${email}`,
      visible: true,
      background: 'warning'
  }

    actions.setAlert(message);
    
    navigate('/contact-list')
   
    
  }

  return (
    <div className="container">
      <h1 className="text-center text-primary">{'Login'}</h1>
      <div className="row text-start">
        <div className="col-10 col-md-6 col-lg-4 m-auto">

          <form onSubmit={handelSubmit}>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                    value={email} onChange={handleEmail} placeholder="Input your email"/>
                  <div id="emailHelp" className="form-text">If the user is not found, one will be created</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="InputPassword" 
                        value={password} 
                        onChange={handlePassword}
                        required
                    />
                </div>
                                    

                <div className="text-center">

                      {/* If submit button is empty (email == ""), dible the button. */ }
                        <button type="submit" className="btn btn-primary mx-2" disabled={!email}>Submit</button>
                  
                        <Link to="/">
                            <button type="reset" className="btn btn-secondary mx-2">Cancel</button>
                        </Link>
                      
                </div>

          </form>

        </div>
      </div>
    </div>
  )
}