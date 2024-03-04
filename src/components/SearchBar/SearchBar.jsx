import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Please input valid query!');
      return;
    }
    onSubmit(query);
    setQuery('');
  }

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <FiSearch size="20px" />
        </button>

        <input
          className={css.input}
          placeholder="Search images and photos"
          name="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
          autoFocus
        />
      </form>
    </header>
  );
};

export default SearchBar;
