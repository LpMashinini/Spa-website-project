import "./Testemonials.css"
import test1 from "../../Assets/test1.jpg"
import test2 from "../../Assets/test2.jpg"
import test3 from "../../Assets/test3.jpg"
import test6 from "../../Assets/test6.jpg"
import test5 from "../../Assets/test5.jpg"


const Testimonials = () => {

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

            <div className="user-text">

              <p>
                From the moment I walked in, I felt at ease. The serene environment, coupled with expert
                massages, made my visit unforgettable. It’s definitely my new go-to for stress relief!
              </p>

              <span>James Rodriguez</span>
            </div>

            <div className="user-text active-text">
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
            <img src={test1} alt="User 1" className="user-pic" />
            <img src={test2} alt="User 2" className="user-pic" />
            <img src={test3} alt="User 3 active-pic" className="user-pic" />
            <img src={test6} alt="User 4" className="user-pic" />
            <img src={test5} alt="User 5" className="user-pic" />
          </div>

        </div>

      </div>

    </section>
  )
}

export default Testimonials
