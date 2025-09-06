import { EmailTemplate } from "@/components/EmailTemplate";
import type { NextApiRequest, NextApiResponse } from "next";
import { DEMO_EMAIL } from "@/utils/constants";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { name, assignee, email } = req.body;
  if (!name || !assignee || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Support comma-separated emails
  let emailList: string[] = [];
  if (typeof email === "string") {
    emailList = email.split(",").map(e => e.trim()).filter(Boolean);
  } else if (Array.isArray(email)) {
    emailList = email.map(e => String(e).trim()).filter(Boolean);
  } else {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (emailList.length === 0) {
    return res.status(400).json({ error: "No valid email addresses provided" });
  }

  // If it's a test email, just return success without sending
  if (emailList.length === 1 && emailList[0] === DEMO_EMAIL) {
    return res.status(200).json({ success: true });
  }

  // Send to all parsed emails
  const { data, error } = await resend.emails.send({
    from: "Secret Santa Coordinator <santa@bmoore.dev>",
    to: emailList,
    subject: "Your Secret Santa Assignment 🤫",
    react: EmailTemplate({ name, assignee }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
