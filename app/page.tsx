import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-4 gap-4 justify-items-center">
      <div className="col-span-2"></div>

      <div className="order-first pt-20">
        <Image
          src="/3D-Logo-White-Crop.png"
          alt="Moon Control"
          width={200}
          height={200}
          className="w-60"
        />
      </div>

      <div className="pt-20">
        <Image
          src="/MAL_LOGO.svg"
          alt="Moon Ape Lab"
          width={200}
          height={200}
          className="w-60"
        />
      </div>
    </main>
  );
}
