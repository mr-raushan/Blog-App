import React from "react";
import { useAuth } from "../context/AuthProvider";

export default function About() {
  const { profile } = useAuth();
  // console.log(profile);

  return (
    <div className="container mx-auto md:px-32 mt-16">
      <div>
        <h1 className="text-2xl font-bold px-5 md:px-0">About</h1>
        <p className="text-lg my-5 px-5 text-justify md:px-0">
          This is <strong>{profile?.user?.name}</strong> a proficient full stack
          developer with a robust skill set spanning both front-end and back-end
          technologies. With a passion for building dynamic, responsive, and
          user-friendly web applications, Raushan excels in crafting seamless
          digital experiences
        </p>
        <div className="my-5">
          <h1 className="text-2xl font-bold text-blue-800 px-5 md:px-0">
            Technical Expertise:
          </h1>
          <p className="mt-5 text-lg px-5 text-justify md:px-0">
            Front-end: Adapt in modern JavaScript framewroks and libraries such
            as React js, Angular, and Vue.js. Skilled in HTML5, CSS3, and
            responsive design principles to create intuitive and visually
            appealing interfaces. Back-End: Proficient in server-side
            technologies including Node.js, Express.js, and Django. Experienced
            with database management using SQL and NoSQL databases like MySQL,
            PostgreSQL, and MongoDB. DevOps: Knowledgeable in containerization
            and orchestration tools such as Docker and Kubernetes. Familiar with
            continuous integration and deployment (CI/CD) pipelines. Cloud
            Services: Experience with cloud platforms like AWS, Azure, and
            Google Cloud, enabling scalable and reliable application deployment.
          </p>
        </div>
        <div className="my-5">
          <h1 className="font-bold text-2xl text-blue-800 px-5 md:px-0 ">
            Professional Highlights :
          </h1>
          <p className="text-lg mt-5 px-5 text-justify md:px-0">
            Successfully developed and deployed numerous full-stack
            applications, demonstrating strong problem-solving skills and a keen
            eye for detail. Collaborated with cross-functional teams to deliver
            high-quality software solutions within tight deadlines. Continuously
            learning and adapting to emerging technologies and industry trends
            to stay ahead in the fast-evolving tech landscape.
          </p>

          <p className="mt-8 font-semibold text-justify px-5 md:px-0">
            Raushan Kumar is dedicated to leveraging his expertise to contribute
            to innovative projects and drive technological advancements. Whether
            working on front-end interfaces or back-end logic, he is passionate
            about delivering exceptional digital solutions that meet user needs
            and exceed client expectations.
          </p>
        </div>
        <div className="my-5 mb-10">
          <h1 className="text-2xl font-bold text-blue-800 px-5 md:px-0">
            Personal Interest & Inspiration
          </h1>
          <p className="mt-5 text-justify px-5 md:px-0">
            Beyond his professional achievements, Akhil is a big fan of cricket
            and holds immense admiration for <strong> hitman Rohit.</strong> His
            favorite person and biggest inspiration is his twin brother,{" "}
            <strong>Ankush.</strong> Their friendly rivalry and deep bond have
            significantly shaped Raushan’s journey. Ankush is not only a great
            competitor but also a steadfast friend, constantly motivating Akhil
            to strive for excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
