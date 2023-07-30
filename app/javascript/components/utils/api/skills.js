import { get, post, destroy } from './index'

export const getSkills = () => get('/api/v1/skills')
export const createSkill = (formData) => post('/api/v1/skills', formData)
export const deleteSkill = (skillId) => destroy(`/api/v1/skills/${skillId}`)
