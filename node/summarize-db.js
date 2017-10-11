var  credentials = require('./credentials.json');

var mysql = require("mysql");

credentials.host = "ids";
var connection = mysql.createConnection(credentials);

//num_tables keeps track of how many tables there are total
//table_count keeps track of how many tables we've already looped through
var num_tables = 0;
var table_count = 0;

connection.connect(function(err){
	if(err){
		console.log("Problems with MySQL: " + err);
	} else {
		console.log("Connected to Database");
	}
});

//First query the mysql for a list of databases we have access to
connection.query('SHOW DATABASES', function(err, results, fields){
	if(err){
		console.log("invalid query" + err);
	} else {
		//Iterate through each database
		results.forEach(showTables);
	}
});

//Then query for a list of what tables that database contains
showTables = function(database, index){
	var db = database.Database;
	connection.query("SHOW TABLES IN " + db + ";", function(err, results, fields){
		if(err){
			console.log("Issue showing tables " + err);
		} else {
			//Update how many tables there are for each database
			num_tables = num_tables + results.length;
			//iterate through the list of tables
			results.forEach(describeTable, db);
		}
	});
};

//describe each table
describeTable = function(table, index){
	var name = "Tables_in_" + this;
	var tableName = this + "." + table[name];
	var db = this.toString();
	connection.query("DESCRIBE " + tableName + ";", function(err, results, fields){
		if(err){
			console.log("Issue describing table " + err);
		} else {
			//Only want to print the database name once
			if(index == 0){
				console.log(db);
			}

			console.log("......" + tableName);

			//Loop through the list of columns, printing them out in an
			//easily understandable format
			for(i = 0; i < results.length; i++){
				console.log("	FieldName: " + results[i].Field +
					"    " + results[i].Type);
			}

			//add 1 to table_count to show that 1 more table has been processed
			//If we're done, time to close the connection
			table_count++;	
			if(done()){
				connection.end();
				console.log("All done!");
			}
		}
	});
};

//If we have iterated over as many tables as we have access to or more, returns true
//Returns false otherwise.
done = function(){
	return num_tables <= table_count;
}







