import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { styled } from "styled-components";
import PropTypes from 'prop-types';

const SkillTrackerButton = ({ variant, action, children, destination, type }) => {
  const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin: 1rem;
    position: relative;
  `;

  return (
    <>
      <Button
        variant={variant}
        onClick={action}
        type={type}
      >
        {destination ? (
          <StyledLink to={destination}>{children}</StyledLink>
        ) : (
          children
        )}
      </Button>
    </>
  );
}

SkillTrackerButton.defaultProps = {
  variant: "primary",
  action: () => { },
  children: "button",
  destination: "",
  type: "button"
}

SkillTrackerButton.propTypes = {
  variant: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.string,
  destination: PropTypes.string,
  type: PropTypes.string
}

export default SkillTrackerButton;
