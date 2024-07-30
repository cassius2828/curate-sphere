import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

function App() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-500">
          Hello, Tailwind CSS with Vite!
        </h1>
        <LoginForm />
        <RegisterForm />
      </div>
    </>
  );
}

export default App;
