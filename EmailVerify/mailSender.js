import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars'

export const mailSender = async (token) => {
    console.log(token);
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "priyojit@itobuz.com",
        pass: "kjwj bbqd bgke ndym",
      },
    });

    transporter.use('compile', hbs({
      viewEngine: {
          extname: '.hbs',
          layoutsDir: './template',
          defaultLayout: false,
          partialsDir: './template',
      },
      viewPath: './template',
      extName: '.hbs'
  }));

  
    const mailConfiguration = {
      from: 'Priyojit Kundu',
      to: 'priyojit@itobuz.com',
      subject: 'Email Verification',
      template: 'email',
      context: {
        token : `${token}`
      }
    };

  
    transporter.sendMail(mailConfiguration, (error, res) => {
      if (error) 
      {
        console.log(error);
        
      }
      else {
        console.log("Email sent successfully");
        console.log(res);
      }
    });
  };