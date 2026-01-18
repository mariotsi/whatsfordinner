import { Metadata } from 'next';
import { InspireProvider } from './InspireContext';

export const metadata: Metadata = {
  title: "Get inspired | What's for dinner",
};

export default function InspireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InspireProvider>{children}</InspireProvider>;
}
