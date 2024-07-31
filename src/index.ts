import * as dotenv from 'dotenv';

import { EmailService } from "./EmailService";

dotenv.config();



const emailService = new EmailService("smtp");

console.log(emailService)

emailService.sendEmail("liju@flycatchtech.com", "Test Subject", "Test Body")
  .then(() => console.log("Email sent successfully"))
  .catch(err => console.error("Error sending email:", err));
