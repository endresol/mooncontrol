// components/Footer.tsx
import FooterAuth from "./FooterAuth";

export default function Footer() {
  return (
    <footer className="mt-auto z-30">
      <div className="footer-content text-white p-6 flex justify-between items-center ">
        <FooterAuth />
        <div className="flex flex-col items-center z-20">
          <span className="text-4xl font-bold mb-1">STUDIO</span>
          <a href="https://moonapelab.io" className="text-white text-4xl">
            moonapelab.io
          </a>
        </div>
      </div>
    </footer>
  );
}
