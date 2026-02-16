export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Blog Post: {params.slug}
        </h1>
        <p className="mt-4 text-lg text-slate-600">Full blog post content coming soon</p>
      </div>
    </div>
  );
}
