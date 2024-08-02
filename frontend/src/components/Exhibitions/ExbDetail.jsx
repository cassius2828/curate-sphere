import ArtGallery from "../ArtWorks/ArtGallery"
import { FilterActionBtns } from "../ArtWorks/ArtSearch"

const ExbDetail = () => {
  return (
    <>
      <section>
        <div className="flex flex-col items-center mx-auto mb-16 w-1/2">
          <h1 className="text-6xl mb-5">Exhibition Name</h1>
          <p className="text-4xl">Location: LACMA</p>
          <p className="text-4xl mb-10">Dates: Jan 1 - Mar 1, 2025</p>
          <p className="text-4xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
        <div className="flex gap-4 text-2xl mt-8"  >
          <button onClick={() =>
              alert(
                "This will take you to the edit form via handleEditExb function"
              )} 
              className="border border-black px-6 py-1">Edit exhibition details</button>
          <button onClick={() =>
              alert(
                "This will delete the exhibition via handleDeleteExb function"
              )} 
              className="border border-black px-6 py-1">Delete exhibition</button>
        </div>
        </div>

        <div className="flex flex-col items-center mx-auto">
          <FilterActionBtns />
          <ArtGallery />
          </div>

      </section>
    </>

  )
}
export default ExbDetail