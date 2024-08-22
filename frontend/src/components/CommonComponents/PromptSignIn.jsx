
import { Link } from "react-router-dom";

const PromptSignIn = ({text = 'make an exhibition', mt0}) => {
  return (
      <section style={{marginTop: mt0 ? '0' : ''}} className="flex flex-col md:ml-10">
        <h1 className=" text-4xl md:text-6xl mb-20 text-center font-marcellus">
          <Link to={'/login'} className="text-blue-600">Login
          </Link> or <Link to={'/register'} className="text-blue-600">sign up
          </Link> to {text}
        </h1>
      </section>
  );
};

export default PromptSignIn;
