import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { techIconUrl } from '../content.ts';
import type { Project } from '../types.ts';

interface ProjectCardProps {
  project: Project;
  iconPath: string;
}

// Ecommerce-style product card: large focused image, selectable thumbnail
// strip, and action buttons (Live demo / GitHub / View fullscreen).
export default function ProjectCard({ project, iconPath }: ProjectCardProps) {
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const images = project.images;
  const total = images.length;

  // Mouse-tracked 3D tilt. Springs smooth out the raw pointer values so the
  // card follows the cursor instead of snapping.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 200, damping: 20, mass: 0.4 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  useEffect(() => {
    if (!viewerOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewerOpen(false);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerOpen, total]);

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group bg-white dark:bg-blue-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900 [transform-style:preserve-3d]"
    >
      {/* Main focused image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white dark:bg-blue-900">
        {total > 0 ? (
          <button
            type="button"
            onClick={() => setViewerOpen(true)}
            className="block w-full h-full cursor-zoom-in"
            aria-label={`View ${project.title} screenshots fullscreen`}
          >
            <img
              src={images[index]}
              alt={`${project.title} — screenshot ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </button>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-gray-900 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-700 dark:text-blue-400 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
          </div>
        )}

        {project.featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-blue-700/90 text-white text-xs font-medium">Featured</span>
        )}
        {total > 1 && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/50 text-white text-xs font-mono">
            {index + 1} / {total}
          </span>
        )}
      </div>

      {/* Selectable thumbnail strip */}
      {total > 1 && (
        <div className="flex gap-2 px-4 pt-3 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1} of ${project.title}`}
              className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden ring-2 transition-all duration-300 hover:scale-105 ${
                i === index ? 'ring-blue-600 dark:ring-blue-400' : 'ring-transparent opacity-55 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-medium text-gray-900 dark:text-white mb-1.5">{project.title}</h3>
        {project.subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{project.subtitle}</p>}
        {project.role && <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-2">{project.role}</p>}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{project.description}</p>

        {project.tags && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => {
              const tagIconUrl = techIconUrl(tag);
              return (
                <span key={tag} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                  {tagIconUrl && <img src={tagIconUrl} alt="" className="w-3 h-3" loading="lazy" />}
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] hover:shadow-md hover:shadow-blue-700/25"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Live demo
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-blue-400 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
          {total > 0 && (
            <button
              type="button"
              onClick={() => setViewerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-blue-900 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen viewer — portaled to <body> because the card's hover
          transform would otherwise trap position:fixed descendants */}
      {viewerOpen && createPortal(
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 animate-fade-in">
          <div onClick={() => setViewerOpen(false)} className="absolute inset-0"></div>

          <img
            src={images[index]}
            alt={`${project.title} — screenshot ${index + 1}`}
            className="relative z-0 max-h-[78vh] max-w-[92vw] object-contain rounded-lg animate-page-in"
          />

          {total > 1 && (
            <div className="relative z-10 mt-4 flex gap-2 max-w-[92vw] overflow-x-auto px-2 pb-1">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  className={`shrink-0 w-16 h-11 rounded-md overflow-hidden ring-2 transition-all duration-200 ${
                    i === index ? 'ring-white' : 'ring-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          <button type="button" onClick={() => setViewerOpen(false)} aria-label="Close" className="absolute z-10 top-4 right-4 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {total > 1 && (
            <>
              <button type="button" onClick={() => setIndex((i) => (i - 1 + total) % total)} aria-label="Previous image" className="absolute z-10 left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button type="button" onClick={() => setIndex((i) => (i + 1) % total)} aria-label="Next image" className="absolute z-10 right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>,
        document.body,
      )}
    </motion.div>
  );
}

