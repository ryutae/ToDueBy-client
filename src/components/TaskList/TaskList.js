import React from 'react'
import TaskListItem from '../TaskListItem/TaskListItem'
import ProjectContext from '../../contexts/ProjectContext';

export default class TaskList extends React.Component {
    static contextType = ProjectContext

    renderTasks() {
        const taskList = this.context.tasks
        return taskList.map(task => 
            <TaskListItem
                key={task.id}
                task={task}
            />
        )
    }

    render() {
        const { error } = this.context
        return (
            <section className='TaskList'>
            {error
                ? <p className='red'>There was an error, try again</p>
                : this.renderTasks()}
            </section>
        )
    }
}