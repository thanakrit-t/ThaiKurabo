import { ArrowIcon } from "@/components/icons";
import { companyLocations } from "@/lib/company-details";

export function CompanyLocations({ className = "" }: { className?: string }) {
  return (
    <div className={`company-locations ${className}`.trim()}>
      {companyLocations.map((location) => (
        <address className="location-block" key={location.label}>
          <div className="location-heading">
            <strong className="location-label">{location.label}</strong>
            {location.mapUrl && (
              <a
                className="location-map-link"
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Factory location in Google Maps"
              >
                Open map <ArrowIcon />
              </a>
            )}
          </div>
          <span className="location-address">
            {location.addressLines.map((line) => <span key={line}>{line}</span>)}
          </span>
          <a className="location-phone" href={location.telephoneHref}>{location.phone}</a>
        </address>
      ))}
    </div>
  );
}
