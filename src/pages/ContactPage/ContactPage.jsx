import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadContacts } from '../../store/actions/contactActions'
import ContactList from '../../cmps/ContactList';
import ContactFilter from '../../cmps/ContactFilter';
import './ContactPage.scss'

export default function ContactPage() {

    const [filterBy, setFilterBy] = useState(null)

    const contacts = useSelector(state => state.contactReducer.contacts)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadContacts(filterBy))
    }, [filterBy])

    const onSetFilter = (filterBy) => {
        setFilterBy(filterBy)
    }

    return (
        <div className="contact-page flex column align-center">
            <div className="contacts-control flex">
                <ContactFilter onSetFilter={onSetFilter} />
                <NavLink className="add-contact" to="contact/edit">Add Contact</NavLink>
            </div>
            {contacts && <ContactList contacts={contacts} />}
        </div>
    )
}

// import './ContactPage.scss'
// import { React, Component } from 'react'
// import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { loadContacts } from '../../store/actions/contactActions'
// import  ContactList  from '../../cmps/ContactList';
// import  ContactFilter  from '../../cmps/ContactFilter';

// class ContactPage extends Component {
//     state = {
//         filterBy: null
//     }
//     componentDidMount() {
//         this.props.loadContacts()
//     }

//     loadContacts = async () => {
//         this.props.loadContacts(this.state.filterBy)
//     };

//     onSetFilter = (filterBy) => {
//         this.setState({ filterBy }, this.loadContacts)
//     }

//     render() {
//         const { contacts } = this.props
//         return (
//             <div className="contact-page flex column align-center">
//                 <div className="contacts-control flex">
//                     <ContactFilter match={this.props.match} onSetFilter={this.onSetFilter} />
//                     <NavLink className="add-contact" to="contact/edit">Add Contact</NavLink>
//                 </div>
//                 {contacts && <ContactList contacts={contacts} />}
//             </div>
//         )
//     }
// }


// const mapStateToProps = (state) => {
//     return {
//         contacts: state.contactReducer.contacts,
//     };
// }

// const mapDispatchToProps = {
//     loadContacts
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

