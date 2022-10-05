import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function Searchbar({ submit }) {
  const [searchImageName, setSearchImageName] = useState('');

  const handleImageChange = ({ currentTarget: { value } }) => {
    setSearchImageName(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchImageName.trim() === '') {
      return toast.error('What picture do you need?');
    }

    submit(searchImageName);
    setSearchImageName('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchImageName}
          onChange={handleImageChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};
