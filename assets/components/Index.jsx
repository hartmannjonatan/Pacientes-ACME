// ./assets/js/components/Home.js
    
import React, {Component} from 'react';
import {Route, Routes, Navigate, Link, withRouter} from 'react-router-dom';
import Paciente from './Paciente';
import Form from './Form';
import Table from './Table';
    
class Index extends Component {
    //var(--bs-table-striped-bg)
    render() {
        return (
           <div className="d-flex flex-column">
                <div className="fixed-top">
                    <header className="logo h2">
                        Pacientes - ACME
                    </header>
                </div>
                <div className="container-fluid mt-5 pt-5 px-5">
                    <Table/>
                </div>
           </div>
        )
    }
}
    
export default Index;