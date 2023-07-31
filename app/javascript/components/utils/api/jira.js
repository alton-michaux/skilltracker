import { URLFunctions } from '.'

const jiraAPI = () => {
  const { get } = URLFunctions()

  const authorizeJiraSession = () => get('/api/v1/jira_sessions/authorize')
  const callbackJiraSession = () => get('/api/v1/jira_sessions/callback')
  const getJiraIssues = () => get('/api/v1/jira_issues')
  const getJiraIssue = (issueId) => get(`/api/v1/jira_issues/${issueId}`)

  return {
    authorizeJiraSession,
    callbackJiraSession,
    getJiraIssues,
    getJiraIssue
  }
}

export default jiraAPI
