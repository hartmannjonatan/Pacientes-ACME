import React, {useState, useEffect, Component} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';
import axios from 'axios';

function PacienteRead(){
    const [pacienteList, setPacienteList] = useState([])
    const [pacienteSearch, setPacienteSearch] = useState([])
    const [lista, setLista] = useState([]);

    useEffect(() => {
        fetchPacienteList()
    }, [])

    const fetchPacienteList = () => {
        axios.get('/api/').then(function (response) {
            setPacienteList(response.data);
            setLista(response.data)
        }).catch(function (error) {
            console.log(error);
        })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Você tem certeza que quer excluir o registro desse paciente?',
            text: "Não será possível reverter!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd2606',
            cancelButtonColor: 'blue',
            confirmButtonText: 'Sim, excluir esse paciente!'
        }).then((result) => {
            if(result.isConfirmed){
                axios.delete('/api/delete/'+id).then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Paciente deletado com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchPacienteList()
                }).catch(function (error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocorreu um erro interno!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
        })
    }

    const handleChangeStatus = (id) => {
        axios.get('/api/changeStatus/'+id).then(function (response){
            document.location.reload(true);
        }).catch(function (error){
            Swal.fire({
                icon: 'error',
                title: 'Ocorreu um erro interno!',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    const handleSearch = () => {
        NodeList.prototype.forEach = Array.prototype.forEach
        const childs = document.getElementById("tbody").childNodes;
        childs.forEach(function(item){
            item.display = 'none'
        });
        let formData =  new FormData()
        formData.append('input', document.getElementById('search').value)
        axios.post('/api/searchName/', formData).then(function (response){
            let pacienteSearch = response.data;
            pacienteSearch = pacienteSearch[0];
            setPacienteSearch(pacienteSearch);
            setLista(pacienteSearch);

        }).catch(function (error){
            Swal.fire({
                icon: 'error',
                title: 'Ocorreu um erro interno!',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(error)
        })
        setPacienteSearch([])
        setLista(pacienteSearch)
    }

    return (
        <Layout>
            <div className="container-fluid">
                <h2 className="text-center mt-5 mb-3 text-light">Pacientes ACME</h2>
                <div className="card">
                    <div className="row p-2 d-flex justify-content-start headerSearch">
                        <Link className='col-2 mx-3 btn btn-outline-primary' to="/create">Cadastrar Paciente</Link>
                        <div className="col-8">
                            <form className="form-inline my-2 my-lg-0 row">
                                <div className="col-6"><input id='search' className="form-control mr-sm-2" type="search" placeholder="Pesquise pelo nome do paciente..." aria-label="Pesquisar" /></div>
                                <div className="col-6"><button onClick={(event) => {event.preventDefault(); handleSearch();}} className="btn btn-outline-success my-2 my-sm-0">Pesquisar</button></div>
                            </form>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-responsive table-bordered table-light table-hover">
                            <thead>
                                <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Data Nascimento</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Sexo</th>
                                <th scope="col">Endereço</th>
                                <th scope="col">Status</th>
                                <th scope="col" width="240px">Ação</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {
                                    lista.map((paciente, key) => {
                                        paciente.status = paciente.status ? "Ativo" : "Inativo";
                                        return(
                                            <tr key={key}>
                                                <td>{paciente.nome}</td>
                                                <td>{paciente.dataNasc ? paciente.dataNasc: paciente.data_nascimento}</td>
                                                <td>{paciente.cpf}</td>
                                                <td>{paciente.sexo}</td>
                                                <td>{paciente.endereco}</td>
                                                <td>
                                                    <span className='mx-1'>{paciente.status}</span>
                                                    <button onClick={() => handleChangeStatus(paciente.id)} className="btn btn-outline-primary mx-1">
                                                        Alterar
                                                    </button>
                                                </td>
                                                <td>
                                                    <Link to={'/edit/'+paciente.id} className="btn btn-outline-success mx-1">
                                                        Editar
                                                    </Link>
                                                    <button onClick={() => handleDelete(paciente.id)} className="btn btn-outline-danger mx-1">
                                                        Deletar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PacienteRead;