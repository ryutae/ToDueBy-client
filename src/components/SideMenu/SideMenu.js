import React from 'react'
import './SideMenu.css'
import MenuContent from '../Common/MenuContent';

export default class SideMenu extends React.Component {
  render() {
    return (
        <section className='side-menu'>
            <MenuContent />
        </section>
    )
  }
}
