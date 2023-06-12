const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendMail = asyncHandler(
  async (data,req,res) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.email.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MP, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: '"Hey 👻" <abc@gmail.com.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.htm, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
  }
)

module.exports = sendMail;