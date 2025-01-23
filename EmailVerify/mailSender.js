import nodemailer from "nodemailer";

export const mailSender = async (token) => {
    console.log(token);
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "priyojit@itobuz.com",
        pass: "xjza wmlg naid qbjg",
      },
    });

  
    const mailConfiguration = {
      from: "Priyojit Kundu",
      to: "priyojit@itobuz.com",
      subject: "Email Verification",
      text: `Press the given link to verify => http://localhost:3000/verify/${token}`,
    };
  
    transporter.sendMail(mailConfiguration, (error, res) => {
      if (error) throw new Error("Something went wrong");
      else {
        console.log("Email sent successfully");
        console.log(res);
      }
    });
  };