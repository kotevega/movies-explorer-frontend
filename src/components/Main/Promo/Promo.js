import "./Promo.css";
import mainIllustration from "../../../images/main_promo.svg";
import { Link } from "react-scroll";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      <p className="promo__phrase">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <img
        className="promo__main-illustration"
        src={mainIllustration}
        alt="планета Земля из надписей web"
      ></img>
      <Link
        to="about_project"
        className="promo__learn-more"
        spy={true}
        smooth={true}
        duration={500}
      >
        Узнать больше
      </Link>
    </section>
  );
}

export default Promo;
