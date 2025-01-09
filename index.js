const http = require("http");
const nodemailer = require("nodemailer");

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === "/send-email" && req.method === "GET") {
        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465, // Port for SSL
            auth: {
                user: "sailchaudhari0410@gmail.com", // Your Gmail address
                pass: "hlqrpsmibboqfxps", // Your Gmail password or App Password
            },
        });

        // Email options
        const mailOptions = {
            from: "sailchaudhari0410@gmail.com", // Sender address
            to: "hiteshwadile@gmail.com", // Recipient address
            subject: "Node.js Mail Testing!", // Subject line
            text: "Hello, this is a test email sent using Node.js and Nodemailer!", // Plain text body
        };

        // Send email
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
        // Handle unsupported routes
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Endpoint not found. Use /send-email to send an email.");
    }
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
