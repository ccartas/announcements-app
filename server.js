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
    users.find({email : request.body.username, password: request.body.password}, function(err, result){
        if(err) console.log(err)
        response.json(result)
    })
})

app.post('/create', function(request, response){
    var data = {name: request.body.name, user: request.body.user, title: request.body.title, content: request.body.content};
    announcements.insert(data, function(err, result){
        if(err) console.log(err)
        response.json(result)
    })
})
app.get('/get-announcements', function(request,response){
    announcements.find({}).then(function(data){
        response.json(data)
    })
})
app.post('/user-announcement', function(request, response){
    announcements.find({user: request.body.user}).then(function(data){
        response.json(data);
    })
})

app.put('/edit-announcement', (request,response) => {
    announcements.update({ _id: request.body.id },
   {
     $set: {
       title: request.body.title,
       content: request.body.content
     }
   }).then(data => {
        response.json(data)
   }).catch(error => {
        console.log(error)
   })
})

app.put('/delete-announcement', (request,response) => {
    announcements.remove({_id: new mongo.ObjectId(request.body.id)}).then(data => {
        response.json(data)
    }).catch(error => {
        console.log(error)
    })
})
app.listen("9090")
