import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'
import MenuContent from './MenuContent'
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
          menuOpen: false,
        }
    }

    static contextType = UserContext
  
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

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.setUserLoggedInFalse()
    }
      
    renderLogoutLinkAndMenuButton() {
        return (
            <div className='navbar_links'>
                <li className='header_link'><Link to='/dashboard'>Home</Link></li>
                <li className='header_link'>
                <Link
                onClick={this.handleLogoutClick}
                to='/'>
                Logout
                </Link>
                <div className='menu_button'>
                    <HamburgerMenu 
                    isOpen={this.state.menuOpen}
                    menuClicked={this.handleClick.bind(this)}
                    width={18}
                    height={15}
                    strokeWidth={1}
                    rotate={0}
                    color='white'
                    borderRadius={0}
                    animationDuration={0.5}
                    />
                </div>
                    <CheeseburgerMenu
                        isOpen={this.state.menuOpen}
                        closeCallback={this.closeMenu.bind(this)}>
                        <MenuContent closeCallback={this.closeMenu.bind(this)}/>
                    </CheeseburgerMenu>
            </li>
        </div>
        
        )
    }
      
    renderLoginLink() {
        return (
        <>
            <li className='header_link'><Link to='/login'>Login</Link></li>
            <li className='header_link'><Link to='/register'>Register</Link></li>
        </>
        )
    }
    
    render() {
        return (
            <header>
                <div className='title_wrapper'>
                    <Link to='/dashboard'>
                        <p className='header_title'>ToDueBy</p>
                    </Link>
                </div>
                <nav className='navbar'>
                    <ul>
                        {TokenService.hasAuthToken()
                        ? this.renderLogoutLinkAndMenuButton()
                        : this.renderLoginLink()}
                    </ul>
                </nav>
            </header>
        )
    }
}

