# frozen_string_literal: true

Rails.application.config.session_store :cookie_store,
                                       key: '_your_app_session',
                                       expire_after: 300.minutes,
                                       httponly: true,   # Prevent JavaScript access
                                       secure: Rails.env.production?
