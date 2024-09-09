// React and hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
// Services and Context
import { createExb, editExb } from "../../services/exbService";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// Components
import PromptSignIn from "../CommonComponents/Modals/PromptSignIn";

// Initial form data state
const initialFormData = {
  title: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
  userId: null,
};

// Exhibition Form Component
const ExbForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { handleGetExbDetail, showExb, handleGetUserExbs } = useExbContext();
  const { user, formatDateForEdit } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  ///////////////////////////
  // Form Actions
  ///////////////////////////

  // Handle input changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await editExb(formData, id);
      } else {
        await createExb(formData);
      }
      handleGetUserExbs();
      navigate("/exhibitions/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  ///////////////////////////
  // Fetch Exhibition Details on Load
  ///////////////////////////

  useEffect(() => {
    if (id) {
      // Fetch existing exhibition details for editing
      const fetchExbDetails = async () => {
        try {
          await handleGetExbDetail(id);
        } catch (err) {
          console.error(err, " <-- unable to fetch exhibition details");
        }
      };
      fetchExbDetails();
    } else {
      // Initialize form for creating a new exhibition
      setFormData({ ...initialFormData, userId: user?.user.id });
    }
  }, [id]);

  // Update form data when exhibition details are fetched
  useEffect(() => {
    if (id && showExb) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...showExb,
      }));
    }
  }, [showExb, id]);
  useEffect(() => {
    console.log(formData)
  },[formData])

  // Redirect to sign-in if the user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen">
        <PromptSignIn text={"view your exhibitions"} />;
      </div>
    );
  }

  return (
    <section className="flex flex-col md:ml-10 font-marcellus min-h-screen">
      <h1 data-cy="manage-exb-form-title" className="text-6xl mb-20 text-center ">
        {id ? "Edit" : "Create New"} Exhibition
      </h1>
      <form
      data-cy="exb-form"
        className="border-t-black border-2 md:border-black w-full md:w-1/2 mx-auto p-5 md:p-11 font-cardo"
        onSubmit={handleSubmit}
      >
        {/* Exhibition Title */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="title">
            Exhibition Title:{" "}
          </label>
          <input
            value={formData.title}
            onChange={handleChange}
            className="border-black border w-2/3 p-3 text-xl"
            type="text"
            id="title"
            name="title"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="description">
            Description:{" "}
          </label>
          <textarea
            value={formData.description}
            onChange={handleChange}
            className="border-black border w-2/3 p-3 text-xl"
            id="description"
            name="description"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="location">
            Location:{" "}
          </label>
          <input
            value={formData.location}
            onChange={handleChange}
            className="border-black border w-2/3 p-3 text-xl"
            type="text"
            id="location"
            name="location"
          />
        </div>

        {/* Start Date */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="startDate">
            Start Date:{" "}
          </label>
          <input
            value={formatDateForEdit(formData.startDate)}
            onChange={handleChange}
            className="border-black border w-2/3 p-3 text-xl"
            type="date"
            id="startDate"
            name="startDate"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="endDate">
            End Date:{" "}
          </label>
          <input
            value={formatDateForEdit(formData.endDate)}
            onChange={handleChange}
            className="border-black border w-2/3 p-3 text-xl"
            type="date"
            id="endDate"
            name="endDate"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="text-2xl border-black border px-6 py-2 mt-10">
            {id ? "Update" : "Create"} Exhibition
          </button>
        </div>
      </form>
    </section>
  );
};

export default ExbForm;
