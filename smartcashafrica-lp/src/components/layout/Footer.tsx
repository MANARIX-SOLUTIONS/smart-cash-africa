import { useState, type ReactNode } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/context/I18nContext";
import { appLinks } from "@/lib/links";

const footerSections = [
  {
    titleKey: "footer.product",
    links: [
      { key: "footer.links.features", href: "#features" },
      { key: "footer.links.pricing", href: "#pricing" },
      { key: "footer.links.security", href: "#security" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { key: "footer.links.faq", href: "#faq" },
      { key: "footer.links.blog", href: "#resources" },
      { key: "footer.links.documentation", href: "#resources" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { key: "footer.links.about", href: "#resources" },
      { key: "footer.links.contact", href: "#resources" },
      { key: "footer.links.careers", href: "#resources" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { key: "footer.links.terms", href: appLinks.terms },
      { key: "footer.links.privacy", href: appLinks.privacy },
    ],
  },
] as const;

function SocialIcon({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-sm"
    >
      {children}
    </a>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.065 2.065 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="resources"
      className="relative border-t border-border bg-gradient-to-b from-card to-surface/80"
    >
      <div className="container-main px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card lg:-mt-12 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-2 text-primary">
                <Mail className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-navy">
                  {t("footer.newsletterTitle")}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("footer.newsletterSubtitle")}
              </p>
            </div>
            <form
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletterPlaceholder")}
                className="h-12 flex-1 rounded-xl border border-border bg-background px-4 text-sm text-navy outline-none transition-colors placeholder:text-muted focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                required
              />
              <Button type="submit" className="shrink-0">
                {t("footer.newsletterCta")}
              </Button>
            </form>
          </div>
        </div>

        <div className="section-padding !pb-12 !pt-16">
          <div className="grid gap-12 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <span className="text-sm font-bold text-white">SC</span>
                </div>
                <span className="text-lg font-semibold text-navy">
                  {t("brand.name")}
                </span>
              </div>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-muted">
                {t("footer.tagline")}
              </p>
              <div className="mt-6 flex gap-3">
                <SocialIcon label="LinkedIn">
                  <LinkedInIcon className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon label="X">
                  <XIcon className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon label="Facebook">
                  <FacebookIcon className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon label="Instagram">
                  <InstagramIcon className="h-4 w-4" />
                </SocialIcon>
              </div>
            </div>

            {footerSections.map((section) => (
              <div key={section.titleKey}>
                <h4 className="text-sm font-semibold text-navy">
                  {t(section.titleKey)}
                </h4>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.key}>
                      <a
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-primary"
                      >
                        {t(link.key)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-sm text-muted">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted">{t("footer.builtWith")}</p>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
              >
                <ArrowUp className="h-4 w-4" />
                {t("footer.backToTop")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
