require('dotenv').config();

const express = require('express');
const proxy = require('http-proxy');

const app = express();

const forwarder = proxy.createProxyServer();

app.post('/api/kintone/webhook/callback', (req, res, next) => {
  forwarder.web(req, res, {
    target: 'http://localhost:1111'
  }, next);
});

app.listen(process.env.PORT, () => {
  console.log("Listen and forward requests to another server...");
});