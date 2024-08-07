import { LampContainer } from '../ui/lamp';



const Landing = () => {
  return (
    <LampContainer>
    <div className="relative z-50 min-h-screen flex flex-col items-center justify-center text-center gap-y-8 px-5">
    <h1 className='text-white text-8xl font-marcellus'>Curate Sphere</h1>
    <h3 className='text-white text-3xl font-marcellus'>A place to create, explore, and showcase art exhibitions</h3>
    </div>
    </LampContainer>
  )
}
export default Landing