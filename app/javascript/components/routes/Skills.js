import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
// import { useAppContext } from '../AppContext'
// import SkillAPI from '../utils/api/skills'

const Skills = () => {
  // const { state, dispatch } = useAppContext()
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log('User ID from URL:', id);
    }
  }, [id]);

  const { getSkills } = SkillAPI()

  return (
    <div className="text-center">Skills</div>
  )
}

export default Skills
