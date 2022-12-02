const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/vuexy-admin-template'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/vuexy-admin-template/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 2020);