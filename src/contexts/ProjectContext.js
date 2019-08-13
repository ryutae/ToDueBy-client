import React from 'react'



const ProjectContext = React.createContext({
    project: [],
    tasks: [],
    members: [],
    setError: () => {},
    clearError: () => {},
    setProject: () => {},
    clearProject: () => {},
    setTasks: () => {},
    addTask: () => {},
    updateProject: () => {},
    setMembers: () => {}
})

export default ProjectContext

export class ProjectProvider extends React.Component {
    state = {
        project: [],
        tasks: [],
        members: [],
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
    
    setMembers = members => {
    this.setState({ members })
    }

    clearProject = () => {
    this.setProject({})
    this.setTasks([])
    this.setMembers([])
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
            members: this.state.members,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setProject: this.setProject,
            setTasks: this.setTasks,
            clearProject: this.clearProject,
            addTask: this.addTask,
            updateProject: this.updateProject,
            setMembers: this.setMembers
          }
        return (
            <ProjectContext.Provider value={value}>
                {this.props.children}
            </ProjectContext.Provider>
        )
    }
}