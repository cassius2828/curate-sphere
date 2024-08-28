import { removeArtworkFromExb } from "../../../services/exbService";
import Btn from "../Btn";

const ConfirmDeleteModal = ({
  isVisible,
  onClose,
  id,
  objectid,
  handleReloadResource,
}) => {
  const handleRemoveArtworkFromExb = async () => {
    try {
      const data = await removeArtworkFromExb(id, objectid);
      //   if (data.message) {
      //     setMessage(data.message);
      //   }
      //   if (data.error) {
      //     setMessage(data.error);
      //   }
      await handleReloadResource(id);
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with db to remove artwork from exb`);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 modal">
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-8  rounded-lg shadow-lg  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          className="absolute top-0 right-3 text-4xl modal-close"
          onClick={() => {
            onClose();
            // setMessage("");
          }}
        >
          &times;
        </button>{" "}
        <p className="mb-10">
          Are you sure you want to remove this artwork from your exhibition?
        </p>
        <div className="flex gap-8 mt-12 sm:mt-0">
          {/* close modal */}
          <Btn handleAction={() => onClose()} text={`cancel`} />
          <Btn handleAction={handleRemoveArtworkFromExb} text={`confirm`} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
