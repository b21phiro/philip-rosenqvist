import nodemailer, {type SendMailOptions} from "nodemailer";
import type { Actions } from './$types';
import {
    IMAP_ADDRESS,
    IMAP_PORT,
    SMTP_ADDRESS,
    SMTP_PASSWORD,
    SMTP_PORT_1,
    SMTP_PORT_2,
    VITE_CONTACT_EMAIL,
} from "$env/static/private";
import { fail } from "@sveltejs/kit";
import { validateEmail, validateEmpty } from "$lib/utils/input-validation";

export const actions = {

    sendEmail: async ({ request }) => {

        console.log(`[ Log : sendEmail ]:   Validating email`);

        const formData = await request.formData();
        const fromFirstname = formData.get("firstname")?.toString() ?? "";
        const fromSurname = formData.get("surname")?.toString() ?? "";
        const fromEmail = formData.get("email")?.toString() ?? "";
        const fromMessage = formData.get("message")?.toString() ?? "";

        if (
            !validateEmpty(fromFirstname) ||
            !validateEmpty(fromSurname) ||
            !validateEmpty(fromEmail) ||
            !validateEmpty(fromMessage)
        ) {
            console.log(`[ Error : sendEmail ]:   Failed validation due to missing fields`);
            return fail(400, {
                error: "Missing fields",
                firstname: fromFirstname,
                surname: fromSurname,
                email: fromEmail,
                message: fromMessage,
            });
        }

        if (!validateEmail(fromEmail)) {
            console.log(`[ Error : sendEmail ]:   Failed validation due to invalid email`);
            return fail(400, {
                error: "Invalid email",
                firstname: fromFirstname,
                surname: fromSurname,
                email: fromEmail,
                message: fromMessage,
            });
        }

        console.log(`[ Log : sendEmail ]:   Validated email successfully`);

        const email: SendMailOptions = {
            from: VITE_CONTACT_EMAIL,
            to: VITE_CONTACT_EMAIL,
            replyTo: fromEmail,
            subject: `Från ${fromFirstname} ${fromSurname}`,
            text: fromMessage,
        };

        const transporter = nodemailer.createTransport({
            host: SMTP_ADDRESS,
            port: SMTP_PORT_1,
            secure: true,
            auth: {
                user: VITE_CONTACT_EMAIL,
                pass: SMTP_PASSWORD
            }
        });

        // Validates the connection to the SMTP server.
        try {
            console.log(`[ Log : sendEmail ]:   Verifying connection to server...`);
            await transporter.verify();
            console.log(`[ Log : sendEmail ]:   Established connection to server successfully`);
        } catch (error) {
            console.error(`[ Error : sendEmail ]:   Failed to establish connection to the server ${error}`);
            fail(500, {
                error: "Connection to SMTP server failed"
            });
        }

        // Sends the email
        try {
            console.log(`[ Log : sendEmail ]:   Sending email...`);
            const info = await transporter.sendMail(email);
            console.log(`[ Log : sendEmail ]:   Email sent \"${info.messageId}\" successfully`);
        } catch (error) {
            console.error(`[ Error : sendEmail ]:   Error while sending email: ${error}`);
            fail(500, {
                error: "Failed to send email"
            });
        }

    }

} satisfies Actions;