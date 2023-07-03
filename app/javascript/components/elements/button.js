import React from "react"
import Button from 'react-bootstrap/Button';

const SkillTrackerButton = ({variant, children}) => {
  return (
    <Button variant={variant}>{children}</Button>
  );
}

export default SkillTrackerButton;
