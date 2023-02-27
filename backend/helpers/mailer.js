const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const {OAuth2}= google.auth;
const oauth_link = "https://developers.google.com/oauthplayground"
const {EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET}= process.env;



const auth = new OAuth2(
    MAILING_ID,
    MAILING_SECRET,
    MAILING_REFRESH,
    oauth_link
);


exports.sendVerificationEmail=(email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });
    
    const accessToken = auth.getAccessToken();
    const stmp = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAUTH2",
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        }
    });
    const  mailOptions = {
        from: EMAIL,
        to: email, 
        subject:"Kitpat Account Verification",
        html:`<body style="background-color: #192824; padding: 10px 30px;">
        <h1 style="font-size:50px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:white;">KITPAT</h1>
        <span style="font-size:18px; color:white; font-family: monospace;"><b>Activate your KitPat account.</b></span>
        <div style="color: white; font-weight: bolder; font-size: 15px; font-family:monospace; margin-top:10px;">Hi ${name}, Welcome to KitPat</div>
        <div style=" color: white; font-weight: bolder; font-size: 15px; font-family: monospace;margin-top:10px;" >You recently created an account in Kitpat. To complete your registration, please activate your account.This will verify your email address, and then you’ll officially be a part of the Kat community.</div>
        <div style="margin-top: 15px; font-family: monospace;">
        <a style="border: 6px solid transparent; background-color:rgb(0, 238, 255); border-radius: 8px; text-decoration: none; color: rgb(0, 0, 0);" href=${url}>Verify your Account</a>
       </div>
       <hr style="margin-top: 15px;" />
       <div style=" color: orange; font-weight: bolder; font-size: 15px; font-family: monospace; margin-top:20px; " >
        ${name}, we dont want this to be just another Verify account mail. 
       </div>
       <div style=" color: rgb(255, 255, 255); font-weight: bolder; font-size: 15px; font-family: monospace; margin-top:10px; " >
        So we have prepared something just for you , we argue you to 
       </div>
       <div style=" color: rgb(255, 255, 255); font-weight: bolder; font-size: 15px; font-family: monospace; margin-top:2px; " >
        take 5 minutes out and read this special message we wanted to share with you. 🙏
       </div>
       <div style=" font-size: 16px; border-radius: 16px;font-family: monospace; color: white; margin-top: 15px; max-width: 800px; width: auto; height:auto;" >
        <p style="color:white ;">Life gives us infinite options. We have an unlimited number of opportunities to do anything we want, only that's not always how we see life .People are very one dimensional in terms of the life they live. And that's a part of life I've always been very intrigued, by how we <b style="color:orange ;" >intentionally restrict and limit our reality</b>. Why to cookie color expectations of how things should be? Why is that more important than a life of meaning?</p>
        <p style="color:white ;">
        To put them into context , I'm talking about <b style="color:orange;" >people who hate their jobs, but rationalized by saying they're building a resume</b>,for people scared <b style="color:orange;">to move out of relationships they aren't happy with</b>. People I know right now <b style="color:orange;">in law school don't even want to be lawyers</b>. These folks are <b style="color:orange;">sleepwalking zombies </b>, they've settled. My question is, is maintaining individuality that difficult and scary, that you live everyday unfulfilled so that you can proudly proclaim that you fit into the bland average norms that you've decided or acquired. Look, I completely understand the safety of pursuing a path that will socially validate your existence in the short term.<b style="color:orange;">You jumped on the first train you saw</b>, it's the train everyone is jumping on. You're comfortable with the destination, right? This just provide the illusion that you must be on the right track and it would be if it weren't for that burning question that always reveals itself in times of constraint and unhappiness. What if ,<b style="color:orange;">what if you did things differently?</b></p>
         
         <p style="color:white ;">
         So now <b style="color:orange;">you're on this train with everyone else. All going somewhere you don't really want to go</b>, together bragging about it. And maybe you just wonder, what would have happened if you waited, what if you took another train? What if you weren't so  worried about <b style="color:orange;">fitting into these black and white expectations</b>, really seems ridiculous to do what you want and the truth is,<b style="color:orange;">it takes balls, It takes courage</b> to let these trains go by one by one and wait for yours , so I believe that your train is on its way. There's no proof that it is ,there's no message everything's gonna work out. There is no safety guarantee. That's why so many people jump on that first train(average and mediocre train). To be different- to be great, start by looking to people who have done great things. They all have the same message. Believe in yourself. Trust your ability. It's not hidden message. It's not a message that is hard to find. You just have to want to find it. Steve Jobs talks about believing that the dots are going to connect in your future driving towards something without proof. Muhammad Ali says he never feared his opponents because he had faith in his ability over everyone else's. Richard Branson says that fulfilling lives are only for those brave enough to find them, their messages are exactly the same. <b style="color:orange;"> Trust your ability</b>. I don't think any of these guys would be caught dead on the first train.</p>
         
         <p style="color:white ;">
         Look, things generally work out. If you have the mindset. If you have the work ethic, you're already ahead of 90% of the world. bet on yourself. If you follow the crowd, you get lost in the crowd. Just because validation(success) isn't right in front of you, doesn't mean it's not coming. Believe that its coming. Know that it is ,be okay with <b style="color:orange;"> taking the last train home. That is the train you want, that is the experience worth waiting for.</b>
     </p>
        
     </div>
     </body>`
    };
    stmp.sendMail(mailOptions, (err,res)=>{
        if(err)return err;
        return res;
    })
}




exports.sendResetCode=(email, name, code) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });
    
    const accessToken = auth.getAccessToken();
    const stmp = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAUTH2",
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        }
    });
    const  mailOptions = {
        from: EMAIL,
        to: email, 
        subject:"Kitpat Account Recovery",
        html:`<body style="background-color: #192824; padding: 10px 30px;">
        <h1 style="font-size:50px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:white;">KITPAT</h1>
        <span style="font-size:18px; color:white; font-family: monospace;"><b>Kitpat Account Recovery.</b></span>
        <div style="color: white; font-weight: bolder; font-size: 15px; font-family:monospace; margin-top:10px;">Hi ${name}, Recover your KitPat account</div>
        <div style=" color: white; font-weight: bolder; font-size: 15px; font-family: monospace;margin-top:10px;" >Use the reset password code below to recover your account. Make sure to set a strong password.</div>

        <p style="margin-top: 15px; font-family: monospace; font-size: 25px; color: white;" >${code}</p>
       </body>`
    };
    stmp.sendMail(mailOptions, (err,res)=>{
        if(err)return err;
        return res;
    })
}
