const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.ethereal.email",
    secure: true,  // set true for ptoduction
    auth: {
        user: process.env.EMAIL_USER || 'cecelia.windler72@ethereal.email',
        pass: process.env.EMAIL_PASS || 'DVsDvRNkjekDXGG13J',
    },
});

async function otpSender(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: `"Let's Code" 
            <${process.env.EMAIL_USER}>`
            ,
            to,
            subject,
            text,
            html,
        });
        // console.log("Send Successfully...");
        return { success: true, info };
    }
    catch (err) {
        // console.log(err);
        return { success: false, error: err };
    }

}

module.exports = { otpSender };