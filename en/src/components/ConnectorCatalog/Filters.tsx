import React, { useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { useCatalog } from './context';
import styles from './styles.module.css';

const OPENAPI_SPEC_GUIDE = '/build-your-own/create-from-openapi-spec';
const REQUEST_CONNECTOR_ISSUE_URL = 'https://github.com/wso2/product-integrator/issues/new/choose';

function CheckIcon(): ReactNode {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 13 4.5 4.5L19 7" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }): ReactNode {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 0.15s ease' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SearchIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

/** One collapsible checkbox facet -- "Area" (category) and "Vendor" are
 * both built from this, only the data and the label differ. No per-item
 * count shown -- just the checkbox and label.
 *
 * `limit`: when set and the list is longer than it, only the first
 * `limit` items show initially, with a "Show more"/"Show less" toggle
 * below the list (reuses `.showMore`, the same pattern the catalog
 * card's description truncation already uses) -- Vendor's list grows
 * with the catalog and was pushing "Missing a connector?" far down the
 * sidebar; Area's (a small, fixed set of categories) is left unlimited. */
function FacetGroup({
  title,
  items,
  selected,
  onToggle,
  limit,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
  limit?: number;
}): ReactNode {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  if (items.length === 0) return null;

  const isTruncatable = limit !== undefined && items.length > limit;
  const visibleItems = isTruncatable && !expanded ? items.slice(0, limit) : items;

  return (
    <div className={styles.facetGroup}>
      <button type="button" className={styles.facetGroupHead} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <>
          <div className={styles.facetList}>
            {visibleItems.map((item) => (
              <button
                key={item}
                type="button"
                className={styles.facet}
                aria-pressed={selected.includes(item)}
                onClick={() => onToggle(item)}
              >
                <span className={styles.box}>
                  <CheckIcon />
                </span>
                <span className={styles.facetLabel}>{item}</span>
              </button>
            ))}
          </div>
          {isTruncatable && (
            <button type="button" className={styles.showMore} onClick={() => setExpanded((e) => !e)}>
              {expanded ? 'Show less' : `Show more (${items.length - limit!})`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function SearchInput({ query, setQuery }: { query: string; setQuery: (q: string) => void }): ReactNode {
  return (
    <label className={styles.sidebarSearch}>
      <SearchIcon />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search connectors..."
        aria-label="Search connectors"
      />
    </label>
  );
}

function PromoBox(): ReactNode {
  return (
    <div className={styles.promo}>
      <b>Missing a connector?</b>
      <span>
        Generate one from an <Link to={OPENAPI_SPEC_GUIDE}>OpenAPI spec</Link>, or{' '}
        <a href={REQUEST_CONNECTOR_ISSUE_URL} target="_blank" rel="noopener noreferrer">
          request it on GitHub
        </a>
        .
      </span>
    </div>
  );
}

/**
 * Rendered in the "On this page" TOC slot (see theme/TOC), not inline in
 * the main content column -- see context.tsx's docstring for why this
 * needs a shared context rather than local state. Returns null on every
 * page except the catalog itself (no registered data to show).
 */
export default function ConnectorCatalogFilters(): ReactNode {
  const catalog = useCatalog();
  if (!catalog) return null;

  const hasActiveFilters = catalog.selectedCats.length > 0 || catalog.selectedVendors.length > 0 || catalog.query.length > 0;

  return (
    <div className={styles.filters}>
      <SearchInput query={catalog.query} setQuery={catalog.setQuery} />

      {hasActiveFilters && (
        <button type="button" className={styles.clear} onClick={catalog.clearAll}>
          Clear all filters
        </button>
      )}

      <FacetGroup title="Area" items={catalog.sortedCategories} selected={catalog.selectedCats} onToggle={catalog.toggleCategory} />
      <FacetGroup title="Vendor" items={catalog.sortedVendors} selected={catalog.selectedVendors} onToggle={catalog.toggleVendor} limit={5} />

      <PromoBox />
    </div>
  );
}

/**
 * Mobile counterpart, rendered in the "On this page" slot's mobile
 * equivalent (see theme/DocItem/TOC/Mobile) instead of the desktop TOC
 * rail above -- that slot only renders on desktop widths, so without
 * this the search box, Area/Vendor filters, and the "Missing a
 * connector?" promo never reached mobile users at all.
 *
 * The search box stays uncollapsed (it's the primary action and cheap
 * on vertical space); Area/Vendor/the promo sit behind a "Filters"
 * toggle, collapsed by default, so a long Vendor list doesn't push the
 * connector grid far down the page before a mobile visitor even sees it.
 */
export function ConnectorCatalogFiltersMobile(): ReactNode {
  const catalog = useCatalog();
  const [open, setOpen] = useState(false);
  if (!catalog) return null;

  const activeFacetCount = catalog.selectedCats.length + catalog.selectedVendors.length;
  const hasActiveFilters = activeFacetCount > 0 || catalog.query.length > 0;

  return (
    <div className={styles.filtersMobile}>
      <SearchInput query={catalog.query} setQuery={catalog.setQuery} />

      <button type="button" className={styles.filtersToggle} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>
          Filters
          {activeFacetCount > 0 && <span className={styles.filtersCount}>{activeFacetCount}</span>}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className={styles.filtersMobilePanel}>
          {hasActiveFilters && (
            <button type="button" className={styles.clear} onClick={catalog.clearAll}>
              Clear all filters
            </button>
          )}
          <FacetGroup title="Area" items={catalog.sortedCategories} selected={catalog.selectedCats} onToggle={catalog.toggleCategory} />
          <FacetGroup title="Vendor" items={catalog.sortedVendors} selected={catalog.selectedVendors} onToggle={catalog.toggleVendor} limit={5} />
          <PromoBox />
        </div>
      )}
    </div>
  );
}
