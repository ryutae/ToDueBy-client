import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './TaskList';
import {BrowserRouter} from 'react-router-dom';

it('renders TaskList component without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
        <TaskList tasks={
        [{
          "id": 1,
          "project_id": 1,
          "name": "test",
          "description": "test",
          "date_created": "2019-06-29T05:53:01.306Z"
        }]
        }/>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
