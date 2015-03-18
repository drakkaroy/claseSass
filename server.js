var express = require('express');

var app = express();
var appFortune = require("./lib/fortune");
var appInventory = require("./lib/inventory");

// set up handlebars view engine
var handlebars = require('express3-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.render('home', {title: 'home'});
});
app.get('/home', function(req, res) {
	res.render('home', {
		fortune: appFortune.getFortune(),
		title: 'home'
	});
});
app.get('/about', function(req,res){
	res.render('about', {title:'About'});
});

app.get('/inventory', function(req,res){
	res.render('inventory', {
		title:'inventory',
		inventoryController: 'inventoryController'
	});
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
