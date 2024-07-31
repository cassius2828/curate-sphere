import ArtGalleryCard from "./ArtGalleryCard"

const ArtGallery = () => {
  return (
    <div className="flex flex-wrap justify-center w-3/4 mx-auto gap-x-10 gap-y-20 ">
        <ArtGalleryCard/>
        <ArtGalleryCard/>
        <ArtGalleryCard/>
        <ArtGalleryCard/>
        <ArtGalleryCard/>
        <ArtGalleryCard/>
    </div>
  )
}
export default ArtGallery