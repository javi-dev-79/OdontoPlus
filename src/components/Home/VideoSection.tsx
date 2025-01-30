import '../../styles/home.css'
import video from '../../assets/videos/Olivia-Noble.mp4'

const VideoSection = () => {
  return (
    <section className='video-section'>
      <h2 className='video-title'>
        Descubre OdontoPlus: Tu Clínica Dental en Arucas
      </h2>
      <video
        controls
        className='video-player'
        aria-label='Video sobre la clínica OdontoPlus'
      >
        {/* <source src='src\assets\videos\Olivia - Noble.mp4' type='video/mp4' /> */}
        <source src={video} type='video/mp4' />
        Tu navegador no soporta el elemento de video.
      </video>
    </section>
  )
}

export default VideoSection
