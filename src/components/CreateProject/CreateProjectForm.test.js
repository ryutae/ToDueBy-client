import React from 'react';
import ReactDOM from 'react-dom';
import CreateProjectForm from './CreateProjectForm';

it('renders CreateProjectForm component without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
        <CreateProjectForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
