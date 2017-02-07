// Importando bibliotecas do NodeJS
var request = require('request'),
    express = require('express'),
    app     = express();

// Definindo a porta que o Express escuratará
app.set('port', (process.env.PORT || 3000));

// Eliminando a necessidade da extensão "ejs" na hora de importar arquivos
app.set('view engine', 'ejs');

// Declarando diretório que contém os arquivos estáticos
app.use(express.static(__dirname + "/public"));

// Função que gera a pagina Home
app.get("/", function(req, res){
    res.render("home");
});

// Função que gera a pagina Index, contendo as informações de tempo atuais
app.get("/index", function(req, res){
    var city_name = req.query.city,
        country_name = req.query.country,
        // definindo base de medição em Celsius
        celsius = '&units=metric',
        // chave de segurança
        appi_key = ["\x26\x61\x70\x70\x69\x64\x3D\x66\x66\x33\x64\x32\x39\x65\x32\x33\x61\x39\x31\x63\x64\x31\x62\x39\x38\x30\x37\x31\x33\x33\x30\x32\x38\x32\x66\x35\x36\x36\x66"];
        // link da API
        url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city_name + ',' + country_name + celsius + appi_key;
        // função que faz a requisição da url
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // armazenando os dados obtidos da pagina 
            var data = JSON.parse(body);
            res.render("index", {data: data});
        }
    });
});

// Função que gera a pagina Page2, contendo as informações de tempo para os próximos dias
app.get("/index/page2", function(req, res){
    var city_name = req.query.city,
        country_name = req.query.country,
        // definindo base de medição em Celsius
        celsius = '&units=metric',
        // chave de segurança
        appi_key = ["\x26\x61\x70\x70\x69\x64\x3D\x66\x66\x33\x64\x32\x39\x65\x32\x33\x61\x39\x31\x63\x64\x31\x62\x39\x38\x30\x37\x31\x33\x33\x30\x32\x38\x32\x66\x35\x36\x36\x66"];
        // link da API
        url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city_name + ',' + country_name + celsius + appi_key;
        // função que faz a requisição da url
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // armazenando os dados obtidos da pagina
            var forecast = JSON.parse(body);
            res.render("page2", {forecast: forecast});
        }
    });
});

// Função que direciona o aplicativo para a porta definida no inicio do programa
app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
})
