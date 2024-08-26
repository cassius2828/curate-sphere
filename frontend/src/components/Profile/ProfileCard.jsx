import { useEffect, useState } from "react";
import Btn from "../CommonComponents/Btn";
import { ProfileForm } from "./ProfileForm";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const ProfileCard = () => {
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  return (
    <div className="rounded-md flex flex-col justify-center items-center  my-12 bg-neutral-200 w-full md:w-1/2 overflow-hidden ">
      {/* header */}
      <div className="w-full h-1/3 relative overfl">
        <img
          className="w-full object-cover"
          src="https://i.pinimg.com/originals/64/2e/1d/642e1d44775dc46e9506c95bc66f6d2e.jpg"
          alt=""
        />
        {/* img */}
        <div className="rounded-full border-8 w-96 h-96 overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            className="scale-125 "
            src="https://nrs.harvard.edu/urn-3:HUAM:INV100208_dynmc"
            alt=""
          />
        </div>
      </div>
      {/* name */}
      <h2 className="text-4xl mt-20">Sarah Smith</h2>
      {/* bio */}
      <p className="py-4 px-20 text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate iure
        veritatis suscipit quos nostrum veniam inventore quibusdam voluptatum
        cupiditate obcaecati ea perspiciatis, quo quisquam ducimus atque modi
        odit quod non!
      </p>
      {/* exb count */}
      <div className="flex items-center gap-12 mt-8">
        <h3 className="text-3xl">Exhibitions: 4</h3>
        <button className="relative text-xl border-2 border-gray-800 text-gray-800 p-3 ">
          view exhibitions
        </button>
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
