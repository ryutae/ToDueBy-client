import React from 'react';
import ReactDOM from 'react-dom';
import UpdateProject from './UpdateProject';

it('renders UpdateProject component without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
        <UpdateProject  match={
            {params:
              {
                project_id: 1
              }
            }
          }/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
