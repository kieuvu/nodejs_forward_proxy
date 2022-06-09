require('dotenv').config();

const express = require('express');
const proxy = require('http-proxy');

const app = express();

const forwarder = proxy.createProxyServer();

app.get('/', (req, res, next) => {
  res.send('hello');
});

const targets = ['http://localhost:2222', 'http://localhost:3331'];

app.post('/api/kintone/webhook/callback', (req, res, next) => {
  try {
    targets.forEach((target) => {
      forwarder.web(req, res, {
        target: target
      }, next);
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`[${process.env.PORT}]: Listen and forward requests to another server...`);
});