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

  def request_token_set(session)
    request_token = @jira_client.set_request_token(
      session[:request_token], session[:request_secret]
    )
  end

  def access_token_set(session, params)
    access_token = @jira_client.init_access_token(
      :oauth_verifier => params[:oauth_verifier]
    )
  end

  def delete_session(session)
    session.data.delete(:jira_auth)
  end
end
