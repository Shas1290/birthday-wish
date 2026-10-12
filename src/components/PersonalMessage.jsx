import React, { useEffect, useRef, useState } from 'react';
import config from '../config.js';
import './PersonalMessage.css';

export default function PersonalMessage() {
  const { personalMessage, senderName } = config;
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, keep it visible
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  const paragraphs = personalMessage?.paragraphs || [];
  const title = personalMessage?.title || "Tumhare Liye, Dil Se... 💌";

  // Decorative floating background elements
  const floatingElements = [
    { id: 1, symbol: '🌸', className: 'petal-1' },
    { id: 2, symbol: '💕', className: 'heart-1' },
    { id: 3, symbol: '✨', className: 'sparkle-1' },
    { id: 4, symbol: '💖', className: 'heart-2' },
    { id: 5, symbol: '🌷', className: 'petal-2' },
    { id: 6, symbol: '💗', className: 'heart-3' },
  ];

  return (
    <section className="personal-message-section" aria-label="Personal Birthday Message">
      {/* Floating decorative ambient background elements */}
      <div className="personal-floating-bg" aria-hidden="true">
        {floatingElements.map((item) => (
          <span key={item.id} className={`floating-symbol ${item.className}`}>
            {item.symbol}
          </span>
        ))}
      </div>

      <div className="personal-container">
        <article
          ref={cardRef}
          className={`letter-card ${isVisible ? 'letter-visible' : ''}`}
        >
          {/* Top Wax Seal / Stamp Ornament */}
          <div className="letter-seal-container" aria-hidden="true">
            <div className="wax-seal">
              <span className="seal-emblem">💌</span>
            </div>
            <div className="seal-ribbon ribbon-left"></div>
            <div className="seal-ribbon ribbon-right"></div>
          </div>

          {/* Letter Header */}
          <header className="letter-header">
            <h2 className="letter-title">{title}</h2>
            <div className="letter-sub-divider" aria-hidden="true">
              <span className="divider-line"></span>
              <span className="divider-heart">♥</span>
              <span className="divider-line"></span>
            </div>
          </header>

          {/* Letter Body - Paragraphs with staggered reveal */}
          <div className="letter-body">
            {paragraphs.map((para, index) => (
              <p
                key={index}
                className={`letter-paragraph ${isVisible ? 'para-animate' : ''}`}
                style={{
                  transitionDelay: `${250 + index * 200}ms`,
                  animationDelay: `${250 + index * 200}ms`,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Bottom Card Footer / Sign-off & Decorative Flourish */}
          <footer className="letter-footer">
            <div className="letter-divider" aria-hidden="true">
              <span className="flourish">❦</span>
              <span className="flourish-bar"></span>
              <span className="flourish">❦</span>
            </div>
            {senderName && (
              <div
                className={`letter-signature ${isVisible ? 'para-animate' : ''}`}
                style={{
                  transitionDelay: `${300 + paragraphs.length * 200}ms`,
                  animationDelay: `${300 + paragraphs.length * 200}ms`,
                }}
              >
                <span className="signature-with-love">Hamesha tumhara,</span>
                <span className="signature-name">{senderName}</span>
              </div>
            )}
          </footer>
        </article>
      </div>
    </section>
  );
}
