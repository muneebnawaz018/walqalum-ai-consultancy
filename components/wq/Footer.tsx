import Image from "next/image";
import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";
import { SoundToggle, ThemeToggle } from "@/components/wq/Toggles";
import { Wordmark } from "@/components/wq/Wordmark";

/** Where to write. The design's own address. */
const EMAIL = "tafseel@walqalum.com";

/**
 * The three offices.
 *
 * The design lists the localities; the phone numbers are the firm's own and are
 * kept, as live `tel:` links. The outgoing footer rendered them as anchors with
 * no href, which meant they could be neither focused nor dialled.
 */
const OFFICES = [
  { city: "Sharjah Media City, UAE", tel: "+971 54 744 8002" },
  { city: "Johar Town, Lahore, Pakistan", tel: "+92 322 4696562" },
  { city: "Dubbo NSW, Australia", tel: "+61 470 669 147" },
] as const;

const SOCIAL = [
  { href: "https://www.instagram.com/theqalamkars/", label: "Instagram" },
  { href: "https://x.com/qalamkars", label: "X" },
  { href: "https://www.linkedin.com/company/walqalum", label: "LinkedIn" },
] as const;

const LINKS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/* The design's Services column becomes Industries, matching the header. */
const EXPLORE = [
  { href: "/industries", key: "industries" },
  { href: "/work", key: "work" },
  { href: "/insights", key: "insights" },
] as const;

/**
 * The site footer.
 *
 * Four columns on desktop, collapsing to two then one, over a bottom bar and
 * the oversized wordmark — the design's own arrangement.
 *
 * A server component, so the two toggles in the bottom bar are the only part
 * that ships as client code.
 */
export async function Footer() {
  const t = await getDictionary();
  const locale = await getLocale();

  return (
    <footer role="contentinfo" className="wq-footer">
      <div className="wq-fcols">
        <div>
          <div className="wq-flogo">
            <Image src="/brand/walqalum-eagle.png" alt="" width={430} height={167} />
            <span>WALQALUM</span>
          </div>
          <p className="wq-fabout">{t.footer.about}</p>
          <div className="wq-fsocial">
            {SOCIAL.map((s) => (
              /* External and user-visible, so they open in place; `noreferrer`
                 keeps the referrer off third-party analytics. */
              <a key={s.href} href={s.href} rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer links">
          <div className="wq-fhead">{t.footer.links}</div>
          <div className="wq-flist">
            {LINKS.map((l) => (
              <Link key={l.href} href={localeHref(l.href, locale)}>
                {t.nav[l.key]}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Explore">
          <div className="wq-fhead">{t.footer.explore}</div>
          <div className="wq-flist">
            {EXPLORE.map((l) => (
              <Link key={l.href} href={localeHref(l.href, locale)}>
                {t.nav[l.key]}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <div className="wq-fhead">{t.footer.contact}</div>
          <div className="wq-flist">
            <a href={`mailto:${EMAIL}`} className="wq-femail">
              {EMAIL}
            </a>
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
        <span>
          © {BUILD_YEAR} WalQalum. {t.footer.rights}
        </span>

        <span className="wq-favail">
          <span className="wq-pulse" aria-hidden="true" />
          {t.footer.available}
        </span>

        <span className="wq-fbottom-links">
          {/* Both still live on the legacy layout, which is not localised —
              so these stay unprefixed whichever language is showing. */}
          <Link href="/privacy">{t.footer.privacy}</Link>
          <Link href="/terms">{t.footer.terms}</Link>
        </span>

        <div className="wq-ftoggles">
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>

      <Wordmark />
    </footer>
  );
}

/**
 * The copyright year.
 *
 * Read once per server process rather than per render — this is a server
 * component, so the visitor's own clock never enters into it either way.
 */
const BUILD_YEAR = new Date().getFullYear();
