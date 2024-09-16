// React Imports
import { useState } from "react";
import { Link } from "react-router-dom";
// Component Imports
import Btn from "../CommonComponents/Btn";
import { ProfileForm } from "./ProfileForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
// Context Imports
import useGlobalContext from "../../context/global/useGlobalContext";
import useExbContext from "../../context/exb/useExbContext";

export const ProfileCard = () => {
  // State to control visibility of edit forms
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  // Contexts for user data and exhibitions
  const { user } = useGlobalContext();
  const { myExbs } = useExbContext();

  // Destructuring user details
  const { headerImg, profileImg, username, bio } = user.user;

  return (
    <div className="rounded-md flex flex-col justify-center items-center md:my-12 bg-neutral-100 w-full md:w-1/2 xl:w-1/3 overflow-hidden">
      {/* Header Image */}
      <div className="w-full relative">
        <img
          data-cy="header-img"
          className="w-full object-cover max-h-[40rem]"
          src={
            headerImg
              ? headerImg
              : `https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149158441.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724544000&semt=ais_hybrid`
          }
          alt="Profile Header"
        />
        {/* Profile Image */}
        <div className="rounded-full border-8 w-60 h-60 md:w-52 md:h-52 xl:w-80 xl:h-80 overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            data-cy="profile-img"
            className="w-full h-full "
            src={
              profileImg
                ? profileImg
                : `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`
            }
            alt="Avatar"
          />
        </div>
      </div>
      {/* User Name */}
      <h2 data-cy="profile-username" className="text-4xl mt-20 ">
        {username}
      </h2>
      {/* Bio */}
      <p
        data-cy="profile-bio"
        className="py-8 mx-20 text-2xl border-y border-gray-500 mt-5"
      >
        {bio || bio !== null
          ? bio
          : "Feeling inspired?... create a bio to share a little about yourself!"}
      </p>
      {/* Exhibition Count and View Button */}
      <div className="flex items-center gap-12 mt-8">
        <h3 data-cy="profile-exb-count" className="text-3xl">
          Exhibitions: {myExbs.length}
        </h3>
        <Link to={`/exhibitions/dashboard`}>
          <button
            data-cy="profile-user-exbs-btn"
            className="relative text-xl border-2 border-gray-800 text-gray-800 p-3"
          >
            View Exhibitions
          </button>
        </Link>
      </div>
      {/* Edit Profile and Change Password Buttons */}
      <div
        data-cy="profile-action-btn-container"
        className="flex items-center gap-12 my-12"
      >
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
      {/* Conditional Rendering of Forms */}
      {showEditProfileForm && <ProfileForm />}
      {showChangePasswordForm && <ChangePasswordForm />}
    </div>
  );
};
