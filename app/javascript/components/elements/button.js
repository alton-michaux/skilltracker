import React from 'react'
import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import Button from '@mui/material/Button';
import { styled } from 'styled-components'
import PropTypes from 'prop-types'

const SkillTrackerButton = ({ variant, action, children, destination, type, color }) => {
  const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin: 1rem;
    position: relative;
  `

  return (
    <div className="button-div">
      <Button
        variant={variant}
        color={color}
        onClick={action}
        type={type}
      >
        {destination
          ? (
          <StyledLink to={destination}>{children}</StyledLink>
            )
          : (
              children
            )}
      </Button>
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
