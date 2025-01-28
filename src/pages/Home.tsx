import '../styles/Home.css'
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <div className='container'>{/* Tu contenido principal aquí */}</div>
      <Footer />
    </div>
  )
}

export default Home
