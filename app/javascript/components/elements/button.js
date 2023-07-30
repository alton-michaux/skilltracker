import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green, grey, red } from '@mui/material/colors';
import Button from '@mui/material/Button'
import { styled } from 'styled-components'
import PropTypes from 'prop-types'
import { useAppContext } from '../AppContext';

const SkillTrackerButton = ({ variant, action, children, destination, type, color }) => {
  const { state, dispatch } = useAppContext();

  const loading = state.isLoading;
  const error = state.isError;
  const success = !loading && !error

  const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin: 1rem;
    position: relative;
  `

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    } || error && {
      bgcolor: red[500],
      '&:hover': {
        bgcolor: red[700],
      },
    } || loading && {
      bgcolor: grey[500],
    }
    ),
  };

  return (
    <div className="button-div">
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant={variant}
          color={color}
          onClick={action}
          type={type}
          sx={buttonSx}
          disabled={loading}
        >
          {destination
            ? (
              <StyledLink to={destination}>{children}</StyledLink>
            )
            : (
              children
            )}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </div>
  )
}

SkillTrackerButton.defaultProps = {
  variant: 'contained',
  action: () => { },
  children: 'button',
  destination: '',
  type: 'button',
  color: 'primary'
}

SkillTrackerButton.propTypes = {
  variant: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.string,
  destination: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string
}

export default SkillTrackerButton
