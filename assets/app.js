/* Esse arquivo contém toda a importação de js (e jsx) utilizado, é o js principal */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'


// start the Stimulus application
import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PacienteRead from './pages/PacienteRead'
import PacienteCreate from './pages/PacienteCreate'
import PacienteEdit from './pages/PacienteEdit';

//a const main é responsável por renderizar os componentes corretos de acordo com a rota acessada pelo usuário
const main = (
    <Router>
        <Routes>
            <Route exact path='/' element={<PacienteRead/>} /> {/* Renderiza a página inicial */}
            <Route path='/create' element={<PacienteCreate/>} /> {/* Renderiza o formulário de cadastro */}
            <Route path='/edit/:id' element={<PacienteEdit/>} /> {/* Renderiza o formulário de atualização */}
        </Routes>
    </Router>
)

ReactDOM.render(main, document.getElementById('app')); //renderiza o componente main dentro da div "app" do html padrão

