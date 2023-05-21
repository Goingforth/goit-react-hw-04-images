import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarHead,
  SearchForm,
  SearchFormButton,
  Input,
  ButtonLabel,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt => {
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search topic !');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
      <SearchbarHead>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <FaSearch size={22} />
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>
          <Input
            type="text"
            name="searchQuery"
            autocomplete="off"
            autoFocus={true}
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchbarHead>
    </>
  );
};

export default Searchbar;
