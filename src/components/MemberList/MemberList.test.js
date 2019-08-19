import React from 'react';
import ReactDOM from 'react-dom';
import MemberList from './MemberList';

it('renders MemberList component without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
        <MemberList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
