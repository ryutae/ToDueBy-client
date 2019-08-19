import React from 'react';
import ReactDOM from 'react-dom';
import TaskPage from './TaskPage';

it('renders TaskPage component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <TaskPage match={
        {params:
          {
            task_id: 1
          }
        }
      }/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
