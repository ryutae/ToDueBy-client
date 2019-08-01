import React from 'react'
import './MenuContent.css'

export default class MenuContent extends React.Component {
    render() {
        return (
            <section className='menu-content'>
                <h3>Menu</h3>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </section>
        )
    }
}