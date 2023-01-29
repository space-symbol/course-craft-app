import React from 'react';
import Container from "../../components/container/Container";
import "./course.css"


const Course = () => {
    const courses = {
        id: 1,
        img: "https://248006.selcdn.ru/LandGen/desktop_57c9d80b2b75745579f68b99bdd0e2c0516a955f.webp",
        title: "Fullstack-разработчик на Java",
        description: "Разрабатывать и поддерживать приложения на Spring.",
        about: "Вы с нуля освоите востребованный язык программирования, научитесь создавать качественные приложения под разные платформы и станете ценным Java-специалистом уровня middle.",
    }
    return (
        <Container>
            <div className="course">
                <section className="course-about">
                    <h1 className="course-about__title">{courses.title}</h1>
                    <section className="course-about__text">
                        {courses.about}
                    </section>
                </section>
                <img className="course__img" src={courses.img} alt="img"/>
            </div>
        </Container>
    );
};

export default Course;
