var path = require('path'); 
var spawn = require('child_process').spawn; 
var iconv = require('iconv-lite'); 
var cmd = spawn('venus.js'); 
iconv.extendNodeEncodings(); 
cmd.stdout.setEncoding('euckr'); 
var body = ''; 
var str_err = null; 
cmd.stdout.on('data', function(chunk){ 
	body += chunk.toString('euckr'); 
}); 
cmd.stderr.on('data', function(err) {
if(str_err === null) { 
	str_err = ''; 
} 
str_err += err.toString('euckr'); 
}
); 
cmd.on('close', function(code) { if (code != 0) { 
	console.log('Failed: ' + code); 
	console.log(str_err); 
	} else { 
		console.log(body); 
		}
});