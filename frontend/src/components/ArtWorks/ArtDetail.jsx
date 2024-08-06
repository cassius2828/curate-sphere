import { Link, useParams } from "react-router-dom"


const ArtDetail = () => {
  const {id} = useParams()
  return (
    <section>
    <h1 className="text-6xl mb-24 text-center font-marcellus">Detail: {'Aladdin\'s Lamp'}</h1>
    <div className="flex justify-center gap-10">
      <img
        width="375"
        src="https://nrs.hvrd.art/urn-3:HUAM:62187_dynmc?width=3000&height=3000"
        alt="sample image"
      />
      <div className="flex flex-col justify-center gap-20 text-3xl font-cardo">
      <p>Artwork Title: Aladdin's Lamp</p>
      <p>Artist: Elihu Vedder, American (New York, NY 1836 - 1923 Rome, Italy)</p>
      <p>Date: c. 1888</p>
      <p>Medium: Gouache, gold leaf, and black ink on brown card</p>
      <p>Dimensions: 24.2 x 18.7 cm (9 1/2 x 7 3/8 in.)</p>
      </div>
      <button className="border border-black px-6 py-1 font-cardo">Add to Exhibition</button>



    </div>
    </section>
  )
}
export default ArtDetail