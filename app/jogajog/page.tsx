import Link from "next/link";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";

export const metadata = {
  title: "যোগাযোগ | জামিআ'তুন নূর আস সিরাজিয়া আল ইসলামিয়া",
  description:
    "জামিআ'তুন নূর আস সিরাজিয়া আল ইসলামিয়া - ঠিকানা, ফোন, সোশ্যাল মিডিয়া ও গুগল ম্যাপে আমাদের খুঁজুন।",
};

const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "ফেসবুক",
    href: "https://www.facebook.com/profile.php?id=61555232242818",
    icon: "facebook",
  },
  {
    id: "whatsapp",
    label: "হোয়াটসঅ্যাপ",
    href: "https://wa.me/8801729165479",
    icon: "whatsapp",
  },
  {
    id: "youtube",
    label: "ইউটিউব",
    href: "https://www.youtube.com/channel/UCaf_Cj3LzK7T2YzuBuSqVwA",
    icon: "youtube",
  },
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3651.3007618700153!2d90.3948534!3d23.772302!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c71286eba28f%3A0xf767efa9c037ac02!2zSmFtaWF0dW4gTnVyIEFzIFNlcmFqaWEgQWwgSXNsYW1pYSAo4Kay4Ka_4Kaa4KeB4Kas4Ka-4KaX4Ka-4KaoIOCmj-CmsOCmvuCmrOCmv-CmlSDgpq7gpr7gpqbgprDgpr7gprjgpr4p!5e0!3m2!1sen!2sbd!4v1773562417807!5m2!1sen!2sbd";

export default function JogajogPage() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <section className="page-content-section jogajog-section">
          <div className="container">
            <Link href="/" className="back-link">
              ← হোম
            </Link>
            <h1 className="page-title">যোগাযোগ</h1>

            <div className="jogajog-grid">
              <div className="jogajog-card">
                <h2 className="jogajog-card-title">সোশ্যাল মিডিয়া</h2>
                <p className="jogajog-card-desc">
                  আমাদের ফেসবুক পেজ, ইউটিউব চ্যানেল ও হোয়াটসঅ্যাপে যুক্ত থাকুন।
                </p>
                <div className="jogajog-social-links">
                  {SOCIAL_LINKS.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`jogajog-social-link jogajog-social-${item.icon}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="jogajog-card">
                <h2 className="jogajog-card-title">হোয়াটসঅ্যাপ / ফোন</h2>
                <p className="jogajog-card-desc">
                  সরাসরি কল বা মেসেজ করতে চাইলে নিচের নম্বরে যোগাযোগ করুন।
                </p>
                <a
                  href="https://wa.me/8801729165479"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jogajog-phone-link"
                >
                  ০১৭২৯-১৬৫৪৭৯
                </a>
              </div>
            </div>

            <div className="jogajog-map-block">
              <h2 className="jogajog-card-title">ঠিকানা ও মানচিত্র</h2>
              <p className="jogajog-card-desc">
                জামিআ&apos;তুন নূর আস সিরাজিয়া আল ইসলামিয়া, তেজগাঁও, ঢাকা ১২১৫। গুগল ম্যাপে দেখুন ও দিকনির্দেশনা নিন।
              </p>
              <div className="jogajog-map-embed-wrap">
                <iframe
                  src={MAP_EMBED_SRC}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="জামিআ'তুন নূর আস সিরাজিয়া আল ইসলামিয়া অবস্থান"
                  className="jogajog-map-iframe"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Jamiatun+Nur+As+Serajia+Al+Islamia+(%E0%A6%B2%E0%A6%BF%E0%A6%9A%E0%A7%81%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A6%BE%E0%A6%A8+%E0%A6%8F%E0%A6%B0%E0%A6%BE%E0%A6%AC%E0%A6%BF%E0%A6%95+%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE)/@23.772302,90.3948534,17z/data=!4m6!3m5!1s0x3755c71286eba28f:0xf767efa9c037ac02!8m2!3d23.7722971!4d90.3974283!16s%2Fg%2F11ytqrtwvc?entry=tts"
                target="_blank"
                rel="noopener noreferrer"
                className="jogajog-map-open-link"
              >
                গুগল ম্যাপে খুলুন
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingSocial />
    </>
  );
}
