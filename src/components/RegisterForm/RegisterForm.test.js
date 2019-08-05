import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from './RegisterForm'

it('renders Register component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <RegisterForm/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
