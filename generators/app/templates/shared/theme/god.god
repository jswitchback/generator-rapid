God.watch do |w|
  w.name = File.basename(Dir.getwd)
  w.dir = './'
  w.start = 'bundle exec guard -i'
  w.log = "/tmp/" + w.name + ".log"
  w.keepalive
end