import React from "react"
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const MatchedSkills = () => {
  const { user_id } = useParams();

  return(
    <div className="text-center">Mathed Skills</div>
  )
}

MatchedSkills.PropTypes = {
  id: PropTypes.number.isRequired
}

export default MatchedSkills