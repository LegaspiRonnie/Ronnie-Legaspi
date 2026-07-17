import { usePageTitle } from '../hooks.ts';
import Insights from '../pages/Insights.tsx';
import VideoShowcase from '../sections/VideoShowcase.tsx';

import Hero from '../sections/Hero.tsx';
import LogoCloud from '../sections/LogoCloud.tsx';
import ExperienceSnapshot from '../sections/ExperienceSnapshot.tsx';
import ProjectsTeaser from '../sections/ProjectsTeaser.tsx';

export default function Home() {
  usePageTitle('Ronnie Legaspi — Full Stack Developer');

  return (
    <>
      <Hero />
      
      <LogoCloud />
      <VideoShowcase />
      <Insights />
      <ExperienceSnapshot />
      <ProjectsTeaser />
    </>
  );
}

