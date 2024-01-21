import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from "../../components/Button";

const Home = () => {
  const navigate = useNavigate();

  const [cookies, _] = useCookies(["access_token"]);

  const redirectToAuth = () => {
    cookies.access_token ? navigate("/saved-notes") : navigate("/auth");
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center mx-8">
        <h1 className="text-7xl md:text-8xl font-bold">Welcome to</h1>
        <h1 className="text-7xl  md:text-8xl font-bold">Jotted</h1>
        <h1 className="text-3xl md:text-4xl my-8">
          Your Ultimate Developer Companion
        </h1>
        <p className="text-lg mb-8">The Note-Taking App for Web Developers.</p>
        <Button
          label={"Get Started -->"}
          variant={"primary"}
          onClick={redirectToAuth}
        />
      </div>
    </div>
  );
};

export default Home;
