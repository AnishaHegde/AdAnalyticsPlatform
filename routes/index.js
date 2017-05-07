var mongo = require("./mongo");
var mongourl = "mongodb://localhost:27017/AdAnalyticsPlatform";

var kafka = require('kafka-node'),
Producer = kafka.Producer,
client = new kafka.Client(),
producer = new Producer(client);

producer.on('ready', function () {
	console.log("Producer is ready");
});

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.redirectLogin = function(req,res){
	console.log("inside redirect login");
	res.send({'statusCode':'200'});
};

exports.renderLogin = function(req,res){
	console.log("inside render login page");
	res.render('login');
};

// Post login
exports.login = function(req,res){
	console.log("inside login");

	var email = req.param("email");
	var pass = req.param("pass");

	console.log(email +" is the email");
	console.log(pass +" is the password");

	var json_responses;

	mongo.connect(mongourl, function(){
		console.log('Connected to mongo at: ' + mongourl);
		var coll = mongo.collection('users');

		coll.findOne({email: email, password:pass}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.

				req.session.email = user.email;
				req.session.fname = user.fName;
				req.session.lname = user.lName;

				console.log(req.session.email + " and " + req.session.fname +" is in the session");

				json_responses = {"statusCode" : 200, "fname" : user.fName};
				res.send(json_responses);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};

exports.redirectRegister = function(req,res){
	console.log("inside redirect register");
	res.send({'statusCode':'200'});
};

exports.renderRegister = function(req,res){
	console.log("inside render register page");
	res.render('register');
};

// Post register
exports.register = function(req,res){

	//console.log(req);

	var fname = req.param('fName');
	var lname  = req.param('lName');
	var email = req.param('email');
	var password = req.param('pass');
	var phone = req.param('phone');
	var street = req.param('street');
	var city = req.param('city');
	var state = req.param('state');
	var zipcode = req.param('zipcode');

	mongo.connect(mongourl, function() {
		var json_responses;
		var coll = mongo.collection('users');
		var user_details = {"fName" : fname, "lName" : lname, "email" : email, "password" : password, "phone" : phone, "address" : {"street" : street, "city" : city, "state" : state, "zipcode" : zipcode}};

		coll.insert(user_details, function(err,results){
			if(err){
				console.log("ERROR: "+err);
				json_responses = {"statusCode" : 401};
				//callback(null, json_responses);
				res.send(json_responses);
			}
			else
			{
				json_responses = {"statusCode" : 200};
				//callback(null, json_responses);
				res.send(json_responses);
			}
		});
	});
};


exports.home = function(req,res){
	var fullName = req.session.fname + " " + req.session.lname;
	res.render('home', {'fullName': fullName, 'email':req.session.email});
};

exports.history = function(req,res){

	mongo.connect(mongourl,function(){
		console.log('Connected to mongo at: ' + mongourl);
		var email = req.session.email;

		var coll = mongo.collection('users');

		coll.find({email: email}).toArray(function(err,rows){
			if(rows)
			{
				console.log("User Data: " + rows[0]);
				res.send({'statusCode':'200', 'userdata':rows[0]});
			}
			else
			{
				res.send({'statusCode':'401'});
			}
		});
	});
};


exports.adForm = function(req,res){
	res.render('adForm');
};

exports.submitAdForm = function(req,res){

	req.body.email = req.session.email;
	console.log("Form body");
	console.log(req.body);
	var data = JSON.stringify(req.body);

	var payloads = [
	{ topic: 'productDetails_kafka_queue', messages: data, partition: 0 },
	];

	producer.send(payloads, function(err, data){
		console.log(data);
	});

	res.send({"statusCode":"200"});
};

exports.renderAdPlan = function(req,res){
	res.render('adPlan');
};

//producer 'on' ready to send payload to kafka.
/*var payloads = [
         { topic: 'test', messages: 'This is the First Message I am sending', partition: 0 },
     ];
 producer.on('ready', function(){
     producer.send(payloads, function(err, data){
          console.log(data);
     });
 });

 producer.on('error', function (err) {
      console.log(err);
 });
*/