import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout';
import Swal from 'sweetalert2';
import axios from 'axios';

function PacienteEdit(){ //esse componente é responsável por retornar o formulário de atualização dos registros de um paciente
    //declarando states
    const [id, setId] = useState(useParams().id);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [oldCpf, setOldCpf] = useState('');
    const [sexo, setSexo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [status, setStatus] = useState(true);
    const [dataNasc, setDataNasc] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    //quando o componente for renderizao (ou componente pai, ou quando seus states são alterados)
    useEffect(() => {
        axios.get('/api/show/'+id).then(function (response){ //api get recebe os dados de um paciente de acordo com seu id
            let paciente = response.data
            //seta os states com seus respectivos dados retornados pela api
            setNome(paciente.nome);
            setCpf(paciente.cpf);
            setOldCpf(paciente.cpf);
            setSexo(paciente.sexo);
            setEndereco(paciente.endereco);
            setStatus(paciente.status);
            setDataNasc(paciente.dataNasc)
        }).catch(function (error){
            //se houver erro é exibido um alert informando erro interno
            Swal.fire({
                icon: 'error',
                title: 'Ocorreu um erro interno...',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }, [])

    const handleSave = () =>{ //essa constante armazena uma função que é chamada quando o botão de atualizar dados do paciente é clicado
        setIsSaving(true);
        //seta states com respectivos valores do formulário
        setNome(document.getElementById("nome").value.toString());
        setCpf(document.getElementById("cpf").value);
        setSexo(document.getElementById("sexo").value);
        setEndereco(document.getElementById("endereco").value);
        setDataNasc(document.getElementById("dataNasc").value);
        let formData =  new FormData() //armazena os dados em um objeto data
        formData.append("nome", nome)
        formData.append("cpf", cpf)
        formData.append("sexo", sexo)
        formData.append("dataNasc", dataNasc)
        formData.append("endereco", endereco)

        let cpfValido = false;
        if(oldCpf != cpf){ //verifica se o cpf está sendo atualizado
            cpfValido = false;
            axios.get('/api/validyCPF/'+cpf).then(function (response){ //valida o cpf
                cpfValido = response.data

                if(cpfValido){
                    axios.post('/api/edit/'+id, formData).then(function (response){ //api envia os dados via post atualizando o paciente
                        Swal.fire({
                            icon: 'success',
                            title: 'Paciente atualizado com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setIsSaving(false);
                        document.getElementById("btn-home").click(); //redireciona o usuário para a tela inicial
                    }).catch(function (error){
                        Swal.fire({
                            icon: 'error',
                            title: 'Ocorreu um erro interno...',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setIsSaving(false);
                    })
                } else{
                    //exibe alerta caso já exista paciente cadastrado com o mesmo cpf
                    Swal.fire({
                        icon: 'error',
                        title: 'Já existe um paciente cadastrado com esse cpf.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    document.location.reload(true); //recarrega a página permitindo o usuário atualizar novamente os dados
                }
            })
        } else{
            cpfValido = true;
            axios.post('/api/edit/'+id, formData).then(function (response){ //envia os dados via post pela api
                Swal.fire({
                    icon: 'success',
                    title: 'Paciente atualizado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                document.getElementById("btn-home").click();
            }).catch(function (error){
                Swal.fire({
                    icon: 'error',
                    title: 'Ocorreu um erro interno...',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
            })
        }

        
    }

    return ( //renderiza o componente criado
        <Layout>
            <div className="container">
                <h2 className="text-center text-light mt-5 mb-3">Atualizar registro de paciente</h2>
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
                                    <option defaultValue={"null"} disabled>Selecione seu sexo</option>
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
                                Atualizar Paciente
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default PacienteEdit; //exporta o componente PacienteEdit