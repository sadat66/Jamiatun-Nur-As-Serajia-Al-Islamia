"use client";

export default function VideoGallery() {
  const videos = [
    {
      title: "আপনার সন্তানকেও আরবীতে দক্ষ করতে আজই যোগাযোগ করুন",
      id: 1,
      youtubeId: "PVrTnHXcoTs",
    },
    {
      title: "আধুনিক ও দ্বীনি শিক্ষার সমন্বয়ে আপনার সন্তানের উজ্জ্বল ভবিষ্যৎ গড়ুন",
      id: 2,
      youtubeId: "h3y3kqt7SLk",
    },
    {
      title: "সহজ পদ্ধতিতে কুরআন ও ভাষা শিক্ষায় আমাদের বিশেষ আয়োজন",
      id: 3,
      youtubeId: "GSzSpptIhRg",
    },
  ];

  return (
    <section className="video-section" id="videos">
      <div className="container">
        <div className="section-title-alt">ভিডিও গ্যালারি</div>

        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="video-container" style={{ 
                borderRadius: "12px", 
                overflow: "hidden",
                position: "relative",
                paddingBottom: "56.25%", // 16:9 Aspect Ratio
                height: 0,
                background: "#000"
              }}>
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-card-label">{video.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

