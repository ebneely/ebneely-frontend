import { getDictionary, Locale } from "@/i18n";
import DarkVeil from "@/components/customUI/DarkVeil";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default async function ServicesPage({ params }: Props) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <section className="w-full min-h-screen overflow-hidden bg-background relative">
            <div className="h-[30vh] md:h-screen absolute top-0 left-0 w-full">
                <DarkVeil
                    hueShift={0}
                    noiseIntensity={0}
                    scanlineIntensity={0}
                    speed={0.5}
                    scanlineFrequency={0}
                    warpAmount={0}
                />
            </div>
            <div className="relative z-10 min-h-screen pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {dictionary.services.title}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {dictionary.services.subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {dictionary.services.items.map((service: { title: string; description: string; icon: string }, index: number) => (
                            <div
                                key={index}
                                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors group"
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground">{service.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-card rounded-xl p-8 border border-border mb-16">
                        <h2 className="text-2xl font-semibold mb-6 text-center">{dictionary.services.process.title}</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {dictionary.services.process.steps.map((step: { title: string; description: string }, index: number) => (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                        {index + 1}
                                    </div>
                                    <h4 className="font-semibold mb-2">{step.title}</h4>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">{dictionary.services.cta.title}</h2>
                        <p className="text-muted-foreground mb-6">{dictionary.services.cta.description}</p>
                        <a
                            href={`/${locale}/contact`}
                            className="inline-block py-3 px-8 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            {dictionary.services.cta.button}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
