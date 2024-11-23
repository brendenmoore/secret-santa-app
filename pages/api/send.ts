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

  // If it's a test email, just return success without sending
  if (email === DEMO_EMAIL) {
    return res.status(200).json({ success: true });
  }

  const { data, error } = await resend.emails.send({
    from: "Secret Santa Coordinator <santa@bmoore.dev>",
    to: [email],
    subject: "Your Secret Santa Assignment 🤫",
    react: EmailTemplate({ name, assignee }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
