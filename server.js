var http = require('http');
var qs = require('querystring');


var port = Number(process.env.PORT || 3000);


var server = http.createServer(function (req, res) {

    var headers = {};

    // set header to handle the CORS
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Headers'] = 'access-control-allow-origin';    // Add this if required: Content-Type, Content-Length, Authorization, Accept, X-Requested-With
    headers['Access-Contrl-Allow-Methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
    headers["Access-Control-Max-Age"] = '86400';
    res.writeHead(200, headers);


    if ( req.method === 'OPTIONS' ) {
        console.log('Preflight OPTIONS request successful');
        res.end();
    }

    else if(req.method == 'POST'){
        console.log("Received POST request");
        var body = '';
        req.on('data', function(data){
        	body += data;	
        });
        req.on('end', function(){
            if(qs.parse(body)['text']){                                         //'text' is the field name that should be used
    	    if(qs.parse(body)['text'].toString().trim().length != 0){
                    var post_data = qs.parse(body)['text'].toString();
                    var uppercase_for_post = post_data.toUpperCase();
                    res.end(uppercase_for_post);
                }
            }
                res.end("Something went wrong");
        });
    }

    else{
        return res.end("Not a POST Request");
    }
});

server.listen(port);
