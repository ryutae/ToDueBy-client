import React from 'react';
import ReactDOM from 'react-dom';
import TaskListItem from './TaskListItem';
import {BrowserRouter} from 'react-router-dom';

it('renders TaskListItem component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <BrowserRouter>
        <TaskListItem task={
        {
          "id": 1,
          "project_id": 1,
          "name": "test",
          "description": "test",
          "date_created": "2019-06-29T05:53:01.306Z"
        }
      }/>
      </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
