import React from "react"
import Button from 'react-bootstrap/Button';

const SkillTrackerButton = ({variant, action, children}) => {
  return (
    <Button 
      variant={variant}
      onClick={action}
    >{children}</Button>
  );
}

export default SkillTrackerButton;
