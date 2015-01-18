var smtp = require('smtp-protocol');
var fs = require('fs');
//simulation a mail.
smtp.connect('localhost', 25,
	function(mail) {
		mail.helo('example.com');
		//the mail is sent by
		mail.from('substack@example.com');
		//the mail will send to
		mail.to('a@example.com');
		mail.data();
		//the mail's content. If you want to modify the content. Plz modify the foo.txt file.
		fs.createReadStream('foo.txt').pipe(mail.message());
		mail.quit();
	});
