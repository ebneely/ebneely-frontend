import Silk from "@/app/[locale]/(root)/_components/ui/Silk";

function HeaderSection() {
    return (
        <section className=" w-full min-h-screen overflow-hidden bg-background">
            <div style={{ width: '100%', height: '100vh', top: 0, left: 0 }}>
                <Silk
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>
        </section>

    );
}



export default HeaderSection;
