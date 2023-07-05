import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./search.scss";

const Search = ({setSearch}) => {
  return (
    <div className='search'>
        <SearchIcon className='icon'/>
        <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)}/>
    </div>
  )
}

export default Search