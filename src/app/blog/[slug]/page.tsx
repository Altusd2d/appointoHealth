import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS, getPostBySlug } from "../posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | BookMyDoctor",
    };
  }

  return {
    title: `${post.title} | BookMyDoctor`,
    description: post.description,
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-medium text-sky-700 transition hover:text-sky-800"
        >
        Back to all articles
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-base text-slate-600">{post.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{post.publishedAt}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="prose prose-slate mt-8 max-w-none">
          {post.content.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-base leading-8 text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
