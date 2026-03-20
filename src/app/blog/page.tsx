import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "./posts";

export const metadata: Metadata = {
  title: "Health Blog | Appointo",
  description:
    "Practical healthcare guides on choosing doctors, teleconsultation, and appointment preparation.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Appointo Blog
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Actionable healthcare content to help patients choose better care and
          book appointments with confidence.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition hover:text-sky-700"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {post.description}
              </p>

              <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
