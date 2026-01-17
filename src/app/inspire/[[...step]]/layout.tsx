import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Get inspired | What's for dinner",
};

export default function InspireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
