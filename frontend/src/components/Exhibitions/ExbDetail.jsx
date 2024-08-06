import { useEffect, useState } from "react";
import ArtGallery from "../ArtWorks/ArtGallery";
import { FilterActionBtns } from "../ArtWorks/ArtSearch";
import useExbContext from "../../context/exb/useExbContext";
import { Link, useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
const initialFormData = {
  title: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
};
const ExbDetail = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { id } = useParams();
  const { handleGetExbDetail, showExb } = useExbContext();
  const { formatDate } = useGlobalContext();
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  // try {
  //  const data = await createExb(formData)
  // } catch (err) {
  //   console.error(err);
  // }
  // }
  useEffect(() => {
    const getDetailData = () => {
      const data = handleGetExbDetail("1");

      setFormData(data);
    };
    getDetailData();
  }, []);

  useEffect(() => {
    handleGetExbDetail(id);
  }, []);

  useEffect(() => {
    console.log(formData, " <-- formdata");
    console.log(showExb, " <-- showExb");
  }, [formData]);
  return (
    <>
      <section>
        <div className="flex flex-col items-center mx-auto mb-16 w-1/2">
          <h1 className="text-6xl mb-5 font-marcellus">{showExb.title}</h1>
          <p className="text-4xl font-cardo">Location: {showExb.location}</p>
          <p className="text-4xl mb-10 font-cardo">
            Dates: {formatDate(showExb.startDate)} -{" "}
            {formatDate(showExb.endDate)}
          </p>
          <p className="text-3xl font-cardo">{showExb.description}</p>
          <div className="flex gap-4 text-2xl mt-8">
            <Link to={`/exhibitions/${id}/edit`}>
              <button className="border border-black px-6 py-1 font-cardo">
                Edit exhibition details
              </button>
            </Link>
            <button
              onClick={() =>
                alert(
                  "This will delete the exhibition via handleDeleteExb function"
                )
              }
              className="border border-black px-6 py-1 font-cardo"
            >
              Delete exhibition
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mx-auto">
          <FilterActionBtns />
          <ArtGallery />
        </div>
      </section>
    </>
  );
};
export default ExbDetail;
