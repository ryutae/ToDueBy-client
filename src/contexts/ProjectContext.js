import React from 'react'



const ProjectContext = React.createContext({
    project: [],
    tasks: [],
    setError: () => {},
    clearError: () => {},
    setProject: () => {},
    clearProject: () => {},
    setTasks: () => {},
    addTask: () => {},
    updateProject: () => {}
})

export default ProjectContext

export class ProjectProvider extends React.Component {
    state = {
        project: [],
        tasks: [],
        error: null
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }
    
    clearError = () => {
    this.setState({ error: null })
    }

    setProject = project => {
    this.setState({project: project})
    }

    setTasks = tasks => {
    this.setState({ tasks })
    }

    clearProject = () => {
    this.setProject({})
    this.setTasks([])
    }

    addTask = task => {
    this.setTasks([
        ...this.state.tasks,
        task
    ])
    }

    updateProject = project => {
        this.setState({project: project})
    }

    render() {
        const value = {
            project: this.state.project,
            tasks: this.state.tasks,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setProject: this.setProject,
            setTasks: this.setTasks,
            clearProject: this.clearProject,
            addTask: this.addTask,
            updateProject: this.updateProject
          }
        return (
            <ProjectContext.Provider value={value}>
                {this.props.children}
            </ProjectContext.Provider>
        )
    }
}