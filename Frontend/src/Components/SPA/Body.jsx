import "./Body.css";
import aboutBg from "../../assets/about_us.jpg";
import stoneMassageImg from "../../assets/stone_massage.jpg";
import bodyMassageImg from "../../assets/body_massage.jpg";
import herbalTreatmentImg from "../../assets/herbal_treatment.jpg";
import team1 from "../../assets/p1.jpg";
import team2 from "../../assets/p2.jpg"
import team3 from "../../assets/p3.jpg";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Body = () => {

    return (

        <>

            <div className="body-container"  id="about">


                <div className="left-div">
                    <img src={aboutBg} alt="" />
                </div>
                <div className="right-div">
                    <h3>Get to know us</h3>
                    <p>
                        At Blissful & Balance we believe in the power of self-care to transform not just your appearance, but your overall well-being.
                        Our luxurious spa & beauty salon offers a range of premium treatments designed to rejuvenate, relax, and revitalize.
                        Whether you're looking to unwind with a soothing massage,
                        refresh your skin with a facial, or indulge in a full beauty makeover, our expert team of professionals is dedicated to delivering personalized services that cater to your unique needs.
                        Using only the finest products and the latest techniques, we ensure that every visit is an experience of complete relaxation and indulgence.
                    </p>
                </div>


            </div>

            <div className="service-section" id="Service">

                <span></span>
                <h1>what we're offering</h1>
                <span></span>

                <p>our treatment</p>

                <div className="service-container">

                    <div className="service-box">

                        <img src={stoneMassageImg} alt="" />
                        <div className="service-details">

                            <h3>Stone Massage</h3>
                            <p>
                                uses smooth, heated stones placed on specific points of the body. The heat helps to relax muscles, improve circulation,
                                and relieve tension. Cold stones may also be used to reduce inflammation and stimulate energy flow.
                            </p>

                            <button>book now</button>
                        </div>

                    </div>

                    <div className="service-box">

                        <img src={bodyMassageImg} alt="" />

                        <div className="service-details">
                            <h3>body massage</h3>
                            <p>
                                uses smooth, heated stones placed on specific points of the body. The heat helps to relax muscles, improve circulation,
                                and relieve tension. Cold stones may also be used to reduce inflammation and stimulate energy flow.
                            </p>
                            <button>book now</button>
                        </div>

                    </div>

                    <div className="service-box">

                        <img src={herbalTreatmentImg} alt="" />

                        <div className="service-details">
                            <h3>Herbal treatment</h3>
                            <p>
                                uses smooth, heated stones placed on specific points of the body. The heat helps to relax muscles, improve circulation,
                                and relieve tension. Cold stones may also be used to reduce inflammation and stimulate energy flow.
                            </p>
                            <button>book now</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Team section */}


            <section className="team-section">

                <div className="team-header-text">
                    <span className="team-span"></span>
                    <h1>our team</h1>
                    <span className="team-span"></span>

                    <p>We hire professional doctors, cosmetologists and masseurs with medical background who can take a good care of your body.</p>

                </div>

                <div className="team-container">

                    <div className="team-member">

                        <img src={team1} alt="" />

                        <div className="team-details">

                            <h3>Tracy Genaro</h3>
                            <p>Masseuse</p>

                            <div className="socials">
                                {/* social media icons  */}
                                  <InstagramIcon className="icons" />
                                 <FacebookIcon className="icons"  />
                                 <TwitterIcon  className="icons" />
                                 <LinkedInIcon  className="icons" />
                            </div>

                        </div>


                    </div>

                    <div className="team-member">

                        <img src={team2} alt="" />

                        <div className="team-details">

                            <h3>Mary Golden</h3>
                            <p>chiropractor</p>

                            <div className="socials">
                                {/* social media icons  */}
                                  <InstagramIcon className="icons"  />
                                 <FacebookIcon className="icons" />
                                 <TwitterIcon className="icons" />
                                 <LinkedInIcon className="icons" />
                            </div>

                        </div>

                    </div>

                    <div className="team-member">

                        <img src={team3} alt="" />

                        <div className="team-details">

                            <h3>Lindi Mahlangu</h3>
                            <p>cosmetologist</p>

                            <div className="socials">
                                {/* social media icons  */}
                                 <InstagramIcon className="icons"  />
                                 <FacebookIcon className="icons" />
                                 <TwitterIcon className="icons" />
                                 <LinkedInIcon className="icons" />
                            </div>

                        </div>


                    </div>


                </div>

            </section>

        </>

    )

}

export default Body
