require 'capybara/rspec'
require 'webdrivers/chromedriver'
require 'selenium/webdriver'

RSpec.configure do
  # variable to check if environment is heroku or local
  chrome_bin = ENV.fetch('GOOGLE_CHROME_SHIM', nil)

  Capybara.run_server = true

  # Capybara.server = :puma
  Capybara.default_driver = :selenium_chrome
  # append an identifier to each port for parallel testing
  Capybara.server_port = 8888
  # set the wait time for safe capybara matchers to allow elements to appear on page
  Capybara.default_max_wait_time = 5

  Webdrivers.cache_time = 320
  # this controls the amount of time the server is allowed before TCPsocket closes
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.read_timeout = 180 # seconds

  # see webdriver_info.md for help if chrome is not located in binary location
  options = Selenium::WebDriver::Chrome::Options.new
  options.binary = "/usr/bin/chromedriver"

  # this checks whether tests are currently running locally or in heroku and assigns a binary if running locally
  chrome_opts = chrome_bin ? {} : { "chromeOptions" => { "binary" => options.binary } }
  # this stores specific driver arguments depending on whether or not in headless mode

  args = %w[disable-gpu window-size=1280,1024 headless]

  options = Selenium::WebDriver::Chrome::Options.new(args: args)

  Capybara.register_driver :chrome do |app|
    Capybara::Selenium::Driver.new(
      app,
      browser: :chrome,
      options: options, # use options instead of args https://www.selenium.dev/selenium/docs/api/rb/Selenium/WebDriver/Chrome/Options.html#initialize-instance_method
      # capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(chrome_opts),
      http_client: client
    )
  end
  # based on debug mode, :chrome driver will either run headless or not
  Capybara.javascript_driver = :chrome
end
