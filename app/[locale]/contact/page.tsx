import { getDictionary, Locale } from "@/i18n";
import DarkVeil from "@/components/customUI/DarkVeil";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default async function ContactPage({ params }: Props) {
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
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {dictionary.contact.title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {dictionary.contact.subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h3 className="text-xl font-semibold mb-4">{dictionary.contact.info.title}</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-primary">📧</span>
                                    <div>
                                        <p className="font-medium">{dictionary.contact.info.email}</p>
                                        <p className="text-muted-foreground">contact@ebneely.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-primary">📞</span>
                                    <div>
                                        <p className="font-medium">{dictionary.contact.info.phone}</p>
                                        <p className="text-muted-foreground">+966 XX XXX XXXX</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-primary">📍</span>
                                    <div>
                                        <p className="font-medium">{dictionary.contact.info.address}</p>
                                        <p className="text-muted-foreground">{dictionary.contact.info.addressValue}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h3 className="text-xl font-semibold mb-4">{dictionary.contact.hours.title}</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{dictionary.contact.hours.weekdays}</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{dictionary.contact.hours.weekend}</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl p-8 border border-border">
                        <h2 className="text-2xl font-semibold mb-6 text-center">{dictionary.contact.form.title}</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">{dictionary.contact.form.name}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder={dictionary.contact.form.namePlaceholder}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{dictionary.contact.form.email}</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder={dictionary.contact.form.emailPlaceholder}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{dictionary.contact.form.subject}</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder={dictionary.contact.form.subjectPlaceholder}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{dictionary.contact.form.message}</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    placeholder={dictionary.contact.form.messagePlaceholder}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                {dictionary.contact.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
