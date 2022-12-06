// let express = require('express');

// let app = express();

// app.use(express.static(__dirname + '/dist/black-dashboard-angular'));

// app.get('/*', (req, resp) => {
//         resp.sendFile(__dirname + '/dist/black-dashboard-angular/index.html');
//         app.listen(process.env.PORT || 8085);
//     })
const express = require('express');

const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/vuexy'));

app.get('/*', function(req, resp) {
    resp.sendFile(path.join(__dirname + '/dist/vuexy/index.html'));
});

app.listen(process.env.PORT || 8085);