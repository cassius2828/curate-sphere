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