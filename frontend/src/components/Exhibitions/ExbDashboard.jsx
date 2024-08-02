import { Link } from 'react-router-dom'

const ExbDashboard = () => {
  return (
    <section className="flex flex-col ml-10 mb-10">
      <div className='flex gap-28 mb-20 items-center'>
        <h1 className="text-6xl ">My Exhibitions</h1>
        <Link to="/exhibitions/create">
          <button className='text-2xl border-black border px-6 py-1'>Add New Exhibition</button>
        </Link>
      </div>

    {/* {exhibitions.length == 0 ? 
      (<p>No exhibitions yet!</p>
      ) : (
       */}
      <ul className="flex flex-col gap-10">
        {/* exhibitions.map((exhibition) => 
          (<ExbCard 
            key={exhibition.id} 
            title= {exhibition.title} 
            date={`exhibition.startDate - exhibition.endDate`} 
            location={exhibition.location} ))} */}
        <ExbCard title={`Van Gogh Retrospective`} date={`Jan 1 - Mar 1, 2025`} location={`LACMA`} />
        <ExbCard title={`Van Gogh Retrospective`} date={`Jan 1 - Mar 1, 2025`} location={`LACMA`} />
        <ExbCard title={`Van Gogh Retrospective`} date={`Jan 1 - Mar 1, 2025`} location={`LACMA`} />

      </ul>
    </section>
  )
}
export default ExbDashboard


import React from 'react'

export const ExbCard = ({ title, date, location }) => {
  return (
    <li className="flex w-full md:w-[40rem]"><img className="w-full md:w-1/2" src="https://nrs.hvrd.art/urn-3:HUAM:DDC251942_dynmc?width=3000&height=3000" alt="" />
      <div className="flex flex-col justify-center gap-6 pl-3">
        <span className="text-3xl">{title}</span>
        <span className="text-2xl">Date: {date}</span>
        <span className="text-2xl">Location: {location}</span>
        <Link to={'/exhibition/detail'} >
        <button className="text-[12px] border-black border w-3/4 mx-auto">View full details</button>
        </Link>
      </div>
    </li>
  )
}
