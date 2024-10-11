import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen relative">
      <div className="w-1/2 text-center mt-8">
        <h1 className="text-4xl font-bold mb-6 text-primary">
          Embark on a Cosmic Journey with your Moon Apes
        </h1>
      </div>

      <div className="mooncontrol absolute left-4 top-1/3 transform -translate-y-1/2 w-1/4">
        <Image
          src="/3D_Logo_Final.svg"
          alt="Moon Control"
          width={200}
          height={200}
          className="w-full h-auto"
        />
      </div>

      <div className="mooncontrol absolute right-4 top-1/3 transform -translate-y-1/2 w-1/4">
        <Image
          src="/MAL_LOGO.svg"
          alt="Moon Ape Lab"
          width={200}
          height={200}
          className="w-full h-auto"
        />
      </div>
    </main>
  );
}
