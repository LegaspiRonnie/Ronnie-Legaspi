import { usePageTitle } from '../hooks.ts';
import Breadcrumb from '../components/Breadcrumb.tsx';
import ContactSection from '../sections/Contact.tsx';

export default function Contact() {
  usePageTitle('Contact — Ronnie Legaspi');

  return (
    <>
      {/* <Breadcrumb items={[{ label: 'Contact' }]} /> */}
      <ContactSection />
    </>
  );
}
