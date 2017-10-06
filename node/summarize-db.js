var  credentials = require('./credentials.json');

var mysql = require("mysql");

credentials.host = "ids";
var connection = mysql.createConnection(credentials);

connection.connect(function(err){
	if(err){
		console.log("Problems with MySQL: " + err);
	} else {
		console.log("Connected to Database");
	}
});

var rows;

connection.query('SHOW DATABASES', function(err, results, fields){
	if(err){
		console.log("invalid query" + err);
	} else {
		console.log("hello world".indexOf("o"));
		iterateDatabases(results);
	}
});

iterateDatabases = function(rows){

for (i = 0; i < rows.length; i++){
	var first = rows[i].indexOf("'");
	var last = rows[i].lastIndexOf("'");
	var database = rows[i].substring(first, last + 1);
	console.log(database);
	connection.query("USE " + database + ";", function(err, results, fields){
		if(err){
			console.log("Issue switching databases: " + err);
		} else {
			console.log("Now using " + database);
		}
	})
	connection.query("SHOW TABLES;", function(err, results, fields){
		if(err){
			console.log("issue with tables query: " + err);
		} else {
			for(result in results){
				describeTable(result.Table);
			}
		}
	
	})
}
}

describeTable = function(table){

	connection.query("DESCRIBE " + table + ";", function(err, results, fields){
		if(err){
			console.log("Issue describing table " + err);
		} else {
			console.log(results);
		}
	})
}














