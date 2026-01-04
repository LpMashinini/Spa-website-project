import { useEffect } from "react"
import "./Testimonials.css"

const Testimonials = () => {

  const openReview = (e) => {

    let userTexts = document.querySelectorAll(".user-text");
    let users = document.querySelectorAll(".user-review");

    for (let userText of userTexts) {
      userText.classList.remove("active-text")
    }

    for (let user of users) {
      user.classList.remove("active-pic")
    }

    let i = Array.from(users).indexOf(e.currentTarget);

    

    users[i].classList.add("active-pic");
    userTexts[i].classList.add("active-text");

  }


  return (

    <section className="testimonials">


      <div className="testimonials-container">

        <div className="testimonials-header-text">

          <span></span>
          <h2>testimonials</h2>
          <span></span>

          <p>
            our customers's review.
          </p>

        </div>


        <div className="testimonial">

          <div className="testimonials-text left-slide">

            <div className="user-text active-text">

              <p>
                From the moment I walked in, I felt at ease. The serene environment, coupled with expert
                massages, made my visit unforgettable. It’s definitely my new go-to for stress relief!
              </p>

              <span>James Rodriguez</span>
            </div>

            <div className="user-text">
              <p>
                I couldn’t have asked for a better spa experience. The services were amazing, and the
                peaceful setting made it easy to forget about the world. A must-try if you're in need of
                relaxation!
              </p>

              <span>Lionel Messi</span>

            </div>

            <div className="user-text">

              <p>
                Blissful & Balance Spa offers a peaceful oasis away from the hustle and bustle. The
                treatments are customized to your needs, and I felt incredibly pampered. Definitely worth
                the visit!
              </p>

              <span>Peter Matshinini</span>

            </div>

            <div className="user-text">

              <p>
                I had a wonderful experience at Blissful & Balance Spa. The staff was welcoming, and the spa
                itself is beautifully designed. My massage was exactly what I needed to relax and reset.
                I'll be back soon!
              </p>

              <span>Tshepang Mhlangu</span>
            </div>

            <div className="user-text">

              <p>
                Blissful & Balance Spa is the perfect place to unwind. The ambiance is calming, the staff is
                professional, and the treatments are top-notch. I left feeling rejuvenated and completely
                relaxed. Highly recommend it!
              </p>

              <span>Letlhogonolo sechaba</span>
            </div>

          </div>

          <div className="testimonials-pic btn">
            <div className="user-review active-pic" onClick={openReview}>
              <span>JR</span>
            </div>
            <div className="user-review" onClick={openReview}>
              <span>LM</span>
            </div>
            <div className="user-review" onClick={openReview}>
              <span>PM</span>
            </div>
            <div className="user-review" onClick={openReview}>
              <span>TM</span>
            </div>
            <div className="user-review" onClick={openReview}>
              <span>LS</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Testimonials
