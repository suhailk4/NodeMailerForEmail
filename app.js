const express=require('express');
const app=express();
const path=require('path');
const nodemailer=require('nodemailer');
const ejs=require('ejs');

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));

app.use('/public',express.static(path.join(__dirname,'/public')));


app.get('/',(req,res)=>{
    res.render('contact');
});
app.post('/send',(req,res)=>{


const output=`
    <p>You have a new Contact Request </p>
    <h3> Contact Details </h3>
    <ul>
        <li>Name: ${req.body.name} </li>
        <li>Company : ${req.body.company} </li>
        <li>Email: ${req.body.email} </li>
        <li>Phone: ${req.body.phone} </li>
    </ul> 
        <h3> Message </h3>
        <p> ${req.body.message}</p>
    `;
 

    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: account.user, // generated ethereal user
    //       pass: account.pass // generated ethereal password
    //     }
    //   });



      let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure:false,
        port:25,
        auth: {
               user: 'kemaihere@gmail.com',
               pass: 'passwordhere'
           },
        tls:{
               rejectUnauthorized:false
        }
       });

      let mailOptions = {
        from: '"Nodemailer Contact" <kemaihere@gmail.com>', // sender address
        to: 'kemaihere@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
    // const mailOptions = {
    //     from: 'k4suhail414@email.com', // sender address
    //     to: 'k4suhail414@email.com', // list of receivers
    //     subject: 'Subject of your email', // Subject line
    //     html: output// plain text body
    //   };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log('Message was sent');
        res.render('contact', {
            msg:'Email has been sent'
        });
    });
 }) ;

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is up on PORT ${port}`);
});