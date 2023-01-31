import { Component } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState';

class ContactsForm extends Component {
  state = { ...initialState };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const result = onSubmit({ ...this.state });
    if (result) {
      this.reset();
    }
  };

  reset() {
    this.setState({ ...initialState });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { name, number } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
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
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactsForm;

ContactsForm.propTypes = { onSubmit: PropTypes.func.isRequired };
