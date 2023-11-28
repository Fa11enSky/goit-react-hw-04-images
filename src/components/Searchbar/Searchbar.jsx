import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import {
  SearchFormStyled,
  SearchFormBtn,
  HeaderStyled,
  SpanBtnStyled,
  InputStyled,
} from './Searchbar.styled';
const Searchbar = ({ toSubmit }) => {
  const [query, setQuery] = useState('');
  const handleInput = ev => {
    setQuery(ev.target.value);
  };
  const handleSubmit = ev => {
    ev.preventDefault();
    toSubmit(query);
  };
  return (
    <HeaderStyled>
      <SearchFormStyled onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <CiSearch size={30} />
          <SpanBtnStyled>Search</SpanBtnStyled>
        </SearchFormBtn>

        <InputStyled
          onInput={handleInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchFormStyled>
    </HeaderStyled>
  );
};

export default Searchbar;
