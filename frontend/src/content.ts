// Static content layer — the frontend is fully static for now (no REST API).
// Once the backend (../app) exposes its API, swap these exports for fetch calls.
import raw from './content.json';
import profilePhotoUrl from './assets/profile/profile.jpg';
import type { Coordinates, ExperienceEntry, Profile, Project, Quote, RawProject, Sample, Skill, SkillGroup } from './types.ts';

type PostRow = (typeof raw.posts)[number];

// Screenshots are grouped by their immediate folder name under
// src/assets/projects/. Each project's images_dir determines which group it uses.
const projectImages = Object.entries(
  import.meta.glob<string>('./assets/projects/*/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .reduce<Record<string, string[]>>((byFolder, [path, url]) => {
    const folder = path.split('/').at(-2)!;
    (byFolder[folder] ??= []).push(url);
    return byFolder;
  }, {});

const portfolioShots = Object.entries(
  import.meta.glob<string>('./assets/portfolio/*/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
).sort(([a], [b]) => a.localeCompare(b));

export const profile: Profile = raw.profile;

export { profilePhotoUrl };

// External links must be absolute, or the browser resolves them against this
// site (e.g. "foo.vercel.app" becomes /foo.vercel.app on the portfolio itself)
const withProtocol = (url?: string | null) => (url && !/^https?:\/\//i.test(url) ? `https://${url}` : (url ?? null));

export const projects: Project[] = (raw.projects as RawProject[])
  .filter((project) => !project.is_archived)
  .map((project) => {
    const folder = project.images_dir?.split('/').at(-1);
    const images = folder ? (projectImages[folder] ?? []) : [];

    return {
      ...project,
      images,
      demo_url: withProtocol(project.demo_url),
      repo_url: withProtocol(project.repo_url),
      image_url: project.image_url ?? (images.length > 0 ? images[0] : null),
    };
  })
  .sort((a, b) => a.sort_order - b.sort_order);

export const projectTags = [...new Set(projects.flatMap((project) => project.tags ?? []))];

export const experience: ExperienceEntry[] = [...(raw.experience as ExperienceEntry[])].sort(
  (a, b) => a.sort_order - b.sort_order,
);

// Skills grouped by group_name, preserving sort order
export const skillGroups: SkillGroup[] = [...(raw.skills as Skill[])]
  .sort((a, b) => a.sort_order - b.sort_order)
  .reduce<SkillGroup[]>((groups, skill) => {
    const group = groups.find((g) => g.name === skill.group_name);
    if (group) group.skills.push(skill.name);
    else groups.push({ name: skill.group_name, skills: [skill.name] });
    return groups;
  }, []);

const blogImages = import.meta.glob<string>('./assets/blog/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const posts = (raw.posts as PostRow[])
  .filter((post) => post.published_at && new Date(post.published_at) <= new Date())
  .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
  .map((post) => ({
    ...post,
    cover_image_url: (post.cover_image_url && blogImages[`./assets/blog/${post.cover_image_url}`]) ?? null,
  }));

export const coordinates: Coordinates | null =
  profile.latitude && profile.longitude ? { lat: profile.latitude, lng: profile.longitude } : null;

// Case-study samples: screenshots grouped by folder under src/assets/portfolio/
const sampleMeta: Record<string, { title: string; url: string | null; description: string | null }> = {
  client1: {
    title: 'Personal Portfolio Website',
    url: 'https://ronnie-legaspi.vercel.app',
    description:
      'An earlier build of my personal developer portfolio — designed and deployed on Vercel with a clean, minimal one-page layout.',
  },
};

export const samples: Sample[] = Object.entries(
  portfolioShots.reduce<Record<string, string[]>>((bySlug, [path, url]) => {
    const slug = path.split('/').at(-2)!;
    (bySlug[slug] ??= []).push(url);
    return bySlug;
  }, {}),
).map(([slug, images]) => ({
  slug,
  images,
  ...(sampleMeta[slug] ?? { title: slug.replace(/[-_]/g, ' '), url: null, description: null }),
}));

export function formatDate(value?: string | null): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function limit(text?: string | null, length = 100): string {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length).trimEnd()}...` : text;
}

// Same curated quote bank the backend's QuoteService uses
export const quotes: Quote[] = [
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
  { text: 'Premature optimization is the root of all evil.', author: 'Donald Knuth' },
  { text: "It's not a bug – it's an undocumented feature.", author: 'Anonymous' },
  { text: 'Debugging is twice as hard as writing the code in the first place.', author: 'Brian Kernighan' },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: 'Cory House' },
  { text: 'Simplicity is prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
  { text: 'Deleted code is debugged code.', author: 'Jeff Sickel' },
  { text: 'There are only two hard things in Computer Science: cache invalidation and naming things.', author: 'Phil Karlton' },
  { text: 'Walking on water and developing software from a specification are easy if both are frozen.', author: 'Edward V. Berard' },
  { text: 'The most disastrous thing that you can ever learn is your first programming language.', author: 'Alan Kay' },
  { text: 'Truth can only be found in one place: the code.', author: 'Robert C. Martin' },
];

// Maps known technology names to their Simple Icons slug (cdn.simpleicons.org)
const techSlugs: Record<string, string> = {
  'laravel (php)': 'laravel',
  laravel: 'laravel',
  'react.js': 'react',
  'vue.js': 'vuedotjs',
  javascript: 'javascript',
  typescript: 'typescript',
  html: 'html5',
  css: 'css',
  mysql: 'mysql',
  postgresql: 'postgresql',
  sqlite: 'sqlite',
  docker: 'docker',
  unity: 'unity',
  'c#': 'dotnet',
  git: 'git',
  github: 'github',
  php: 'php',
  'tailwind css': 'tailwindcss',
  tailwindcss: 'tailwindcss',
  livewire: 'livewire',
  'alpine.js': 'alpinedotjs',
  filament: 'filament',
  xampp: 'xampp',
  'visual studio code': 'visualstudiocode',
  'github copilot': 'githubcopilot',
  'openai codex': 'openai',
};

export function techIconUrl(name: string): string | null {
  const slug = techSlugs[name.toLowerCase().trim()];
  return slug ? `https://cdn.simpleicons.org/${slug}` : null;
}
