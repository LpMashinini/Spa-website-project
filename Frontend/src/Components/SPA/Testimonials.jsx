
import { useState } from "react";
import "./Testimonials.css";

const reviews = [
  {
    initials: "JR",
    name: "James Rodriguez",
    review:
      "From the moment I walked in, I felt at ease. The serene environment, coupled with expert massages, made my visit unforgettable. It’s definitely my new go-to for stress relief!",
  },
  {
    initials: "LM",
    name: "Lionel Messi",
    review:
      "I couldn’t have asked for a better spa experience. The services were amazing, and the peaceful setting made it easy to forget about the world. A must-try if you're in need of relaxation!",
  },
  {
    initials: "PM",
    name: "Peter Matshinini",
    review:
      "Blissful & Balance Spa offers a peaceful oasis away from the hustle and bustle. The treatments are customized to your needs, and I felt incredibly pampered. Definitely worth the visit!",
  },
  {
    initials: "TM",
    name: "Tshepang Mhlangu",
    review:
      "I had a wonderful experience at Blissful & Balance Spa. The staff was welcoming, and the spa itself is beautifully designed. My massage was exactly what I needed to relax and reset. I'll be back soon!",
  },
  {
    initials: "LS",
    name: "Letlhogonolo Sechaba",
    review:
      "Blissful & Balance Spa is the perfect place to unwind. The ambiance is calming, the staff is professional, and the treatments are top-notch. I left feeling rejuvenated and completely relaxed. Highly recommend it!",
  },
];

const Testimonials = () => {
  const [activeReview, setActiveReview] = useState(0);
  const currentReview = reviews[activeReview];

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-container">
        <header className="testimonials-header-text">
          <span className="testimonials-divider" aria-hidden="true" />

          <p className="testimonials-eyebrow">KIND WORDS FROM OUR CLIENTS</p>

          <h2 id="testimonials-title">Testimonials</h2>

          <p className="testimonials-subtitle">
            Real moments of relaxation, care, and balance.
          </p>

          <span className="testimonials-divider" aria-hidden="true" />
        </header>

        <div className="testimonial">
          <div className="testimonial-quote-mark" aria-hidden="true">
            “
          </div>

          <div className="testimonials-text" aria-live="polite" aria-atomic="true">
            <p className="testimonial-review">
              {currentReview.review}
            </p>

            <div className="testimonial-author">
              <span className="testimonial-author-line" aria-hidden="true" />
              <h3>{currentReview.name}</h3>
              <p>Valued Client</p>
            </div>
          </div>

          <div className="testimonials-pic" aria-label="Choose a customer review">
            {reviews.map((review, index) => (
              <button
                key={review.initials}
                type="button"
                className={`user-review ${
                  activeReview === index ? "active-pic" : ""
                }`}
                onClick={() => setActiveReview(index)}
                aria-pressed={activeReview === index}
                aria-label={`Read review by ${review.name}`}
                title={review.name}
              >
                <span>{review.initials}</span>
              </button>
            ))}
          </div>

          <p className="testimonial-counter">
            {String(activeReview + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            {String(reviews.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
