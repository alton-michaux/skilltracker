# frozen_string_literal: true

class JiraService
  def initialize(jira_client)
    @jira_client = jira_client
  end

  def create_session(request_token, request_secret)
    access_token = @jira_client.set_request_token(request_token, request_secret)
    {
      access_token: access_token.token,
      access_key: access_token.secret
    }
  end

  def delete_session(session)
    session.data.delete(:jira_auth)
  end
end
