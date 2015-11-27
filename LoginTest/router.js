
function route(pathname,handle,request,response,requestData){
	console.log('about to route a request for '+pathname);
	if (typeof handle[pathname]==='function') {
		return handle[pathname](response,requestData);
	} else{
		console.log('no request handle found for '+pathname);
		response.writeHead(404,{"Content-Type":"text/plain"});
		response.write('404 not found');
		response.end();
	};
}

exports.route = route;