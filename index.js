const express = require('Express'),
    dealerData = require('./dealers.json'),
    port = 8080,
    app = express();

/* Start Express */
app.listen(port);
console.log('Express listening on port: ' + port);

/* CORS setup */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/dealerData', (req, res) => {
    res.send(dealerData);
});