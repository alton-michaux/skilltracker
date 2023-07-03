import { post, get } from './index';

export const authorizeJiraSession = (formData) => post('/api/v1/jira_sessions/authorize', formData);
export const callbackJiraSession = () => get('/api/v1/jira_sessions/callback');
