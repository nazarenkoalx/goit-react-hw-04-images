import { SearchbarHeader, Form, Field, SearchButton } from './Searchbar.styled';
import { CiSearch } from 'react-icons/ci';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onInputChange = evt => {
    setSearchQuery(evt.target.value.toLowerCase());
  };

  const onSearchSubmit = evt => {
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      return toast('Please, enter your search query and try again!');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
    evt.target.reset();
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={onSearchSubmit}>
        <SearchButton type="submit">
          <CiSearch name="search loop" color="#000" size="40px" />
        </SearchButton>

        <Field
          id={nanoid()}
          name="searchInput"
          type="text"
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </Form>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
