import type { PostDoc } from "@/lib/db";
import { PostCard } from "./PostCard";

/** The blog page, converted from the 2026 design artifact. */
export function Blog({ posts }: { posts: PostDoc[] }) {
  return (
    <section className="view" data-route="blog">
      <div className="pagehead"><div className="wrap">
        <span className="eyebrow mono reveal" data-en="Blog" data-ar="المدوّنة">Blog</span>
        <h1 className="display reveal" data-en="Field notes on AI, data and delivery." data-ar="ملاحظاتٌ ميدانية في البرمجيات والذكاء الاصطناعي والتسليم.">Field notes on AI, data and delivery.</h1>
        <p className="reveal" data-en="No thought-leadership theatre, just what we've learned shipping real systems for real teams." data-ar="لا استعراض قيادة فكرية، فقط ما تعلّمناه من بناء أنظمة حقيقية لفرقٍ حقيقية.">No thought-leadership theatre, just what we&apos;ve learned shipping real systems for real teams.</p>
      </div></div>
      <section className="band"><div className="wrap">
        <div className="filters reveal" role="group">
          <button aria-pressed="true" data-en="All" data-ar="الكل">All</button>
          <button aria-pressed="false">AI / ML</button>
          <button aria-pressed="false" data-en="AI / ML" data-ar="سحابة">AI / ML</button>
          <button aria-pressed="false" data-en="Data" data-ar="منتج">Data</button>
          <button aria-pressed="false" data-en="Security" data-ar="أمن">Security</button>
        </div>
        <div className="work-grid stagger">
        {posts.length ? (
          posts.map((post, i) => <PostCard key={post.slug} post={post} index={i} wide={i === 0} />)
        ) : (
          <p className="mono">No posts published yet.</p>
        )}
      </div>
      </div></section>
  
    </section>
  );
}
