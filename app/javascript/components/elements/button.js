import React from "react"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const SkillTrackerButton = ({ variant, action, children, destination }) => {
  return (
    <Button
      variant={variant}
      onClick={action ? action : ""}
    >
      <Link
        to={destination}
      >{children}
      </Link>
    </Button>
  );
}

export default SkillTrackerButton;
