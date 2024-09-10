import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            express <span>kargo</span> uygulama
          </h1>
          <p>Uygulamaya giriş yapabilmeniz için aşağıdaki linki tıklayın</p>
          <Link to='/register' className='btn register-link'>
            Kayıt ol
          </Link>
          <Link to='/login' className='btn '>
            Giriş / Demo Kullanıcı
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
