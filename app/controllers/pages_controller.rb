# frozen_string_literal: true

class PagesController < ApplicationController
  def home
    render component: 'Home', props: {}
  end
end
