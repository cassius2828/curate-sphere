import { useEffect } from "react";
import { ProfileCard } from "./ProfileCard";
import useGlobalContext from "../../context/global/useGlobalContext";
import { getUser } from "../../services/authService";

const Profile = () => {
  const { setUser,scrollToTop } = useGlobalContext();
  useEffect(() => {
    setUser(getUser());
    scrollToTop()
  }, []);
  return (
    <section className="w-screen min-h-screen flex flex-col items-center font-marcellus mb-40 mt-20 md:mt-[15rem]">
      <ProfileCard />
    </section>
  );
};
export default Profile;
