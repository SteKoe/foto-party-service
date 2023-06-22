import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Image src="/img/hero.jpg" width={1024} height={256} alt="" className="rounded-2xl mx-auto"/>
            <div className="w-8/12 p-5 mx-auto">
            </div>
        </main>
    )
}
