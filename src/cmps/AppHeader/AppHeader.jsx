import './AppHeader.scss'
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { eventBus } from '../../services/eventBusService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class _AppHeader extends Component {

    state = {
        user: null,
        isMenuOpen: false
    }

    componentDidMount() {
        eventBus.on('user loggedIn', (user) => {
            if (user) this.setState({ user })
        })
    }

    toggleNav = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    render() {
        const { user } = this.state
        let profileLink;
        if (user) {
            profileLink = <NavLink className="profile" key={user._id} to="/userProfile">Profile</NavLink>
        } else {
            profileLink = null
        }
        // if(!user) return <div>Loading...</div>
        return (
            <section className="app-header">
                <div className="nav-container flex align-center space-between container">
                    <button onClick={this.toggleNav} className="bars">
                        <FontAwesomeIcon className="fa-icon" icon={faBars} />
                    </button>
                    <nav className={"nav-bar flex align-center " + (this.state.isMenuOpen ? "showen" : null)}>
                        <NavLink to="/" className="main-title">Mr Bitcoin</NavLink>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/contacts">Contacts</NavLink>
                        <NavLink to="/statistics">Statistic</NavLink>
                    </nav>
                    <div className="login-section flex align-center space-between">
                        {profileLink}
                        <NavLink to="/signup" className="get-started">Get Started</NavLink>
                    </div>
                </div>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)
