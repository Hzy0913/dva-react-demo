var http = require('http')
  , exec = require('exec')

const PORT = 4389
  , PATH = '../music'

var deployServer = http.createServer(function(request, response) {
  if (request.url.search(/musicpull\/?$/i) > 0) {

    var commands = [
      'cd ' + PATH,
      'git pull'
    ].join(' && ')
    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      response.writeHead(200)
        console.log("触发indexpull2")
    })
  } else {

    response.writeHead(404)
    response.end('Not Found.')

  }
})

deployServer.listen(PORT)
