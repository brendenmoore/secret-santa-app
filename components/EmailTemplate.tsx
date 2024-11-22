import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  assignee: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, assignee
}) => (
  <div>
    <h1>Hi, {name}!</h1>
    <p>
      Your secret santa is <strong>{assignee}</strong>
    </p>
  </div>
);
