import {Link} from 'react-router-dom'
export default function NotFoundPage(){
  return (
    <>
    <div>404 Page Not Found </div>
    <Link to='/' className='home-btn'> home</Link>
    </>
  )
}