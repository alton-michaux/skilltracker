import React from 'react'
import TextField from '@mui/material/TextField'

const Search = () => {
  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Search"
      // onSubmit={onSearch()}
      />
    </div>
  )
}

export default Search
