/**
 * Created by cosmincartas on 1/5/17.
 */
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongo = require('mongodb')
var monk = require('monk')

var db = monk("localhost:27017/announcementsdb")
var users = db.get('users')
var announcements = db.get('announcements')

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static(__dirname+"/client"))

app.post('/register', function(request, response){
    var data = {name: request.body.name, email: request.body.username, password: request.body.password}
    users.insert(data, function(err, result){
        if(err) console.log(err)
        response.json(result);
    })
})
app.post('/login', function(request, response){
    console.log(request.body.username + request.body.password)
    users.find({email : request.body.username, password: request.body.password}, function(err, result){
        if(err) console.log(err)
        response.json(result)
    })
})
app.listen("9090")
