import React from 'react';

interface MockLinkProps {
  href: string;
  children: React.ReactNode;
}

const MockLink: React.FC<MockLinkProps> = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export default MockLink;
