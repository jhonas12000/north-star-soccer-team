import React from "react";

const About: React.FC = () => {
  return (
    <section id="about" className="bg-gray-200 py-10 shadow-md">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700">
          Welcome to Soccer Stars! We are a professional soccer team with a passion for the game.
        </p>
      </div>
    </section>
  );
};

export default About;