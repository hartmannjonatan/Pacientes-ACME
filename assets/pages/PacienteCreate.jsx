import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'
import Swal from 'sweetalert2'
import axios from 'axios';

function PacienteCreate(){
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [sexo, setSexo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [status, setStatus] = useState(true);
    const [dataNasc, setDataNasc] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        let formData =  new FormData()
        formData.append("nome", nome)
        formData.append("cpf", cpf)
        formData.append("sexo", sexo)
        formData.append("dataNasc", dataNasc)
        formData.append("endereco", endereco)

        let cpfValido = false;
        axios.get('/api/validyCPF/'+cpf).then(function (response){
            cpfValido = response.data

            if(cpfValido){
                axios.post('/api/create', formData).then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Paciente cadastrado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setIsSaving(false);
                    setCpf("")
                    setDataNasc("")
                    setEndereco("")
                    setNome("")
                    setSexo("")
                    document.getElementById("btn-home").click();
                }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocorreu um erro interno!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setIsSaving(false)
                });
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'Já existe um paciente cadastrado com esse cpf.',
                    showConfirmButton: false,
                    timer: 1500
                })
                document.location.reload(true);
            }
        })

        

    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3 text-light">Cadastro de um novo paciente</h2>
                <div className="card">
                    <div className="card-header">
                        <Link id='btn-home' className='btn btn-outline-info float-right' to={'/'}>Ver todos os pacientes</Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="nome">Nome:</label>
                                <input required type="text" value={nome} className='form-control' id='nome' name='nome' onChange={(event)=>{setNome(event.target.value)}}/>
                                <label htmlFor="cpf">CPF:</label>
                                <input required type="text" value={cpf} className='form-control cpf' id='cpf' name='cpf' onChange={(event)=>{setCpf(event.target.value.replace(".", "").replace("-", ""))}}/>
                                <label htmlFor="sexo">Sexo:</label>
                                <select required onChange={(event)=>{setSexo(document.getElementById("sexo").value)}} name="sexo" id="sexo" className="custom-select form-control">
                                    <option selected value={"null"} disabled>Selecione seu sexo</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                </select>
                                <label htmlFor="dataNasc">Data de Nascimento:</label>
                                <input required type="text" value={dataNasc} className='form-control data' id='dataNasc' name='dataNasc' onChange={(event)=>{setDataNasc(event.target.value)}}/>
                                <label htmlFor="endereco">Endereço:</label>
                                <input required type="text" value={endereco} className='form-control' id='endereco' name='endereco' onChange={(event)=>{setEndereco(event.target.value)}}/>
                            </div>
                            <button disabled={isSaving} onClick={handleSave} type="button" className='btn btn-outline-primary mt-3'>
                                Cadastrar Paciente
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PacienteCreate;