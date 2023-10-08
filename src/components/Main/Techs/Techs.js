import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__container-title">7 технологий</h3>
        <p className="techs__container-subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__container-list">
          <li className="techs__container-item">HTML</li>
          <li className="techs__container-item">CSS</li>
          <li className="techs__container-item">JS</li>
          <li className="techs__container-item">React</li>
          <li className="techs__container-item">Git</li>
          <li className="techs__container-item">Express.js</li>
          <li className="techs__container-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
