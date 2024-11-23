interface EmailTemplateProps {
  name: string;
  assignee: string;
}

export const EmailTemplate = ({
  name,
  assignee
}: Readonly<EmailTemplateProps>) => (
  <div>
    <h1>Hi, {name}!</h1>
    <p>
      Your secret santa is <strong>{assignee}</strong>
    </p>
  </div>
);
