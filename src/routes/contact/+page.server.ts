import nodemailer from "nodemailer";
import type { Actions } from './$types';

export const actions = {

    sendEmail: async (event) => {

        console.log(`[ Log : sendEmail ]:   Validating email`);

        console.log(`[ Log : sendEmail ]:   Sending email...`);

        const transporter = nodemailer.createTransport({
            host: "smtp.example.com",
            port: 587,
            secure: false,
            auth: {
                user: "your-email@example.com",
                pass: "your-password"
            }
        });

    }

} satisfies Actions;