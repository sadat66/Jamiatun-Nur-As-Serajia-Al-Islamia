import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header-inner">
          {/* Left side - English & Bangla name */}
          <div className="header-left">
            <h1>Jamiatun Noor As-Sirajia Al-Islamia</h1>
            <div className="header-subtitle">Tejgaon, Dhaka - 1215, Bangladesh</div>
            <div className="header-bangla">
              জামিআ&apos;তুন নূর আস সিরাজিয়া আল ইসলামিয়া
            </div>
            <div className="header-location">তেজগাঁও, ঢাকা ১২১৫</div>
          </div>

          {/* Center logo */}
          <div className="header-logo">
            <Link href="/">
              <Image
                src="/logo/logo.jpeg"
                alt="Jamiatun Noor As-Sirajia Al-Islamia Logo"
                width={160}
                height={160}
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>
          </div>

          {/* Right side - Arabic calligraphy */}
          <div className="header-right">
            <Image
              src="/logo/caligraphy.png"
              alt="جامعة النور السراجية الإسلامية تيجغاؤن - ١٢١٥"
              width={400}
              height={100}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
