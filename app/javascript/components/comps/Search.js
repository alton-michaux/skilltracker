import React from 'react'
import { useAppContext } from '../AppContext'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import PropTypes from 'prop-types'

const Search = ({ label }) => {
  const { fetchSkills } = useAppContext()

  const onSearch = (event) => {
    event.preventDefault()
    fetchSkills(event.target[0].value)
  }
  return (
    <form
      onSubmit={(e) => { onSearch(e) }}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label={label}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: 'blue' }} />
      </IconButton>
    </form>
  )
}

Search.defaultProps = {
  label: 'Search'
}

Search.propTypes = {
  label: PropTypes.string
}

export default Search
