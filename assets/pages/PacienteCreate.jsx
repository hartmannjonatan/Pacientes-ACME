import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'
import Swal from 'sweetalert2'
import axios from 'axios';

function PacienteCreate(){ //Esse componente diz respeito à página de cadastro de novos pacientes
    //declarando states
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [sexo, setSexo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [status, setStatus] = useState(true);
    const [dataNasc, setDataNasc] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => { //quando o usuário clica no botão de enviar o formuláiro com os dados, a função dessa contante é chamada
        setIsSaving(true);
        let formData =  new FormData() //cria um objeto com os dados do form com base nos states já setados
        formData.append("nome", nome)
        formData.append("cpf", cpf)
        formData.append("sexo", sexo)
        formData.append("dataNasc", dataNasc)
        formData.append("endereco", endereco)

        //verifica se o CPF inserido é válido (já existente no banco de dados ou não)
        let cpfValido = false;
        axios.get('/api/validyCPF/'+cpf).then(function (response){
            cpfValido = response.data //essa rota da api retorna true ou false para um determinado cpf enviado via get

            if(cpfValido){
                axios.post('/api/create', formData).then(function (response) { //envia com a api via post os dados para persistir o novo paciente
                    //se for bem sucedido, é exibido um alerta (com a biblioteca sweetalert) de sucesso
                    Swal.fire({
                        icon: 'success',
                        title: 'Paciente cadastrado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    //seta os states para o padrão novamente
                    setIsSaving(false);
                    setCpf("")
                    setDataNasc("")
                    setEndereco("")
                    setNome("")
                    setSexo("")
                    document.getElementById("btn-home").click(); //redireciona o usuário para a página inicial
                }).catch(function (error) {
                    //se houver algum erro, o sweetalert exibe um alerta informando erro interno
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocorreu um erro interno!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setIsSaving(false)
                });
            } else{
                //se a api de validaação do cpf retornar false, alerta exibe que já há um paciente cadastrado com esse cpf
                Swal.fire({
                    icon: 'error',
                    title: 'Já existe um paciente cadastrado com esse cpf.',
                    showConfirmButton: false,
                    timer: 1500
                })
                document.location.reload(true); //recarrega a página atual para permitir o usuário inserir os dados novamente
            }
        })

        

    }

    return ( //com esse retorno, é renderizado todo o formulário de cadastro de um novo paciente
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
                                <input required type="text" value={nome} className='form-control' id='nome' name='nome' onChange={(event)=>{setNome(event.target.value)}}/> {/* em todos os inputs, quando esses forem alterados, os states respectivos são setados com os valores inseridos pelo usuário */}
                                <label htmlFor="cpf">CPF:</label>
                                <input required type="text" value={cpf} className='form-control cpf' id='cpf' name='cpf' onChange={(event)=>{setCpf(event.target.value.replace(".", "").replace("-", ""))}}/> {/* o replace é responsável por remover os "." e "-" caso o usuário digite dessa maneira */}
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
                            <button disabled={isSaving} onClick={handleSave} type="button" className='btn btn-outline-primary mt-3'> {/* os isSaving é responsável por habilitar ou desabilitar o botão quando necessário, além disso, quaando clicado (onClick) é chamado a função handleSave */}
                            Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PacienteCreate; //exporta o componente PacienteCreate