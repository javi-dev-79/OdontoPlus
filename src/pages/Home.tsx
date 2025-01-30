import Carousel from '../components/Home/Carousel'
import Newsletter from '../components/Home/Newsletter'
import VideoSection from '../components/Home/VideoSection'
import '../styles/Home.css'

const Home = () => {
  return (
    <main>
      <div className='full-width-section'>
        <Carousel />
        <VideoSection />
        <Newsletter />
      </div>
    </main>
  )
}

export default Home
