import React, { InputHTMLAttributes } from 'react';

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<EmailInputProps> = ({ label, ...props }) => {
  return (
    <div className="email-input-container">
      <label htmlFor={props.id}>{label}</label>
      <input type="email" {...props} />
    </div>
  );
};