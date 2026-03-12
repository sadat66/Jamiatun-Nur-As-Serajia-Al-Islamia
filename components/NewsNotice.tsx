export default function NewsNotice() {
  const newsItems = [
    {
      title: "মাদরাসার বার্ষিক মাহফিলের তারিখ ঘোষণা",
      date: "১০ মার্চ, ২০২৬",
    },
    {
      title: "নতুন শিক্ষাবর্ষের ভর্তি কার্যক্রম শুরু",
      date: "০৫ মার্চ, ২০২৬",
    },
    {
      title: "দাওরায়ে হাদীসের ফলাফল প্রকাশিত",
      date: "০১ মার্চ, ২০২৬",
    },
    {
      title: "আন্তর্জাতিক ইসলামী সম্মেলনে অংশগ্রহণ",
      date: "২৫ ফেব্রুয়ারি, ২০২৬",
    },
    {
      title: "মাসিক ইসলামী মাহফিলের আয়োজন",
      date: "২০ ফেব্রুয়ারি, ২০২৬",
    },
  ];

  const noticeItems = [
    {
      title: "রমজান মাসের সময়সূচি পরিবর্তন সংক্রান্ত বিজ্ঞপ্তি",
      date: "০৮ মার্চ, ২০২৬",
    },
    {
      title: "পরীক্ষার সময়সূচি প্রকাশিত - সকল বিভাগ",
      date: "০৩ মার্চ, ২০২৬",
    },
    {
      title: "ছাত্রাবাসে নতুন নিয়মাবলী জারি",
      date: "২৮ ফেব্রুয়ারি, ২০২৬",
    },
    {
      title: "লাইব্রেরি সংস্কার কাজ সম্পন্ন - পুনরায় চালু",
      date: "২২ ফেব্রুয়ারি, ২০২৬",
    },
    {
      title: "বৃত্তি প্রদানের জন্য আবেদনপত্র গ্রহণ চলছে",
      date: "১৫ ফেব্রুয়ারি, ২০২৬",
    },
  ];

  return (
    <section className="news-notice-section" id="news-notice">
      <div className="container">
        <div className="news-notice-grid">
          {/* News Panel */}
          <div className="news-panel">
            <div className="panel-header">📰 সংবাদ</div>
            <div className="panel-body">
              {newsItems.map((item, i) => (
                <div key={i} className="news-item">
                  <div>
                    {item.title}
                    <span className="item-date">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notice Panel */}
          <div className="notice-panel">
            <div className="panel-header">📌 নোটিশ</div>
            <div className="panel-body">
              {noticeItems.map((item, i) => (
                <div key={i} className="notice-item">
                  <div>
                    {item.title}
                    <span className="item-date">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
