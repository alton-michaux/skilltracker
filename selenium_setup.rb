require 'selenium-webdriver'

# Specify the path to chromedriver
Selenium::WebDriver::Chrome::Service.driver_path = '/usr/bin/chromedriver'

# Create a new instance of the WebDriver using Chrome
driver = Selenium::WebDriver.for :chrome
