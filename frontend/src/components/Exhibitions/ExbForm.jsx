import { useEffect, useState } from "react";
import { createExb, editExb } from "../../services/exbService";
import useExbContext from "../../context/exb/useExbContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import { useNavigate, useParams } from "react-router";
import PromptSignIn from "../CommonComponents/PromptSignIn";

const initialFormData = {
  title: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
  userId: null,
};

const ExbForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { handleGetExbDetail, showExb, handleGetUserExbs } = useExbContext();
  const { user, formatDateForEdit } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!user) {
    return <PromptSignIn />;
  }
  ///////////////////////////
  // Form Actions
  ///////////////////////////
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
  // Fetch Exb Details on load
  ///////////////////////////
  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function fetchExbDetails() {
        try {
          await handleGetExbDetail(id);
        } catch (err) {
          console.error(err, " <-- unable to fetch exb details");
        }
      }
      fetchExbDetails();
    } else {
      setFormData({ ...initialFormData, userId: user.user.id });
    }
  }, [id]);

  useEffect(() => {
    if (id && showExb) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...showExb,
      }));
    }
  }, [showExb, id]);

  return (
    <section className="flex flex-col md:ml-10">
      <h1 className="text-6xl mb-20 text-center font-marcellus">
        {id ? "Edit" : "Create New"} Exhibition
      </h1>
      <form
        className="border-t-black border-2 md:border-black w-full md:w-1/2 mx-auto p-5 md:p-11 font-cardo"
        action=""
      >
        {/* title */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="title">
            Exhibition Title:{" "}
          </label>
          <input
            value={formData.title}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3 p-3 text-xl"
            type="text"
            id="title"
            name="title"
            required
          />
        </div>
        {/* description */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="description">
            Description:{" "}
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3 p-3 text-xl"
            type="text"
            id="description"
            name="description"
          />
        </div>
        {/* location */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="location">
            Location:{" "}
          </label>
          <input
            value={formData.location}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3 p-3 text-xl"
            type="text"
            id="location"
            name="location"
          />
        </div>
        {/* start date */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="startDate">
            Start Date:{" "}
          </label>
          <input
            value={formatDateForEdit(formData.startDate)}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3 p-3 text-xl"
            type="date"
            id="startDate"
            name="startDate"
          />
        </div>
        {/* end date */}
        <div className="flex flex-col md:flex-row text-center md:text-start gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="endDate">
            End Date:{" "}
          </label>
          <input
            value={formatDateForEdit(formData.endDate)}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3 p-3 text-xl"
            type="date"
            id="endDate"
            name="endDate"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="text-2xl border-black border px-6 py-2 mt-10"
          >
            {/* update or create */}
            {id ? "Update" : "Create"} Exhibition
          </button>
        </div>
      </form>
    </section>
  );
};
export default ExbForm;
