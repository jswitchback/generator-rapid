group :development do
  gem 'guard-compass'
  gem 'terminal-notifier-guard'

  notification :terminal_notifier

  guard :livereload do
    watch(%r{.+\.(css|js|html|php?)$})
  end

  if File.exists?("./config.rb")
    # Compile on start.
    puts `compass compile --time --quiet`
    guard :compass do
      watch(%r{(.*)\.s[ac]ss$})
    end
  end
end