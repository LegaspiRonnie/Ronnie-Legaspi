import { Link, useParams } from 'react-router-dom';
import { usePageTitle } from '../hooks.ts';
import Breadcrumb from '../components/Breadcrumb.tsx';
import Badge from '../components/Badge.tsx';
import ShareButtons from '../components/ShareButtons.tsx';
import NotFound from './NotFound.tsx';
import { posts, profile, formatDate, limit } from '../content.ts';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.tsx';

export default function InsightShow() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  usePageTitle(post ? `${post.title} — Ronnie Legaspi` : 'Post not found — Ronnie Legaspi');

  if (!post) return <NotFound />;

  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);
  const currentUrl = window.location.href;

  return (
    <>
      {/* <Breadcrumb items={[{ label: 'Insights', to: '/insights' }, { label: limit(post.title, 40) }]} /> */}

      <article className="py-16 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal effect="left">
            {post.tags && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} label={tag} color="blue" />
                ))}
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-3">{post.title}</h1>

            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-700 text-white text-xs font-medium">RL</span>
              <span>{profile.name}</span>
              <span>&middot;</span>
              <span>{formatDate(post.published_at)}</span>
              <span>&middot;</span>
              <span>{post.reading_minutes} min read</span>
            </div>
          </Reveal>

          {post.cover_image_url && (
            <Reveal effect="scale" delay={0.1}>
              <img src={post.cover_image_url} alt={post.title} className="w-full rounded-2xl mb-10" />
            </Reveal>
          )}

          <Reveal effect="fade" delay={0.15} className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-5 mb-12">
            {post.body.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>

          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-200 dark:border-gray-800 mb-14">
            <ShareButtons url={currentUrl} title={post.title} />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659" />
              </svg>
              Print
            </button>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">More posts</h2>
              <Stagger stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((item) => (
                  <StaggerItem key={item.id}>
                    <Link
                      to={`/insights/${item.slug}`}
                      className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{limit(item.excerpt, 90)}</p>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
