import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './MyBooks.module.scss';

class MyBooks extends Component {
  state = {
    items: [
      {
        id: nanoid(),
        title: 'Worm',
        author: 'Джон Маккрей',
      },

      {
        id: nanoid(),
        title: 'Girl genius',
        author: 'Foglio',
      },
    ],
    title: '',
    author: '',
  };

  removeBook(id) {
    this.setState(({ items }) => {
      const newBooks = items.filter(item => item.id !== id);
      return { items: newBooks };
    });
  }

  addBook = event => {
    event.preventDefault();
    this.setState(prevState => {
      const { title, author, items } = prevState;
      const newBook = {
        id: nanoid(),
        title,
        author,
      };
      return { items: [...items, newBook] };
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { addBook, handleChange } = this;

    const { items } = this.state;
    const books = items.map(({ id, title, author }) => (
      <li key={id}>
        {title} Author: {author}
        <button
          onClick={() => this.removeBook(id)}
          type="button"
        >
          delete
        </button>
      </li>
    ));

    return (
      <div>
        <h3>My Books</h3>
        <div className={css.wrapper}>
          <div className={css.block}>
            <h4>Add book</h4>
            <form
              action=""
              onSubmit={addBook}
            >
              <div className={css.formGroup}>
                <label htmlFor="">Book title</label>
                <input
                  name="title"
                  onChange={handleChange}
                  placeholder="Book title"
                  type="text"
                  // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor="">Book author</label>
                <input
                  name="author"
                  onChange={handleChange}
                  placeholder="Book author"
                  type="text"
                  // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                />
              </div>

              <button type="submit">Add book</button>
            </form>
          </div>
          <div className={css.block}>
            <div className={css.formGroup}>
              <label htmlFor="">Filter books</label>
              <input
                placeholder="Filter books"
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </div>

            <ul>{books}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MyBooks;
