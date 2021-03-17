import './ContactDetailsPage.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { contactService } from '../../services/ContactService'
import { getContactById, deleteContact } from '../../store/actions/contactActions';
import { loadUser, addMove } from '../../store/actions/userActions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TransferFund from '../../cmps/TransferFund'
import MoveList from '../../cmps/MovesList'
class ContactDetailsPage extends Component {

    async componentDidMount() {
        this.loadContact()
        await this.props.loadUser();
    }

    async loadContact() {
        const { contactId } = this.props.match.params
        if (contactId) {
            await this.props.getContactById(contactId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.contactId !== this.props.match.params.contactId) {
            this.loadContact()
        }
    }

    deleteContact = async () => {
        const { contactId } = this.props.match.params
        await this.props.deleteContact(contactId)
        this.props.history.push('/contacts');
    }

    transferFund = async (fund) => {
        const move = {
            toId: this.props.contact._id,
            to: this.props.contact.name,
            amount: fund,
            at: Date.now(),
        };
        await this.props.addMove(move);
        await this.props.loadUser();
    };

    onNextContact = () => {
        const { contact } = this.props
        const nextContactId = contactService.getNextContactId(contact._id)
        this.props.history.push(`/contact/${nextContactId}`)
    }

    onPrevContact = () => {
        const { contact } = this.props
        const prevContactId = contactService.getPrevContactId(contact._id)
        this.props.history.push(`/contact/${prevContactId}`)
    }

    render() {
        const { user } = this.props
        const { contact } = this.props
        if (!user || !contact) return <div>Loading...</div>
        return (
            <section className="contact-details-page flex justify-center">
                <div className="contact-details-container flex space-between column">
                    <div className="contact-details flex column">
                        <img src={contact.imgUrl} alt="contact-img" />
                        <span>Id: {contact._id}</span>
                        <span>Name: {contact.name}</span>
                        <span>E-mail: {contact.email}</span>
                        <span>Phone: {contact.phone}</span>
                    </div>
                    <div className="btns-section">
                        <div className="crus-btns">
                            <NavLink to="/contacts">Back</NavLink>
                            <NavLink key={contact._id} to={`/contact/edit/${contact._id}`}>Edit</NavLink>
                            <button className="btn" onClick={this.deleteContact}>Delete</button>
                        </div>
                        <div className="next-prev-btns flex">
                            <button className="btn flex align-center" onClick={this.onPrevContact}><FontAwesomeIcon className="fa-icon prev" icon={faArrowLeft} />Prev</button>
                            <button className="btn flex align-center" onClick={this.onNextContact}>Next<FontAwesomeIcon className="fa-icon next" icon={faArrowRight} /></button>
                        </div>
                    </div>
                </div>
                <section className="transfer-section">
                    <TransferFund
                        maxCoins={user.coins}
                        transferFund={this.transferFund}
                        contactName={contact.name}
                    />
                    <MoveList moves={user.moves} contactId={contact._id} isInContact={true} />
                </section>
            </section>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        contact: state.contactReducer.contact,
        user: state.userReducer.user
    };
};

const mapDispatchToProps = {
    getContactById,
    deleteContact,
    loadUser,
    addMove
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsPage);