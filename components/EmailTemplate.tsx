interface EmailTemplateProps {
  name: string;
  assignee: string;
}

export const EmailTemplate = ({
  name,
  assignee
}: Readonly<EmailTemplateProps>) => (
  <div>
    <p>Hi, {name}!</p>
    <p>
      Your secret santa is assignment is <strong>{assignee}</strong>.
    </p>
  </div>
);
