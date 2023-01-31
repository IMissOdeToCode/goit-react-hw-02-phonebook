import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

// import PropTypes from 'prop-types';

import css from './PhoneBook.module.scss';

class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const q = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(q);
  }

  addContact = event => {
    event.preventDefault();
    console.log('click');
    this.setState(prevState => {
      const { contacts, name, number } = prevState;

      if (this.isDublicate(name)) {
        return Notiflix.Notify.failure('name already exists');
      }
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      console.log(newContact);
      return { contacts: [...contacts, newContact], name: '', number: '' };
    });
  };

  removeContact(id) {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);

      return { contacts: newContacts };
    });
  }

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
    const { addContact, handleChange } = this;

    const { name, number } = this.state;
    const contacts = this.getFilteredContacts();

    const contactsList = contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name} {number}
        <button
          type="button"
          onClick={() => {
            this.removeContact(id);
          }}
        >
          delete
        </button>
      </li>
    ));

    return (
      <div>
        <div className={css.block}>
          <h2>Phonebook</h2>
          <form onSubmit={addContact}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
              //   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />

            <label htmlFor="number">Number</label>
            <input
              id="number"
              value={number}
              onChange={handleChange}
              type="tel"
              name="number"
              //   pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <button type="submit">Add contact</button>
          </form>
        </div>

        <div className={css.block}>
          <label htmlFor="filter">Find contscts by name</label>
          <input
            id="filter"
            onChange={handleChange}
            type="text"
            name="filter"
          />
          <h2>Contacts</h2>
          <ul>{contactsList}</ul>
        </div>
      </div>
    );
  }
}

export default PhoneBook;
