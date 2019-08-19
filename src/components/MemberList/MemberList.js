import React from 'react'
import ProjectContext from '../../contexts/ProjectContext';
import './MemberList.css'

export default class MemberList extends React.Component {
    static contextType = ProjectContext

    renderMemberList() {
        return 
    }

    render() {
        const memberList = this.context.members
        return (
            <div className='memberList'>
                <p className='sub_header'>Project Members</p>
                {memberList.length && memberList.map(member => {
                    return <p className='member_item' key={member.id}>
                        {member.first_name} {member.last_name}    
                    </p>
                })
                }
            </div>
        )
    }
}