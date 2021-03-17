import { contactService } from '../../services/ContactService';

export function loadContacts(filterBy) {
    return async (dispatch) => {
        try {
            const contacts = await contactService.getContacts(filterBy);
            dispatch({ type: 'SET_CONTACTS', contacts });
        }
        catch (err) {
            console.error('Can not load contacts!');
        }
    }
}

export function getContactById(id) {
    return async (dispatch) => {
        try {
            const contact = await contactService.getContactById(id);
            dispatch({ type: 'SET_CONTACT', contact });
        }
        catch (err) {
            console.error('Can not set contact!', err);
        }
    }
}


export function saveContact(contact) {
    return async dispatch => {
        try {
            const isEdit = contact._id ? true : false;
            contact = await contactService.saveContact(contact);
            if (isEdit) dispatch({ type: 'UPDATE_CONTACT', contact })
            else dispatch({ type: 'ADD_CONTACT', contact })
            return contact;
        }
        catch (err) {
            console.error('Can not save contact!', err);

        }
    }
}


export function deleteContact(id) {
    return async dispatch => {
        try {
            await contactService.deleteContact(id);
            dispatch({ type: 'REMOVE_CONTACT', id })
        }
        catch (err) {
            console.error('Can not delete contact!', err);
        }
    }
}