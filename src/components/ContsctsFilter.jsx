import PropTypes from 'prop-types';

const ContactsFilter = ({ handleChange }) => (
  <div>
    <label htmlFor="filter">Find contacts by name</label>
    <input
      id="filter"
      onChange={handleChange}
      type="text"
      name="filter"
    />
  </div>
);
export default ContactsFilter;

ContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
