import PropTypes from 'prop-types';

// import css from './PhoneBook.module.scss';

const ContactsList = ({ contacts, removeContact }) => {
  const contactsList = contacts.map(({ id, name, number }) => (
    <li key={id}>
      {name} {number}
      <button
        type="button"
        onClick={() => removeContact(id)}
      >
        delete
      </button>
    </li>
  ));

  return <ul>{contactsList}</ul>;
};

export default ContactsList;

ContactsList.defaultProps = { contacts: [] };

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};
