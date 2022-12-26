import React from 'react';

const Layout = ({children}) =>{ //Esse componente permite adicionar componentes dentro de um layout prévio com um container-fluid
    return(
        <div className="container-fluid">
            {children}
        </div>
    )
}

export default Layout;