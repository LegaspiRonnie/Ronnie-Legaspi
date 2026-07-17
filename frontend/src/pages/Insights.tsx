import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePageTitle } from '../hooks.ts';
import Breadcrumb from '../components/Breadcrumb.tsx';
import Badge from '../components/Badge.tsx';
import EmptyState from '../components/EmptyState.tsx';
import { posts, formatDate } from '../content.ts';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.tsx';

export default function Insights() {
  usePageTitle('Insights — Ronnie Legaspi');

  return (
    <>
      {/* <Breadcrumb items={[{ label: 'Insights' }]} /> */}

      <section className="py-16 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal effect="blur" className="max-w-xl mb-12">
            <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ insights ]</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Notes &amp; writing</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Notes on Laravel, React, and things I pick up building real projects.
            </p>
          </Reveal>

          <Stagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {posts.length === 0 && (
              <StaggerItem className="md:col-span-3">
                <EmptyState title="No posts yet" message="Check back soon for new writing." />
              </StaggerItem>
            )}

            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                  <Link
                    to={`/insights/${post.slug}`}
                    className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900"
                  >
                    <div className="h-40 overflow-hidden">
                      {post.cover_image_url ? (
                        <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-gray-900"></div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      {post.tags && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} label={tag} color="blue" />
                          ))}
                        </div>
                      )}
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2 leading-snug">{post.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                        <span>{formatDate(post.published_at)}</span>
                        <span>{post.reading_minutes} min read</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
