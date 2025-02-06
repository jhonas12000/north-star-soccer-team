import React from "react";
import backgroundImage from '../images/backgroundImage.jpg';
//import backgroundImage from '../images/backgroundImage.jpg';


const Home: React.FC = () => {



const backgroundImage = new URL("../images/backgroundImage.jpg", import.meta.url )
return (
  <div
    className="relative w-full h-screen bg-cover bg-center"
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to North Star Soccer Team
        </h1>
        <p className="text-lg md:text-2xl">
          Discover amazing features and content here.
        </p>
      </div>
    </div>
    
  </div>
);
};

export default Home;