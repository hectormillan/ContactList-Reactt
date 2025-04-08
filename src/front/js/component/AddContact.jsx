import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from 'react-router-dom'


export const AddContact = () => {
    const { store, actions  } = useContext(Context);
    const host = "https://playground.4geeks.com/todo";
    const user = "hectormillan";
    let navigate = useNavigate();
    const { id } = useParams();  // Se obtine el id colocado en el layout
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    
    function guardarContacto(e) {
        e.preventDefault();
        if (name.trim() == "" || phone.trim() == "" || email.trim() == "" || address.trim() == "") {
            alert("Empty fields")
            return null
        };
        const contacto = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };    
        actions.addContact(contacto);                
        alert("Se grabo los datos del contacto");
        navigate("/contact-list");
        setName("");
        setPhone("");
        setEmail(""),
        setAddress("");
    }

    useEffect(() => {
        // getTodos();
        actions.getContactList();   
    }, []);
  

    return (
        <div className="container">
            <h1 className="text-center">{!id ? "Add a New Contact" : `Editing Contact: ${name}`}</h1>
            <form className="container" onSubmit={guardarContacto}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput1" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Full name" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter phone" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput4" className="form-label">Address</label>
                    <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} value={address} required />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" >Save</button>
                </div>
            </form>
            <Link to="/contact-list">volver a Contacts</Link>
        </div>
    )
}
