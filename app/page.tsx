import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-4 py-8 md:p-24">
            <Image src="/img/hero.jpg" width={1024} height={256} alt="" className="rounded-2xl mx-auto"/>
        </main>
    )
}
