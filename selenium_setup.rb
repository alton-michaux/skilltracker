# frozen_string_literal: true

require 'selenium-webdriver'

# Specify the path to chromedriver
Selenium::WebDriver::Chrome::Service.driver_path = '/usr/bin/chromedriver'

# Create a new instance of the WebDriver using Chrome
Selenium::WebDriver.for :chrome
