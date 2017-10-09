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

//var rows;

connection.query('SHOW DATABASES', function(err, results, fields){
	if(err){
		console.log("invalid query" + err);
	} else {
//		console.log(results);
		results.forEach(showTables);
	}
});


iterateDatabases = function(row, index){


	var row;
	var database = row.Database;
	console.log(database);

	connection.query("USE " + database + ";", function(err, results, fields){

		if (err){
			console.log("issue switching databases " + err);
		} else {
		
//			console.log(results);
			(showTables);
		}
//	connection.query("SHOW TABLES;", function(err, results, fields){
//		if(err){
//			console.log("issue with tables query: " + err);
//		} else {
//			console.log("At line 38, database = " + database);
//			console.log(results);
//			console.log(fields);
		//	results.forEach(describeTable, database);
			
//		}
	
//	})}
	})
}

showTables = function(database, index){
	var db = database.Database;
	connection.query("SHOW TABLES IN " + db + ";", function(err, results, fields){
		if(err){
			console.log("Issue showing tables " + err);
		} else {
			results.forEach(describeTable, db);
		}
	})
}

describeTable = function(table, index){
//console.log("Got to line 58 ");
//console.log(fields);
	//for(j = 0; j < tables.length; j++){
	var name = "Tables_in_" + this;
	var tableName = table[name];
//	console.log(table);
//	console.log("Database = " + this + " table = " + tableName);
	//var db = fields[0].db;
	//console.log("Line 65 database = " + db + " table = " + table);
	
	connection.query("DESCRIBE " + this + "." + tableName + ";", function(err, results, fields){
		if(err){
			console.log("Issue describing table " + err);
		} else {
			console.log(tableName);
			console.log(results);
		}
	})
}

//connection.close();

console.log("All done");











