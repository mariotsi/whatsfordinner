import { Metadata } from 'next';
import { InspireProvider } from './InspireContext';
import { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: "Get inspired | What's for dinner",
};

const InspireLayout: FC<PropsWithChildren> = ({ children }) => (
  <InspireProvider>{children}</InspireProvider>
);

export default InspireLayout;
