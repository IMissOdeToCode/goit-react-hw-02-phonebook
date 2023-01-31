import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import ContactsList from './ContactsList';
import ContactsFilter from './ContsctsFilter';
import ContactsForm from './ContactsForm';

import contacts from './contacts';

import css from './PhoneBook.module.scss';

class PhoneBook extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const q = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(q);
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      Notiflix.Notify.failure('name already exists');
      return false;
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [...contacts, newContact] };
    });

    return true;
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);

      return { contacts: newContacts };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const contacts = this.getFilteredContacts();
    const isContacts = Boolean(contacts.length);

    return (
      <div>
        <div className={css.block}>
          <h1>Phonebook</h1>
          <ContactsForm onSubmit={addContact} />
        </div>

        <div className={css.block}>
          <h2>Contacts</h2>
          <ContactsFilter handleChange={handleFilter} />

          {isContacts && (
            <ContactsList
              contacts={contacts}
              removeContact={removeContact}
            />
          )}
          {!isContacts && <p>No contacts in list</p>}
        </div>
      </div>
    );
  }
}

export default PhoneBook;
