import React from "react"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { styled } from "styled-components";
import PropTypes from 'prop-types';

const SkillTrackerButton = ({ variant, action, children, destination }) => {
  const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

  return (
    <Button
      variant={variant}
      onClick={action ? action : ""}
    >
      <StyledLink
        to={destination ? destination : "/"}
      >{children}
      </StyledLink>
    </Button>
  );
}

SkillTrackerButton.defaultProp = {
  variant: "primary",
  action: "",
  children: "button",
  destination: ""
}

SkillTrackerButton.propTypes = {
  variant: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.string,
  destination: PropTypes.string
}

export default SkillTrackerButton;
