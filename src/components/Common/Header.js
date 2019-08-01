import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'
import MenuContent from './MenuContent'
export default class Header extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
          menuOpen: false,
        }
    }
  
    openMenu() {
      this.setState({ menuOpen: true })
    }
  
    closeMenu() {
      this.setState({ menuOpen: false })
    }
    handleClick() {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    
    render() {
        return (
            <header>
                <Link to='/dashboard'>
                    <p className='title'>ToDueBy</p>
                </Link>
                <div className='navbar'>
                    <div className='navlinks'>
                        <Link to='/dashboard'>Home</Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </div>
                    <button className='menu-button'>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <HamburgerMenu
                        isOpen={this.state.open}
                        menuClicked={this.handleClick.bind(this)}
                        width={18}
                        height={15}
                        strokeWidth={1}
                        rotate={0}
                        color='black'
                        borderRadius={0}
                        animationDuration={0.5}
                    />
                    <CheeseburgerMenu
                        isOpen={this.state.menuOpen}
                        closeCallback={this.closeMenu.bind(this)}>
                        <MenuContent closeCallback={this.closeMenu.bind(this)}/>
                    </CheeseburgerMenu>
                </div>

            </header>
        )
    }
}

