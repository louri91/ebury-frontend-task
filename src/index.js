import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap/css/bootstrap.css';
import './common/main.css';
import EmailForm from './emailform/EmailForm';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<EmailForm />, document.getElementById('emailform'));
registerServiceWorker();
