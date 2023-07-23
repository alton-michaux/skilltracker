import { get } from './index';

export const authorizeJiraSession = () => get('/api/v1/jira_sessions/authorize');
export const callbackJiraSession = () => get('/api/v1/jira_sessions/callback');
