import React from 'react'
import ProjectContext from '../../contexts/ProjectContext';

export default class MemberList extends React.Component {
    static contextType = ProjectContext

    renderMemberList() {
        return 
    }

    render() {
        const memberList = this.context.members
        return (
            <div className='memberList'>
                <h4>Members</h4>
                {memberList.length && memberList.map(member => {
                    return <p key={member.id}>
                        {member.first_name} {member.last_name}    
                    </p>
                })
                }
            </div>
        )
    }
}