
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , fs = require('fs');

var app = express();
var mongoSessionConnectURL = "mongodb://localhost:27017/AdAnalyticsPlatform";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressSession({
	secret: 'cmpe295',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/users", express.static(__dirname + '/public'));
app.use("/users/ad-planning-wizard", express.static(__dirname + '/public'));
app.use("/users/ad-recommendation", express.static(__dirname + '/public'));
app.use("/platform", express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/redirect/login', routes.redirectLogin);
app.get('/users/login', routes.renderLogin);
app.post('/login', routes.login);

app.get('/redirect/register', routes.redirectRegister);
app.get('/users/register', routes.renderRegister);
app.post('/register', routes.register);

app.get('/users/:username', routes.home);
app.get('/users/history/:username', routes.history);

app.get('/users/ad-planning-wizard/:username', routes.adForm);
app.post('/users/ad-planning-wizard/:username', routes.submitAdForm);

app.get('/users/ad-recommendation/:username', routes.renderAdPlan);

app.get('/platform/:name',function(req,res){
	var platformName = req.params.name;
	if(platformName == "youtube")
		res.render('youtube');
	else if(platformName == "facebook")
		res.render('facebook');
	else if(platformName == "linkedin")
		res.render('linkedin');
	else if(platformName == "twitter")
		res.render('twitter');
	else if(platformName == "google")
		res.render('google');
});


//connect to the mongo collection session and then createServer
mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});