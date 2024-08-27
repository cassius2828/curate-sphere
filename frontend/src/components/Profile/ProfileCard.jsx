import { useEffect, useState } from "react";
import Btn from "../CommonComponents/Btn";
import { ProfileForm } from "./ProfileForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import useGlobalContext from "../../context/global/useGlobalContext";
import { Link } from "react-router-dom";
import useExbContext from "../../context/exb/useExbContext";

export const ProfileCard = () => {
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const { user } = useGlobalContext();
  const { headerImg, profileImg, username, bio, id } = user.user;
const {myExbs} = useExbContext()
  console.log(user);
  return (
    <div className="rounded-md flex flex-col justify-center items-center  md:my-12 bg-neutral-200 w-full md:w-1/2 overflow-hidden ">
      {/* header */}
      <div className="w-full h-1/3 relative overfl">
        <img
          className="w-full object-cover"
          src={
            headerImg
              ? headerImg
              : `https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149158441.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724544000&semt=ais_hybrid`
          }
          alt="Profile Header"
        />

        
        {/* img */}
        <div className="rounded-full border-8 w-72 h-72 md:w-96 md:h-96 overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            className="w-full "
            src={
              profileImg
                ? profileImg
                : `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`
            }
            alt="Avatar"
          />
        </div>
      </div>
      {/* name */}
      <h2 className="text-4xl mt-20">{username}</h2>
      {/* bio */}
      <p className="py-4 px-20 text-2xl">
     {bio ? bio : 'Feeling inspired?... create a bio to share a little about yourself!'}
      </p>
      {/* exb count */}
      <div className="flex items-center gap-12 mt-8">
        <h3 className="text-3xl">Exhibitions: {myExbs.length}</h3>
        <Link to={`/exhibitions/dashboard`}>
          <button className="relative text-xl border-2 border-gray-800 text-gray-800 p-3 ">
            view exhibitions
          </button>
        </Link>
      </div>
      {/* edit form */}
      <div className="flex items-center gap-12 my-12">
        <Btn
          handleAction={() => {
            setShowChangePasswordForm(false);
            setShowEditProfileForm(true);
          }}
          text="Edit Profile"
        />
        <Btn
          handleAction={() => {
            setShowEditProfileForm(false);
            setShowChangePasswordForm(true);
          }}
          text="Change Password"
        />
      </div>
      {showEditProfileForm && <ProfileForm />}
      {showChangePasswordForm && <ChangePasswordForm />}
    </div>
  );
};
