import React from 'react';
import ReactDOM from 'react-dom';
import ProjectListItem from './ProjectListItem';
import {BrowserRouter} from 'react-router-dom';

it('renders ProjectListItem component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <BrowserRouter>
        <ProjectListItem project={
        {
          "id": 1,
          "group_id": 1,
          "name": "test",
          "description": "test",
          "points": 100,
          "date_created": "2019-06-29T05:53:01.306Z"
        }
      }/>
      </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
