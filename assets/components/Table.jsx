

import React, {Component} from 'react';
import {Route, Routes, Navigate, Link, withRouter} from 'react-router-dom';
import Search from './Search';
import plus from '../../public/img/plus.svg'

class Table extends Component {
    render(){
        <div className="">
            <div className="row my-2">
                <div className="col-7">
                    <Search />
                </div>
                <div className="col-3"></div>
                <div className="col-2 buttons d-flex flex-row justify-content-end">
                    <div className="">
                        <button className="noselect plus"><span className="text">Cadastrar</span><span className="icon"><img src={plus}/></span></button>
                    </div>
                </div>  
            </div>
            <table className="table table-bordered table-light table-hover table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Data Nascimento</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Endereço</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>a</td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}

export default Table;