"use strict";

/********************************/
// LIBS
/********************************/
const express = require('express'); 
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');

/********************************/
// modules
/********************************/
const BotController = require('./libs/bot/BotController');
const DataBase = require('./libs/data_base/DataBase');
const botParser = require('./libs/bot/messageParser');

/********************************/
// CONFIG
/********************************/
const config = require('./config.json');

/********************************/
// LIBS VARIABLES AND SETTINGS
/********************************/
const dataBase = new DataBase(mongoose);
const app = express(); //server app
const db = mongoose.connection;

/********************************/
// SERVER SETTINGS
/********************************/
app.get('/', function (req, res) {
   res.send(JSON.stringify({
      error: 0,
      data: 'server is ok'
   }));
});

app.get('/message/:whom/:message', (req, res) => {
   const message = req.params.message;
   const whom = req.params.whom;
   sendMessage(req, whom);
   res.send(message);
});

app.use(function(req, res, next) {
   res.status(404).send(JSON.stringify({
      error: 404,
      data: 'invalid request'
   }));
});


/********************************/
// ON SERVER AND MONGO START DONE
/********************************/
function init() {   
   //initing of mongo
   let mongoPromise = new Promise((resolve) => {
      db.once('open', function() {
         console.log('MONGO DB connection opened');
         resolve();
      });

      mongoose.connect(config.mongo.link);
   });

   //initing of server
   let serverPromise = new Promise((resolve) => {
      const server = app.listen(config.server.port || 3000, config.server.host || '0.0.0.0', () => {
         console.log(
            'Server started on', 
            server.address().address + ':' + server.address().port,
            server.address().family
         );
         resolve();
      });
   });

   Promise.all([mongoPromise, serverPromise]).then(() => {
      const botController = new BotController(
         new TelegramBot(config.telegram.botToken, {polling: true}),
         config.telegram.settings,
         botParser
      );

      console.log("APP STARTED");
   });
}

init();