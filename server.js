var http = require('http');
var qs = require('querystring');


var port = Number(process.env.PORT || 3000);


var server = http.createServer(function (req, res) {
    if (req.method != 'POST') return res.end('Not a POST request.\n');

    req.setEncoding("utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.writeHead(200, {'Content-Type': 'text/html'});

    console.log("Connected");
//    var uppercase_data = '';
//    var uppercase_for_post = '';
    var body = '';
    req.on('data', function(data){
    	body += data;
//    	uppercase_data = data.toUpperCase();
//    	console.log(uppercase_data);	
    });
    req.on('end', function(){
        if(qs.parse(body)['text']){                                         //'text' is the field name that should be used
	    if(qs.parse(body)['text'].toString().trim().length != 0){
                var post_data = qs.parse(body)['text'].toString();
                var uppercase_for_post = post_data.toUpperCase();
                res.end(uppercase_for_post);
            }
        }
        else{
            res.end("Something went wrong");
        }

    });
//    console.log("Request End");
});

server.listen(port);
