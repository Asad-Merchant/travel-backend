const OTP_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification - Travella</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 500px;
            background: white;
            margin: 30px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            font-size: 26px;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 10px;
        }
        .header {
            font-size: 22px;
            font-weight: bold;
            color: #333;
        }
        .otp {
            font-size: 28px;
            font-weight: bold;
            color: #2e7d32;
            background: #e8f5e9;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 8px;
            margin: 20px 0;
        }
        .message {
            font-size: 16px;
            color: #555;
            margin-top: 10px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <p class="logo">travella.</p>
        <p class="header">OTP Verification</p>
        <p class="message">Dear User,</p>
        <p class="message">Your One-Time Password (OTP) for verification on <strong>Travella</strong> is:</p>
        <p class="otp">{{OTP}}</p>
        <p class="message">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        <p class="footer">If you did not request this, please ignore this email or <a href="#">contact Travella support</a>.</p>
    </div>
</body>
</html>



`


export {OTP_TEMPLATE}