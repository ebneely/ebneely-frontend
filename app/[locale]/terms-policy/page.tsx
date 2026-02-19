import { getDictionary, Locale } from "@/i18n";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default async function TermsPage({ params }: Props) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {dictionary.terms.title}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {dictionary.terms.lastUpdated}
                    </p>
                </div>

                <div className="bg-card rounded-xl p-8 border border-border space-y-8">
                    {dictionary.terms.sections.map((section: { title: string; content: string | string[] }, index: number) => (
                        <section key={index}>
                            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                            {Array.isArray(section.content) ? (
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    {section.content.map((item: string, itemIndex: number) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                            )}
                        </section>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-muted-foreground">
                        {dictionary.terms.contactInfo}
                    </p>
                    <a
                        href={`/${locale}/contact`}
                        className="text-primary hover:underline"
                    >
                        {dictionary.terms.contactLink}
                    </a>
                </div>
            </div>
        </div>
    );
}
