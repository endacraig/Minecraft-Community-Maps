var express = require('express');
var mysql = require('mysql');
var app = express();
var server = app.listen(1337);
app.use(express.static('public'));


var socket = require('socket.io');
var io = socket(server);
console.log('Server is running');

io.sockets.on('connection', newConnection);


var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'Administrator',
	password: 'MrPresident2019',
    database: 'commodities'
})

db.connect(function(err){
    if (err) console.log(err)
})
 

function newConnection(socket) {
	
	console.log('new connection: ' + socket.id);
	
	socket.on('mouse', mouseMsg);
	socket.on('property', propertyMsg);
	socket.on('getallproperties', getAllProperties);
	socket.on('delete', deleteProperty);
	
	function propertyMsg(data) {
		console.log(data);
	
	
	  var sql = "INSERT INTO properties (title, x, y, q, t) VALUES ?";


	  var values = [
		[data.title, data.x,data.y,data.q,data.t]
	  ];
	  
	  

  
	  db.query(sql, [values], function (err, result) {
		if (err) throw err;
		console.log("Number of records inserted: " + result.affectedRows);
	  });
	
		//io.sockets.emit('property',data);
		socket.emit('property', data);
	}
	
	function deleteProperty(data2){
			/*	var data = {
				x: properties[icon_selected_index].x,
				y: properties[icon_selected_index].y,
				q: properties[icon_selected_index].q
			}*/
			
			var sql = "DELETE FROM properties WHERE x = " + data2.x + " AND y = " + data2.y + " AND q = " + data2.q + "";
			console.log("sql query: " + sql);
			db.query(sql);
			io.sockets.emit('reloadproperties',data2);
	}
	
	function getAllProperties(data2){
		
		var properties = [];
		
		db.query('SELECT * FROM properties')
            .on('result', function(data){
                properties.push(data)
            })
            .on('end', function(){
                // Only emit properties after query has been completed
                socket.emit('getallproperties', properties);
            })
	}
	
	function mouseMsg(data) {
		console.log(data);
		

		
		socket.broadcast.emit('mouse',data);
		
	//	connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
	// error will be an Error if one occurred during the query
	// results will contain the results of the query
	// fields will contain information about the returned results fields (if any)
	//});
		
		
	//	connection.query({
  //sql: 'SELECT * FROM `books` WHERE `author` = ?',
  //timeout: 40000, // 40s
  //values: ['David']
//}, function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
//});
		
	//	In order to avoid SQL Injection attacks, you should always escape any user provided data before using it inside a SQL query. You can do so using the mysql.escape(), connection.escape() or pool.escape() methods:

//var userId = 'some user provided value';
//var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
//connection.query(sql, function (error, results, fields) {
  //if (error) throw error;
  // ...
//});


//Getting the id of an inserted row

//If you are inserting a row into a table with an auto increment primary key, you can retrieve the insert id like this:

//connection.query('INSERT INTO posts SET ?', {title: 'test'}, function (error, results, fields) {
 // if (error) throw error;
  //console.log(results.insertId);
//});


//Getting the number of affected rows

//You can get the number of affected rows from an insert, update or delete statement.

//connection.query('DELETE FROM posts WHERE title = "wrong"', function (error, results, fields) {
  //if (error) throw error;
  //console.log('deleted ' + results.affectedRows + ' rows');
//})

//connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
  //if (error) throw error;
  // ...
//});

		
		//con.query('Insert Into Log SET ?',UserLog ,function(err){
        //if(err)
        //    console.log(err);
		//});
		
		//io.sockets.emit('mouse',data); //this will send to all even the client who originally sent the message

	}

}