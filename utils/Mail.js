const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const sendmail = async (mailData) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      },
    })
  );

  await transporter.sendMail(
    mailOptions(mailData.email, mailData.password),
    async function (error, info) {
      if (error) {
        console.log("error is here");
        console.log(error);

        return {
          status: 502,
          msg: "something went wrong while sending mail",
        };
      } else {
        return {
          status: 200,
        };
      }
    }
  );
};

const mailOptions = (email, password) => {
  return {
    from: "sameer.soni.demo@gmail.com",
    to: email,
    subject: "login Credentials for Sameer's Server",
    html: `<body style="font-family: sans-serif;
        background-color: #d8dbdb;
        font-size: 18px;
        max-width: 700px;
        margin: 0 auto;
        padding: 2%;
        color: #565859;
        ">
       
   
   
        <div class="one-col" style="margin-top: -5px;">
        
        <p class="contact">
       pls find your username and password

       username: ${email}
       password: ${password}
        </p>
        </div>
        
        </body>`,
  };
};

module.exports = {
  sendmail,
};
