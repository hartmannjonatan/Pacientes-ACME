import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';
import axios from 'axios';

function PacienteRead(){
    const [pacienteList, setPacienteList] = useState([])

    useEffect(() => {
        fetchPacienteList()
    }, [])

    const fetchPacienteList = () => {
        axios.get('/api/').then(function (response) {
            setPacienteList(response.data);
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

    return (
        <Layout>
            <div className="container-fluid">
                <h2 className="text-center mt-5 mb-3 text-light">Pacientes ACME</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className='btn btn-outline-primary' to="/create">Cadastrar Paciente</Link>
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
                            <tbody>
                                {pacienteList.map((paciente, key) => {
                                    paciente.status = paciente.status ? "Ativo" : "Inativo";
                                    return (
                                        <tr key={key}>
                                            <td>{paciente.nome}</td>
                                            <td>{paciente.dataNasc}</td>
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
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PacienteRead;