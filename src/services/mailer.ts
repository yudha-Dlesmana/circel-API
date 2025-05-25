import nodemailer from 'nodemailer'

export async function sendEmailService(to: string, subject: string, text: string){
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  console.log(user)
  console.log(pass)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    },
  })

  const mailOption = {
    from : `Circle ${user}`,
    to,
    subject,
    text
  };
  
  try{
    const info = await transporter.sendMail(mailOption);  
    console.log('Email sent:', info.messageId)
    return info

  }catch(e){
    console.log("Failed to send email: ", e)
    throw new Error ('')
  }
}