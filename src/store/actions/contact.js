// actions
import * as actionTypes from './actionsTypes';
import axios from 'axios';
import axiosInstance from '../../axios-contacts';
const source = axios.CancelToken.source();

export const contactCreate = (contact) => {
  return {
    type: actionTypes.CONTACT_CREATE,
    contactData: contact
  };
};

//async
export const processContactCreate = (contact, callback) => {
  return (dispatch) => {
    axiosInstance
      .post('/contacts.json', contact)
      .then((response) => {
        dispatch(
          contactCreate({
            id: response.data.name,
            name: contact.name,
            lastname: contact.lastname,
            contactnumbers: contact.contactnumbers,
            emails: contact.emails
          })
        );
        callback();
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  };
};

export const contactDelete = (id) => {
  return { type: actionTypes.CONTACT_DELETE, contactData: { id: id } };
};

//async
export const processContactDelete = (id) => {
  return (dispatch) => {
    axiosInstance.delete(`/contacts/${id}.json`).then((response) => {
      console.log(response);
      dispatch(contactDelete(id));
    });
  };
};

export const contactUpdate = (
  { name, lastname, contactnumbers, emails },
  id
) => {
  return {
    type: actionTypes.CONTACT_UPDATE,
    contactData: {
      id: id,
      name: name,
      lastname: lastname,
      contactnumbers: contactnumbers,
      emails: emails
    }
  };
};
//async
export const processContactUpdate = (contact, id, callback) => {
  console.log('UPDATTTTTTING: ', contact);
  return (dispatch) => {
    axiosInstance
      .put(`/contacts/${id}.json`, contact)
      .then((response) => {
        console.log('UPDATTTTTTING THEN...: ', contact);
        console.log(response);
        dispatch(contactUpdate(contact, id));
        callback();
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  };
};

//fetching contacts

export const fetchContactsStart = () => {
  return {
    type: actionTypes.FETCH_CONTACTS_START
  };
};

export const fetchContactsSuccess = (contacts) => {
  return {
    type: actionTypes.FETCH_CONTACTS_SUCCESS,
    contacts: contacts
  };
};

export const fetchContactsFail = (error) => {
  return {
    type: actionTypes.FETCH_CONTACTS_FAIL,
    error: error
  };
};

export const fetchContactsCancel = () => {
  source.cancel('Operation cancelled by the user.');
  console.log('REQUEST CANCELLED!!!');
  return {
    type: actionTypes.FETCH_CONTACTS_CANCEL
  };
};

// async constant
export const fetchContacts = () => {
  return (dispatch) => {
    dispatch(fetchContactsStart());
    axiosInstance
      .get('/contacts.json', { cancelToken: source.token })
      .then((response) => {
        console.log('RESPONSE', response);

        //this step is so we can add ID to the object
        const fetchedContacts = [];
        for (let key in response.data) {
          fetchedContacts.push({ ...response.data[key], id: key });
        }
        console.log('fetched contacts: ', fetchedContacts);
        dispatch(fetchContactsSuccess(fetchedContacts));
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled ', err.message);
        }
        dispatch(fetchContactsFail(err));
      });
  };
};
