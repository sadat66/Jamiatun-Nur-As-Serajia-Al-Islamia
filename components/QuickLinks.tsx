export default function QuickLinks() {
  const links = [
    { label: "পরিচিতি", href: "#" },
    { label: "ইতিহাস", href: "#" },
    { label: "লক্ষ্য ও উদ্দেশ্য", href: "#" },
    { label: "বিভাগ", href: "#" },
  ];

  return (
    <section className="quick-links" id="quick-links">
      <div className="container">
        <div className="quick-links-grid">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="quick-link-item">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
