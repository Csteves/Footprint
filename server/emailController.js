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
        const {sender,receiver,subject,message} = req.body;
        let mailOptions = {
            from: `Foot-print.net <recycle@foot-print.net>`, // sender address
            to: receiver, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: template(sender,receiver,subject,message) // html body
          };

          let info = await transporter.sendMail(mailOptions)
          if(info.messageId){
              res.status(200).send({message:"Email sent successfully"})
          }else{
              res.status(200).send({message:'Unable to send email'})
          }

    },

}

const template = function (sender,receiver,subject,message){
    return ( `
    <h2>${subject}</h2>
    <h4>Message:</h4>
    <p>${message}</p>
    <p> Thank you for joining <a href="https://foot-print.net">Foot-print.net!</a></p>
    <p>Regards,</p>
    <p>${sender}</p>
    `)
}

