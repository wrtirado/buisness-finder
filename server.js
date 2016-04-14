// creating all my variables
var
  express     = require('express'),
  app         = express(),
  bodyParser  = require('body-parser'),
  logger      = require('morgan'),
  cors        = require('cors'),
  path        = require('path'),
  port        = process.env.PORT || 8080,
  // apiRoutes   = require('./api_routes'),
  mongoose    = require('mongoose'),
  databaseURL = "mongodb://localhost:27017/testUsers"


app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, './client-side/public')))

app.listen(port, function(err){
  if(err) console.log(err)
  console.log('Server running on port: ', port);
})
