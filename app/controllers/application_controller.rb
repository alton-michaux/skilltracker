# frozen_string_literal: true

require 'oauth2'
require 'jira-ruby'

class ApplicationController < ActionController::Base
  include FormAuth

  attr_accessor :current_user, :client

  rescue_from JIRA::OauthClient::UninitializedAccessTokenError do
    redirect_to new_jira_session_url
  end

  def not_found
    render component: 'routes/NotFound', status: 404
  end

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end

  private

  def parse_response(response)
    JSON.parse(response.body)
  end

  def auth_string(client_id, state, token, scopes, redirect)
    "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=#{client_id}&scope=#{CGI.escape(scopes)}&redirect_uri=#{redirect}&state=#{state}&response_type=code&prompt=consent&_csrf=#{token}"
  end

  def handle_csrf
    @csrf_token = form_authenticity_token

    request.headers['X-CSRF-Token'] = @csrf_token

    @csrf_token
  end

  def base_url
    "https://api.atlassian.com/ex/jira/#{session[:cloud_id]}"
  end

  def session_params
    params.permit(:code, :state)
  end

  def user_params
    params.permit(:user_id)
  end

  def fetch_current_user
    @current_user = User.find(user_params['user_id'])
  end

  def fetch_session
    @session = params[:jira_session]
  end
end
