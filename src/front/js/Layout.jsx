import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";

import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/single";

import { Navbar } from "./component/Navbar.jsx";
import { Alert } from "./component/Alert.jsx";
import { ContactList } from "./component/ContactList.jsx";
import { AddContact } from "./component/AddContact.jsx";
import { EditContact } from "./component/EditContact.jsx";
import { NoLogged } from "./component/NoLogged.jsx";
import { ShowElements } from "./component/ShowElements.jsx";
import { DetailView } from "./component/DetailView.jsx";


import { Login } from "./pages/Login.jsx";

import { Footer } from "./component/Footer.jsx";

const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                   <Navbar />
                   <Alert />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<AddContact />} path="/AddContact" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ContactList />} path="/contact-list" />  
                        <Route element={<NoLogged />} path="/no-logged" /> 
                        <Route element={<EditContact />} path="/edit-contact" /> 
                        <Route element={<ShowElements />} path="/show-elements" />      
                        <Route element={<Login />} path="/Login" />  
                        <Route element={<DetailView />} path="/detail-view" />  
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};



export default injectContext(Layout);
