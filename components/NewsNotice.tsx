"use client";

import { useState, useEffect } from "react";

interface PostItem {
  id: string;
  title: string;
  content?: string | null;
  createdAt: string;
  type?: "NEWS" | "NOTICE";
}

const INITIAL_LIMIT = 5;
const EXPAND_LIMIT = 50;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsNotice() {
  const [newsItems, setNewsItems] = useState<PostItem[]>([]);
  const [noticeItems, setNoticeItems] = useState<PostItem[]>([]);
  const [totalNews, setTotalNews] = useState(0);
  const [totalNotice, setTotalNotice] = useState(0);
  const [expandedNews, setExpandedNews] = useState(false);
  const [expandedNotice, setExpandedNotice] = useState(false);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingNotice, setLoadingNotice] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PostItem | null>(null);
  const [detailPost, setDetailPost] = useState<PostItem | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    async function fetchInitial() {
      try {
        const [newsRes, noticeRes] = await Promise.all([
          fetch(`/api/posts?type=NEWS&limit=${INITIAL_LIMIT}&page=1`),
          fetch(`/api/posts?type=NOTICE&limit=${INITIAL_LIMIT}&page=1`),
        ]);
        const newsData = await newsRes.json();
        const noticeData = await noticeRes.json();
        if (newsData.posts) {
          setNewsItems(newsData.posts);
          setTotalNews(newsData.total ?? 0);
        }
        if (noticeData.posts) {
          setNoticeItems(noticeData.posts);
          setTotalNotice(noticeData.total ?? 0);
        }
      } catch {
        // ignore
      } finally {
        setLoadingNews(false);
        setLoadingNotice(false);
      }
    }
    fetchInitial();
  }, []);

  const loadMoreNews = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingNews(true);
    try {
      const res = await fetch(`/api/posts?type=NEWS&limit=${EXPAND_LIMIT}&page=1`);
      const data = await res.json();
      if (data.posts) {
        setNewsItems(data.posts);
        setExpandedNews(true);
      }
    } catch {
      // ignore
    } finally {
      setLoadingNews(false);
    }
  };

  const loadMoreNotice = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingNotice(true);
    try {
      const res = await fetch(`/api/posts?type=NOTICE&limit=${EXPAND_LIMIT}&page=1`);
      const data = await res.json();
      if (data.posts) {
        setNoticeItems(data.posts);
        setExpandedNotice(true);
      }
    } catch {
      // ignore
    } finally {
      setLoadingNotice(false);
    }
  };

  const showMoreNews = totalNews > INITIAL_LIMIT && !expandedNews;
  const showMoreNotice = totalNotice > INITIAL_LIMIT && !expandedNotice;

  // When user selects an item, fetch full post for detail (ensures we have content)
  useEffect(() => {
    if (!selectedItem) {
      setDetailPost(null);
      return;
    }
    setLoadingDetail(true);
    setDetailPost(selectedItem);
    fetch(`/api/posts/${selectedItem.id}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) setDetailPost(data);
      })
      .catch(() => {})
      .finally(() => setLoadingDetail(false));
  }, [selectedItem?.id]);

  return (
    <section className="news-notice-section" id="news-notice">
      <div className="container">
        <div className="news-notice-grid">
          {/* News Panel - expands in place, no new page */}
          <div className="news-panel">
            <div className="panel-header">📰 সংবাদ</div>
            <div className={`panel-body ${expandedNews ? "panel-body-expanded" : ""}`}>
              {loadingNews && newsItems.length === 0 ? (
                <div className="news-notice-loading">লোড হচ্ছে...</div>
              ) : newsItems.length === 0 ? (
                <div className="news-notice-empty">কোনো সংবাদ নেই</div>
              ) : (
                newsItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="news-item news-item-clickable"
                    onClick={() => setSelectedItem({ ...item, type: "NEWS" })}
                  >
                    <div className="news-item-inner">
                      <span className="news-item-title-truncate">{item.title}</span>
                      <span className="item-date">{formatDate(item.createdAt)}</span>
                    </div>
                  </button>
                ))
              )}
              {showMoreNews && (
                <button
                  type="button"
                  className="news-notice-more-btn"
                  onClick={loadMoreNews}
                  disabled={loadingNews}
                >
                  {loadingNews ? "লোড হচ্ছে..." : "আরও দেখুন"}
                </button>
              )}
            </div>
          </div>

          {/* Notice Panel - expands in place, no new page */}
          <div className="notice-panel">
            <div className="panel-header">📌 নোটিশ</div>
            <div className={`panel-body ${expandedNotice ? "panel-body-expanded" : ""}`}>
              {loadingNotice && noticeItems.length === 0 ? (
                <div className="news-notice-loading">লোড হচ্ছে...</div>
              ) : noticeItems.length === 0 ? (
                <div className="news-notice-empty">কোনো নোটিশ নেই</div>
              ) : (
                noticeItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="notice-item notice-item-clickable"
                    onClick={() => setSelectedItem({ ...item, type: "NOTICE" })}
                  >
                    <div className="news-item-inner">
                      <span className="news-item-title-truncate">{item.title}</span>
                      <span className="item-date">{formatDate(item.createdAt)}</span>
                    </div>
                  </button>
                ))
              )}
              {showMoreNotice && (
                <button
                  type="button"
                  className="news-notice-more-btn"
                  onClick={loadMoreNotice}
                  disabled={loadingNotice}
                >
                  {loadingNotice ? "লোড হচ্ছে..." : "আরও দেখুন"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Detail section when a news/notice is selected */}
        {selectedItem && (
          <div className="news-notice-detail">
            <div className="news-notice-detail-card">
              <div className="news-notice-detail-header">
                <span className="news-notice-detail-badge">
                  {detailPost?.type === "NEWS" ? "📰 সংবাদ" : "📌 নোটিশ"}
                </span>
                <button
                  type="button"
                  className="news-notice-detail-close"
                  onClick={() => setSelectedItem(null)}
                  aria-label="বন্ধ করুন"
                >
                  ✕ বন্ধ করুন
                </button>
              </div>
              {loadingDetail ? (
                <p className="news-notice-detail-loading">লোড হচ্ছে...</p>
              ) : detailPost ? (
                <>
                  <h3 className="news-notice-detail-title">{detailPost.title}</h3>
                  <p className="news-notice-detail-date">
                    {formatDate(detailPost.createdAt)}
                  </p>
                  {detailPost.content && (
                    <div className="news-notice-detail-content">
                      {detailPost.content}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
