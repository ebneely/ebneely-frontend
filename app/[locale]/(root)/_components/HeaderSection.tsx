import Silk from "@/app/(root)/_components/ui/Silk";
import ShinyText from "@/components/custom/ShinyText";
import CNavigationMenu from "@/components/custom/NavigationMenu";

function HeaderSection() {
    return (
        <section className=" w-full min-h-screen overflow-hidden bg-black">
            <div style={{width: '100%', height: '100vh', top: 0, left: 0}}>
                <Silk
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>

            <header
                className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 pb-6 pointer-events-none w-full max-w-[100vw]">
                <div
                    className="pointer-events-auto flex w-full items-center justify-between min-h-11 bg-black/20 backdrop-blur-xl rounded-full px-4 py-3 max-w-3xl mx-auto"
                    style={{WebkitBackdropFilter: "blur(24px)"}}
                    suppressHydrationWarning
                >
                    {/* Logo */}
                    <div
                        className="flex min-w-0 items-center justify-start overflow-visible m-0 p-0"
                        role="img"
                        aria-label="Core Agency"
                        suppressHydrationWarning
                    >
                        <ShinyText
                            text={"hi"}
                            speed={3}
                            delay={0}
                            color="#b5b5b5"
                            shineColor="#ffffff"
                            spread={120}
                            direction="left"
                            yoyo={false}
                            pauseOnHover={false}
                            disabled={false}
                            className="cursor-pointer text-2xl font-bold tracking-tight leading-tight m-0 p-0 align-baseline"
                        />
                    </div>

                    {/* Nav */}
                    <div className="flex items-center justify-center">
                        <CNavigationMenu />
                    </div>
                </div>

                {/* Language Switcher - Absolute Positioned */}
                <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 pointer-events-auto z-50">

                </div>
            </header>
        </section>

    );
}

export default HeaderSection;