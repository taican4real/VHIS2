import Link from 'next/link'

export interface PageBannerProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href: string }[]
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  description,
  breadcrumbs,
}) => {
  return (
    <header className="page-banner">
      <div className="container page-banner__inner">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="page-banner__breadcrumbs" aria-label="Breadcrumb">
            <ol className="page-banner__breadcrumb-list">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="page-banner__breadcrumb-item">
                  {index < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="page-banner__breadcrumb-link">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="page-banner__breadcrumb-current" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="page-banner__breadcrumb-separator" aria-hidden="true">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="page-banner__title">{title}</h1>
        {description && <p className="page-banner__description">{description}</p>}
      </div>
    </header>
  )
}

PageBanner.displayName = 'PageBanner'