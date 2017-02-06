var request = require('request'),
    express = require('express'),
    app     = express();


app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/index", function(req, res){
    var city_name = req.query.city,
        country_name = req.query.country,
        celsius = '&units=metric',
        appi_key = ["\x26\x61\x70\x70\x69\x64\x3D\x66\x66\x33\x64\x32\x39\x65\x32\x33\x61\x39\x31\x63\x64\x31\x62\x39\x38\x30\x37\x31\x33\x33\x30\x32\x38\x32\x66\x35\x36\x36\x66"];
        url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city_name + ',' + country_name + celsius + appi_key;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("index", {data: data});
        }
    });
});

app.get("/index/page2", function(req, res){
    var city_name = req.query.city,
        country_name = req.query.country;
        celsius = '&units=metric',
        appi_key = ["\x26\x61\x70\x70\x69\x64\x3D\x66\x66\x33\x64\x32\x39\x65\x32\x33\x61\x39\x31\x63\x64\x31\x62\x39\x38\x30\x37\x31\x33\x33\x30\x32\x38\x32\x66\x35\x36\x36\x66"];
        url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city_name + ',' + country_name + celsius + appi_key;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var forecast = JSON.parse(body);
            res.render("page2", {data: forecast});
        }
    });
});

app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
})
