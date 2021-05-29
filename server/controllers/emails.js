const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');
const Email = require('../models/Email');
const ErroResponse = require('../utils/errorUtils');

const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const mailersend = new MailerSend({
  api_key: process.env.EMAIL_API_KEY,
});

//* @desc    send email
//* @route   Get /api/v1/email
//* @access  Public

exports.sendVerification = asyncHandler(async (req, res, next) => {

  let emailTest = await Email
  .find({email:req.body.email})  

  console.log(req.body);

  if(emailTest[0]){
    return next(
      new ErroResponse(
        `Email exists`,
        400
      )
    );
  }

  const email = Email.create(req.body);

    const recipients = [
      new Recipient(req.body.email),
    ];
    
    const variables = [
      {
        email: req.body.email,
        substitutions: [
          {
            var: 'email',
            value: req.body.email
          }
        ],
      },
    ];
    

    const emailParams = new EmailParams()
      .setFrom("news@vacalmu.live")
      .setFromName("VACALMU")
      .setRecipients(recipients)
      .setVariables(variables)
      .setSubject("Confirma adresa de email")
      .setTemplateId('o65qngk7xdlwr12z');
    
    
    try {
        mailersend.send(emailParams);
        res.status(200).json({ success: true, data: 'Email sent' });
      } catch (err) {
        console.log(err);
        return next(new ErroResponse('Email could not be sent', 500));
      }
    
});


//* @desc    article email
//* @route   Get /api/v1/email/article
//* @access  Private/Admin

exports.articleEmail = asyncHandler(async (req, res, next) => {

  const article = req.body.article;

  const emails = await Email.find({active: true});

  if(!article){
    return next(
      new ErroResponse(
        `Article do not exists`,
        400
      )
    );
  }

    let recipients = [];
    let variables = [];

    for(let i=0; i<emails.length; i++){
      recipients.push(new Recipient(emails[i].email));
      variables.push({
        email: emails[i].email,
        substitutions: [
          {
            var: 'titlu',
            value: article.title,
          },
          {
            var: 'descriere',
            value: article.description,
          },
          {
            var: 'imgsrc',
            value: article.thumbnail,
          },
          {
            var: 'slug',
            value: article.slug,
          },
          {
            var: 'email',
            value:emails[i].email,
          }
        ],
      },)
    }


    console.log(recipients);

    const emailParams = new EmailParams()
    .setFrom("news@vacalmu.live")
    .setFromName("VACALMU")
    .setRecipients(recipients)
    .setVariables(variables)
    .setSubject(article.title)
    .setTemplateId('jpzkmgqx6v4059v7');
    
    try {
        mailersend.send(emailParams);
        res.status(200).json({ success: true, data: 'Email sent' });
      } catch (err) {
        console.log(err);
        return next(new ErroResponse('Email could not be sent', 500));
      }
    
});



//* @desc    verify email
//* @route   Get /api/v1/email/verify
//* @access  Private/Admin

exports.verifyEmail = asyncHandler(async (req, res, next) => {

  let email = await Email
  .find({email: req.body.email})

console.log(req.body.email);

  if(!email[0]){
    return next(
      new ErroResponse(
        `Email not found`,
        404
      )
    );
  }

  email[0].active = true;

  let newEmail = await Email.findByIdAndUpdate(email[0]._id, email[0], {
    new: true,
    runValidators: true,
  });
  
  res.status(200).json({ success: true, data: newEmail });
});

//* @desc    unsubscribe email
//* @route   Get /api/v1/email/unsubscribe
//* @access  Private/Admin

exports.unsubscibeEmail = asyncHandler(async (req, res, next) => {


  console.log(req.body);

  let newEmail = await Email.find({email: req.body.email});
  console.log(newEmail);
  await Email.findByIdAndDelete(newEmail[0]._id);
  
  res.status(200).json({ success: true, data: newEmail });
});
