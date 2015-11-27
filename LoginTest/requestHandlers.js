var exec = require('child_process').exec;
var querystring = require("querystring");
var fs = require('fs');
var formidable = require("formidable");

function registe(request,response){
	console.log('request handler registe was called');

	var body ='<html>'+
	    '<head>'+
	    '<meta http-equiv="Content-Type" content="text/html; '+
	    'charset=UTF-8" />'+
	    '</head>'+
	    '<body>'+
	    '<form action="/upload" enctype="multipart/form-data" method="post">'+
	    '<textarea name="text" rows="20" cols="60"></textarea>'+
	    '<input type="file" name="upload" multiple="multiple">'+
	    '<input type="submit" value="Submit text/upload file" />'+
	    '</form>'+
	    '</body>'+
	    '</html>';

	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

function login(request,requestData){
	// exec('ls -lah',function(error, stdout, stderr){
	// 	response.writeHead(200,{"Content-Type":"text/plain"});
	// 	response.write(stdout);
	// 	response.end();
	// });
	
	if (JSON.parse(requestData).username==='abc'&&
		JSON.parse(requestData).userpwd==='123') {
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write("login success");
	} else{
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write("login failed");
	};
	response.end();
}

function sum(response,requestData){
	var a = parseInt(requestData.a);
	var b = parseInt(requestData.b);

	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write((a+b).toString());
	response.end();
}

function show(response,requestData){
	fs.readFile('./danza.jpg','binary',function(error,file){
		if (error) {
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error +"\n");
			response.end();
		} else{
			response.writeHead(200,{"Content-Type":"image/jpg"});
			response.write(file,'binary');
			response.end();
		};
	});
}

function upload(response,requestData){
	console.log('request handler upload was called');
	// response.writeHead(200,{"Content-Type":"text/plain"});
	// response.write("You've sent the text: "+querystring.parse(requestData).text);
	// response.end();
	var form =new formidable.IncomingForm();
	  console.log("about to parse");
	  form.parse(requestData,function(error, fields, files){
	    console.log("parsing done");
	    fs.renameSync(files.upload.path,"/home/kongdexing/work/nodejs/LoginTest/banza.jpg");
	    response.writeHead(200,{"Content-Type":"text/html"});
	    response.write("received image:<br/>");
	    response.write("<img src='/show' />");
	    response.end();
	  });
}

exports.registe = registe;
exports.login = login;
exports.upload = upload;
exports.show = show;
exports.sum = sum;
