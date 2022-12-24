/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

// start the Stimulus application
import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Index from './components/Index';
    
ReactDOM.render(<Router><Index /></Router>, document.getElementById('root'));

