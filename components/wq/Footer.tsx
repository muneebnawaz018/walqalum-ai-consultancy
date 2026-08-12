import Image from "next/image";
import Link from "next/link";

/** The three offices, from the firm's own details rather than the design's placeholder. */
const OFFICES = [
  { city: "Sharjah, UAE", tel: "+971 54 744 8002" },
  { city: "Lahore, Pakistan", tel: "+92 322 4696562" },
  { city: "Dubbo, Australia", tel: "+61 470 669 147" },
] as const;

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/* The design's Services column becomes Industries, matching the header. */
const EXPLORE = [
  { href: "/industries", label: "Industries" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
] as const;

/**
 * The site footer.
 *
 * Four columns on desktop, collapsing to two then one. Offices are real
 * addresses with live `tel:` links — the outgoing footer rendered them as
 * anchors with no href, which meant they could not be focused or dialled.
 */
export function Footer() {
  return (
    <footer role="contentinfo" className="wq-footer">
      <div className="wq-fcols">
        <div>
          <div className="wq-flogo">
            <Image src="/brand/walqalum-eagle.png" alt="" width={430} height={167} />
            <span>WALQALUM</span>
          </div>
          <p className="wq-fabout">
            An AI consultancy and engineering agency. Fifteen years of production
            software under everything we ship.
          </p>
          <div className="wq-fsocial">
            <a href="https://www.linkedin.com/company/walqalum">LinkedIn</a>
            <a href="https://x.com/qalamkars">X</a>
            <a href="https://www.instagram.com/theqalamkars/">Instagram</a>
          </div>
        </div>

        <nav aria-label="Footer links">
          <div className="wq-fhead">LINKS</div>
          <div className="wq-flist">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Explore">
          <div className="wq-fhead">EXPLORE</div>
          <div className="wq-flist">
            {EXPLORE.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <div className="wq-fhead">OFFICES</div>
          <div className="wq-flist">
            {OFFICES.map((o) => (
              <div key={o.city} className="wq-office">
                <span>{o.city}</span>
                <a href={`tel:${o.tel.replace(/\s/g, "")}`}>{o.tel}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wq-fbottom">
        <span>© {new Date().getFullYear()} WalQalum. All rights reserved.</span>
        <span className="wq-fbottom-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
