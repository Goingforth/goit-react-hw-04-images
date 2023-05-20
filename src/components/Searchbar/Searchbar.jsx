import { toast } from 'react-toastify';
import {
  SearchbarHead,
  SearchForm,
  SearchFormButton,
  Input,
  ButtonLabel,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

const { Component } = require('react');

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ searchQuery: value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter a search topic !');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <>
        <SearchbarHead>
          <SearchForm onSubmit={this.handleSubmit}>
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
              value={this.state.searchQuery}
              onChange={this.handleChange}
            />
          </SearchForm>
        </SearchbarHead>
      </>
    );
  }
}
export default Searchbar;
