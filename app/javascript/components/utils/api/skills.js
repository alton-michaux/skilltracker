import { URLFunctions } from "."

const skillAPI = () => {
  const { get, post, destroy } = URLFunctions();
  
  const getSkills = () => get('/api/v1/skills')
  const createSkill = (formData) => post('/api/v1/skills', formData)
  const deleteSkill = (skillId) => destroy(`/api/v1/skills/${skillId}`)

  return {
    getSkills,
    createSkill,
    deleteSkill
  }
}

export default skillAPI;
