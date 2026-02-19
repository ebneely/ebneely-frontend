import { getDictionary, Locale } from "@/i18n";
import DarkVeil from "@/components/customUI/DarkVeil";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default async function RoadmapPage({ params }: Props) {
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
                            {dictionary.roadmap.title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {dictionary.roadmap.subtitle}
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

                        <div className="space-y-12">
                            {dictionary.roadmap.phases.map((phase: { title: string; description: string; status: string; items: string[] }, index: number) => (
                                <div
                                    key={index}
                                    className={`relative flex items-start gap-6 ${
                                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                                >
                                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary md:-translate-x-1/2 mt-1.5" />

                                    <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                                        <div className="bg-card rounded-xl p-6 border border-border">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        phase.status === "completed"
                                                            ? "bg-green-500/20 text-green-500"
                                                            : phase.status === "in_progress"
                                                            ? "bg-yellow-500/20 text-yellow-500"
                                                            : "bg-blue-500/20 text-blue-500"
                                                    }`}
                                                >
                                                    {phase.status === "completed"
                                                        ? dictionary.roadmap.status.completed
                                                        : phase.status === "in_progress"
                                                        ? dictionary.roadmap.status.inProgress
                                                        : dictionary.roadmap.status.planned}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                                            <p className="text-muted-foreground mb-4">{phase.description}</p>
                                            <ul className="space-y-2">
                                                {phase.items.map((item: string, itemIndex: number) => (
                                                    <li key={itemIndex} className="flex items-start gap-2">
                                                        <span className="text-primary mt-1">✓</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
