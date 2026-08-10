import { SECTORS, sectorLabel, sectorLabelAr } from "@/lib/sectors";

/**
 * The sector rail and its panel, shared by the home band and the industries
 * page. The first sector is rendered on the server so the panel has real
 * content before any script runs; {@link Behaviour} swaps it on click.
 */
export function SectorTabs() {
  const first = SECTORS[0];

  return (
    <div className="ind reveal">
      <div className="tabs" role="tablist">
        {SECTORS.map((s, i) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={i === 0}
            data-ind={String(i)}
            data-en={s.name}
            data-ar={s.nameAr}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="panel">
        <div className="mono" data-en={sectorLabel(0)} data-ar={sectorLabelAr(0)}>
          {sectorLabel(0)}
        </div>
        <h3 data-en={first.name} data-ar={first.nameAr}>
          {first.name}
        </h3>
        <p data-en={first.lede} data-ar={first.ledeAr}>
          {first.lede}
        </p>
        <span className="mono useslab" data-en="What we build" data-ar="ما نبنيه">
          What we build
        </span>
        <ul className="uses">
          {first.uses.map((u, i) => (
            <li key={u} data-en={u} data-ar={first.usesAr[i]}>
              {u}
            </li>
          ))}
        </ul>
        <ul className="tags">
          {first.tags.map((t, i) => (
            <li key={t} data-en={t} data-ar={first.tagsAr[i]}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
