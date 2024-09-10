import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};
const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Kayıt ol</h4>
        <FormRow type='text' name='name' labelText='isim' />
        <FormRow type='text' name='lastName' labelText='soyisim' />
        <FormRow type='text' name='location' labelText='yer' />
        <FormRow type='email' name='email' labelText='email' />
        <FormRow type='password' name='password' labelText='şifre' />
        <SubmitBtn />
        <p>
          Kayıtlı iseniz?
          <Link to='/login' className='member-btn'>
            Giriş
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
