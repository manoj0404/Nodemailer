const http = require("http");
const nodemailer = require("nodemailer");
require('dotenv').config();


const server = http.createServer((req, res) => {
    if (req.url === "/send-email" && req.method === "GET") {
       
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465, 
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS, 
            },
        });

       
        const mailOptions = {
            from: "sailchaudhari0410@gmail.com", 
            to: "hiteshwadile@gmail.com", 
            subject: "Node.js Mail Testing!", 
            text: "Hello, this is a test email sent using Node.js and Nodemailer!",
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Failed to send email.");
                return;
            }

            console.log("Email sent successfully:", info.response);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Email sent successfully!");
        });
    } else {
       
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Endpoint not found. Use /send-email to send an email.");
    }
});


const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
