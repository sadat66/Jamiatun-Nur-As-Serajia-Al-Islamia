import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-inner">
          {/* Left - Image Carousel */}
          <div className="hero-carousel">
            <Image
              src="/hero/image.png"
              alt="Jamiatun Noor As-Sirajia Al-Islamia Conference"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <button className="carousel-btn prev" aria-label="Previous">
              ‹
            </button>
            <button className="carousel-btn next" aria-label="Next">
              ›
            </button>
          </div>

          {/* Right - About Text */}
          <div className="hero-about">
            <h2>জামিআ&apos;তুন নূর আস সিরাজিয়া আল ইসলামিয়া: সংক্ষিপ্ত পরিচিতি</h2>
            <p>
              জামিআ&apos;তুন নূর আস সিরাজিয়া আল ইসলামিয়া রাজধানী ঢাকার প্রাণকেন্দ্র তেজগাঁওয়ে (ঢাকা ১২১৫) অবস্থিত একটি ঐতিহ্যবাহী দ্বীনি শিক্ষা প্রতিষ্ঠান। অতি অল্প সময়েই এই প্রতিষ্ঠানটি তার উন্নত শিক্ষা পদ্ধতি এবং আধ্যাত্মিক পরিবেশের জন্য বিশেষ পরিচিতি লাভ করেছে। কুরআন, সুন্নাহ এবং সমকালীন প্রয়োজনীয় শিক্ষার সমন্বয়ে এখানে আগামী দিনের দক্ষ ও আদর্শবান আলেম তৈরির প্রচেষ্টা চালানো হয়।
            </p>
            <p style={{ marginTop: "12px" }}>
              ঢাকার এই জামিআটি শুধু একটি মাদরাসাই নয়, এটি একটি আধ্যাত্মিক সংস্কার কেন্দ্র। ছাত্রদের মেধা ও যোগ্যতার সঠিক বিকাশের পাশাপাশি নৈতিক চরিত্র গঠনে আমরা সদা সচেষ্ট। দ্বীনের সঠিক শিক্ষা প্রচারের মাধ্যমে দেশ ও জাতির সেবায় একনিষ্ঠ একদল যোগ্য কারিগর গড়ে তোলাই আমাদের প্রধান লক্ষ্য।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

