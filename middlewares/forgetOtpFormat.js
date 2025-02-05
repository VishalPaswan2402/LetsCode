module.exports.forgetOtpFormat = (username, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="    https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Acme&family=Charm:wght@400;700&family=Comic+Neue:wght@700&family=DM+Serif+Display&family=Edu+NSW+ACT+Foundation:wght@400..700&family=Exo:ital,wght@0,100..900;1,100..900&family=Gochi+Hand&family=Jersey+25&family=Kalam:wght@300;400;700&family=Lora:ital,wght@0,400..700;1,400..700&family=Lugrasimo&family=Macondo&family=Monoton&family=Oleo+Script:wght@400;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Protest+Revolution&family=Protest+Riot&family=Roboto+Slab:wght@100..900&family=Satisfy&family=Sedgwick+Ave+Display&family=Song+Myung&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet">
        <link
            href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&family=DM+Serif+Display&family=Lora:ital,wght@0,400..700;1,400..700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Protest+Revolution&family=Roboto+Slab:wght@100..900&family=Song+Myung&display=swap"
            rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <style>
            .card {
                background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
                margin: 10px auto;
                border: 2px solid black !important;
                border-radius: 10px !important;
            }
    
            .paddings {
                padding-right: 10px;
                padding-left: 10px;
            }
    
            .data {
                align-items: center;
                text-align: center;
            }
    
            .otpDiv {
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: space-evenly;
                background-color: rgb(251, 216, 249);
                color: black;
            }
    
            .top {
                font-weight: 600;
                font-style: normal;
                font-size: 1.4rem;
                text-align: center;
                color: rgb(161, 110, 0);
            }
    
            .verfy {
                margin: 15px auto;
            }
    
            .foot {
                align-items: center;
                text-align: center;
            }
        </style>
    </head>
    
    <body>
        <div class="card" style="width: 19rem;">
            <div class="card-body">
                <div class="top">Let's Code</div>
                <div class="data">
                    <h3 class="card-title paddings">Hey ${username} ! we hope you're doing well.</h3>
                </div>
                <div class="otpDiv">
                    <h2 class="verfy">Verification Code : ${otp}</h2>
                </div>
                <div class="data">
                    <p class="card-title paddings">It seems you are trying to change your forgotten password and need to
                        verify your email.</p>
                </div>
                <div class="data">
                    <p class="card-text paddings">Here is the verification code, <strong>${otp}</strong> please use it to
                        verify your email. It is valid for 2 minutes only.</p>
                </div>
                <div class="data">
                    <p class="card-text paddings">Do not share this verification code with others.</p>
                </div>
                <div class="data">
                    <p class="card-text paddings">If you didn't request this email, you can ignore and delete it. Thank you
                        for understanding.</p>
                </div>
                <div class="foot">
                    <h4><i class="fa-regular fa-copyright"></i> Let's Code India, All Rights Reserved.</h4>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossorigin="anonymous"></script>
    </body>
    
    </html>
    `;
};