var nodemailer = require('nodemailer');
module.exports.sendEmail = function(name,mail) {
    var str ="";
    var transporter = nodemailer.createTransport({
        //'1und1','AOL','DynectEmail','FastMail','Gmail',l'Godaddy','GodaddyAsia','GodaddyEurope','hot.ee','Hotmail','iCloud','mail.ee','Mail.ru','Mailgun','Mailjet','Mandrill','Postmark','QQ','QQex','SendCloud','SendGrid','SES','Yahoo','Yandex','Zoho'
        service: 'Gmail',
        auth: {
            user: 'amailforteststh@gmail.com',
            pass: 'Smtp123!haha>.'
        }
    });
    for (var i = 1; i < mail.length ; i++) {
        str =str + mail[i]+"\r\n";
    };
    console.log(str);
    var mailOptions = {
        from: 'amailforteststh@gmail.com',
        // sender address
        to: name,
        // list of receivers
        subject: 'Hello',
        // Subject line
        text: str,
        // plaintext body
        html: str // html body 
    };
    transporter.sendMail(mailOptions,
        function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
}