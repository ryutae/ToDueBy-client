import React from 'react';
import ReactDOM from 'react-dom';
import SideMenu from './SideMenu';
import {BrowserRouter} from 'react-router-dom';

it('renders SideMenu component without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
        <SideMenu />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
