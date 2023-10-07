import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__container_title">7 технологий</h3>
        <p className="techs__container_subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__container_list">
          <li className="techs__container_item">HTML</li>
          <li className="techs__container_item">CSS</li>
          <li className="techs__container_item">JS</li>
          <li className="techs__container_item">React</li>
          <li className="techs__container_item">Git</li>
          <li className="techs__container_item">Express.js</li>
          <li className="techs__container_item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
