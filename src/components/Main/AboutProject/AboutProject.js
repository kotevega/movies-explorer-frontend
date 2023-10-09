import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project" id="about_project">
      <h2 className="project__title">О проекте</h2>
      <div className="project-container">
        <div className="project-full-case">
          <div className="project-case">
            <h3 className="project-case__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="project-case__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="project-case">
            <h3 className="project-case__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project-case__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <ul className="project-develop">
          <li className="project-develop__container">
            <p className="project-develop__time">1 неделя</p>
            <p className="project-develop__time project-develop__time_black_size-xl">
              4 недели
            </p>
          </li>
          <li className="project-develop__container">
            <p className="project-develop__text">Back-end</p>
            <p className="project-develop__text project-develop__text_size-xl">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
