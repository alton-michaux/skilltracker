import { get } from './index';

export const getJiraIssues = () => get('/api/v1/jira_issues');
export const getJiraIssue = (issueId) => get(`/api/v1/jira_issues/${issueId}`);
