// import nodemailer from 'nodemailer'
// import jwt from 'jsonwebtoken'
// import user from '../models/userModel.js'

// export const mailSender =  async() => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: "priyojit@itobuz.com",
//         pass: "xjza wmlg naid qbjg"
//     }
//   })

//   const token = await user.findOne({ email: req.body.email }); 

//   // const token = jwt.sign({
//   //   data: 'Token details'
//   // }, 'good morning', { expiresIn: '10s' })

//   const mailConfiguration = {
//     from: 'Priyojit Kundu',
//     to: 'priyojit@itobuz.com',
//     subject: 'Email Verification',
//     text: `Press the given link to verify => http://localhost:3000/verify/${token}`
//   }

//   transporter.sendMail(mailConfiguration, (error, res) => {
//     if (error)
//       throw new Error("Something went wrong");
//     else {
//       console.log('Email sent successfully')
//       console.log(res)
//     }
//   })
// }