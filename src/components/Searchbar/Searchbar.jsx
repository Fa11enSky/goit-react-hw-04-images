import { Component } from 'react';
import { CiSearch } from 'react-icons/ci';
import {
  SearchFormStyled,
  SearchFormBtn,
  HeaderStyled,
  SpanBtnStyled,
  InputStyled,
} from './Searchbar.styled';
class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = ev => {
    this.setState({ query: ev.target.value });
  };
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.handleSubmit(this.state.query);
  };
  render() {
    return (
      <HeaderStyled>
        <SearchFormStyled onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <CiSearch size={30} />
            <SpanBtnStyled>Search</SpanBtnStyled>
          </SearchFormBtn>

          <InputStyled
            onInput={this.handleInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchFormStyled>
      </HeaderStyled>
    );
  }
}
export default Searchbar;
