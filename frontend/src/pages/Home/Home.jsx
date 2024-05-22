import React from "react";
import "./Home.css";
export const Home = () => {
  return (
    <div className="home-container">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://ftl-media.imgix.net/applicationpage_towrecovery_hero_628x380.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md white">
            <h1 className="mb-5 text-5xl font-bold">TwoPro</h1>
            <p className="mb-5 white">
              Welcome to TowPro, where cutting-edge technology meets
              unparalleled efficiency in every tow. Our advanced GPS systems
              ensure swift response times and seamless operations, allowing us
              to reach you faster and provide the assistance you need, when you
              need it. Trust in our commitment to employing the latest
              technological innovations for a smoother, more reliable towing
              experience.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};
