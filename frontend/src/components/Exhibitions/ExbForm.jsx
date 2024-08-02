import { useEffect, useState } from "react";
import { createExb } from "../../services/exbService";
import useExbContext from "../../context/exb/useExbContext";

const initialFormData = {
  title: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
};

const ExbForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { handleGetExbDetail, showExb } = useExbContext();
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  // try {
  //  const data = await createExb(formData)
  // } catch (err) {
  //   console.error(err);
  // }
  // }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <section className="flex flex-col ml-10">
      <h1 className="text-6xl mb-20 text-center">Add New Exhibition</h1>
      <form className="border-black border-2 w-1/2 mx-auto p-11" action="">
        <div className="flex gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="title">
            Exhibition Title:{" "}
          </label>
          <input
            value={formData.title}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3"
            type="text"
            id="title"
            name="title"
            required
          />
        </div>
        <div className="flex gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="description">
            Description:{" "}
          </label>
          <textarea
            className="border-black border w-2/3"
            type="text"
            id="description"
            name="description"
          />
        </div>
        <div className="flex gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="location">
            Location:{" "}
          </label>
          <input
            value={formData.location}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3"
            type="text"
            id="location"
            name="location"
          />
        </div>
        <div className="flex gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="startDate">
            Start Date:{" "}
          </label>
          <input
            value={formData.startDate}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3"
            type="date"
            id="startDate"
            name="startDate"
          />
        </div>
        <div className="flex gap-8 mb-5 items-center">
          <label className="text-3xl w-48" htmlFor="endDate">
            End Date:{" "}
          </label>
          <input
            value={formData.endDate}
            onChange={(e) => handleChange(e)}
            className="border-black border w-2/3"
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
            Create Exhibition
          </button>
        </div>
      </form>
    </section>
  );
};
export default ExbForm;
