import { URLFunctions } from '.'

const SkillAPI = () => {
  const { get, post, destroy } = URLFunctions()

  const getSkills = () => get('/api/v1/skills')
  const searchSkills = () => get('/api/v1/sills/search')
  const createSkill = (formData) => post('/api/v1/skills', formData)
  const deleteSkill = (skillId) => destroy(`/api/v1/skills/${skillId}`)
  const matchedSkills = (userId) => get(`/api/v1/users/${userId}/user_skills`)

  return {
    getSkills,
    searchSkills,
    createSkill,
    deleteSkill,
    matchedSkills
  }
}

export default SkillAPI
