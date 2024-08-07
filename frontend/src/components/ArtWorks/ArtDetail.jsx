import { Link, useParams } from "react-router-dom"


const ArtDetail = () => {
  const {id} = useParams()
  return (
    <section className="p-4">
    <h1 className="text-5xl md:text-6xl mb-12 md:mb-24 text-center font-marcellus">Detail: {'Aladdin\'s Lamp'}</h1>
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-20">
      <img
        width="375"
        src="https://nrs.hvrd.art/urn-3:HUAM:62187_dynmc?width=3000&height=3000"
        alt="sample image"
      />
      <div className="flex flex-col justify-center mx-10 items-center gap-6 md:gap-20 md:items-start md:mx-2 text-3xl font-cardo">
      <p>Artwork Title: Aladdin's Lamp</p>
      <p>Artist: Elihu Vedder, American (New York, NY 1836 - 1923 Rome, Italy)</p>
      <p>Date: c. 1888</p>
      <p>Medium: Gouache, gold leaf, and black ink on brown card</p>
      <p>Dimensions: 24.2 x 18.7 cm (9 1/2 x 7 3/8 in.)</p>
      <button className="border border-black px-6 py-1 font-cardo w-1/2">Add to Exhibition</button>
      </div>



    </div>
    </section>
  )
}
export default ArtDetail