import Link from "next/link";

type FooterProps = {
    locale: string;
    content: {
        copyright: string;
        terms: string;
    };
};

function Footer({ locale, content }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Ebneely. {content.copyright}
                    </p>
                    <Link
                        href={`/${locale}/terms-policy`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {content.terms}
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
