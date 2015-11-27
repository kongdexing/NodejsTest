var http = require('http');
var url = require('url');
//var redis = require("redis");

var helloServer = {
	start:function(route,handle){
		var helloserver = http.createServer(function(request,response){
			console.log('request received~');
			var pathname = url.parse(request.url).pathname;
			console.log('request pathname '+pathname);
			var method = request.method.toLowerCase();
			console.log('request method '+method);
			request.setEncoding('utf-8');
			
			if (method=='post') {
				var requestData = '';
				request.addListener('data',function(data){
					requestData+=data;
					console.log('request post data '+requestData);
				});

				request.addListener('end',function(){
					var content = route(pathname,handle,request,response,requestData);
				});
			} else if (method=='get'){
				var params = url.parse(request.url,true).query;
				console.log('request get data '+params.toString());
				route(pathname,handle,request,response,params);
			};
			
		});

		helloserver.listen(8888);
		console.log('server has started~');
	}
}

module.exports = helloServer;