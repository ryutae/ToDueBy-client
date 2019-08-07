import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'normalize.css';
import { ProjectProvider } from './contexts/ProjectContext'
import { ProjectListProvider } from './contexts/ProjectListContext'

ReactDOM.render(
    <BrowserRouter>
        <ProjectListProvider>
            <ProjectProvider>
                <App />
            </ProjectProvider>
        </ProjectListProvider>
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
