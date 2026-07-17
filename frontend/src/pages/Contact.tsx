import { usePageTitle } from '../hooks.ts';
import ContactSection from '../sections/Contact.tsx';

export default function Contact() {
  usePageTitle('Contact — Ronnie Legaspi');

  return (
    <>
      <ContactSection />
    </>
  );
}


