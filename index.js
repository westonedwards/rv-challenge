const express = require('express'),
    dealerData = require('./dealers.json'),
    port = 8081,
    app = express(),
    cors = require('cors');

app.use(cors());

app.get('/dealerData', (req, res) => {
    res.send(dealerData);
});

/* Start Express */
app.listen(port);
console.log('Express listening on port: ' + port);