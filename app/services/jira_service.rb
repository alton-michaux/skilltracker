# frozen_string_literal: true

class JiraService
  def initialize(jira_client)
    @jira_client = jira_client
  end

  def create_session(access_token, access_secret)
    # Save the access token and secret to the session or a database for future use if needed
    # For OAuth 2.0, you don't need to create a new session with request_token and request_secret.
    # Instead, you directly get the access token and secret after the user authorizes the app.
    {
      access_token: access_token,
      access_key: access_secret
    }
  end

  def authorization_url(redirect_uri)
    # The URL to which the user should be redirected to authorize the application.
    @jira_client.auth_code.authorize_url(redirect_uri: redirect_uri)
  end

  def fetch_access_token(params, redirect_uri)
    # Exchange the authorization code for an access token
    access_token = @jira_client.auth_code.get_token(params[:code], redirect_uri: redirect_uri)
    {
      access_token: access_token.token,
      access_secret: '' # For OAuth 2.0, there is no access secret, leave it blank or nil.
    }
  end

  def delete_session(session)
    session.delete(:jira_auth)
  end
end
