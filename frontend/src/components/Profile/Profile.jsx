import { useEffect } from "react";
import { ProfileCard } from "./ProfileCard";
import useGlobalContext from "../../context/global/useGlobalContext";
import { getUser } from "../../services/authService";

const Profile = () => {
  const { setUser } = useGlobalContext();
  useEffect(() => {
    setUser(getUser());
  }, []);
  return (
    <section className="w-screen min-h-screen flex flex-col items-center font-marcellus mb-40">
      <ProfileCard />
    </section>
  );
};
export default Profile;
