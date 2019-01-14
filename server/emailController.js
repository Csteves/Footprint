const nodemailer = require("nodemailer");
const {EMAIL_PASS,EMAIL_ADD} = process.env;
const transporter = nodemailer.createTransport( {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_ADD, // generated ethereal user
      pass: EMAIL_PASS // generated ethereal password
    }
});


module.exports = {
    sendEmail: async (req, res) =>{
        const {sender,user,subject,message} = req.body;
        let mailOptions = {
            from: `Support Team <recycle@foot-print.net>`, // sender address
            to: user, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: template(sender,user,subject,message) // html body
          };

          let info = await transporter.sendMail(mailOptions)
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          if(info.messageId){
              res.status(200).send({message:"Email sent successfully"})
          }else{
              res.status(200).send({message:'Unable to send email'})
          }

    }

}

const template = function (sender,user,subject,message){
    return ( `
    <p>@${user}</p>
    <h3>${subject}</h3>
    <h3>Message</h3>
    <p>${message}</p>
    <p> Thank you for joining <a href="foot-print.net">Footprint!</a></p>
    <p>${sender}</p>
    `)
}

