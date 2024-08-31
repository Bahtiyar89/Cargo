import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log('data: ', data);

    try {
      await customFetch.post('/clients', data);
      queryClient.invalidateQueries(['clients']);
      toast.success('Yeni müşteri başarıyla eklendi.');
      return redirect('all-clients');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddClient = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>müşteri ekle</h4>
        <div className='form-center'>
          <FormRow type='text' labelText={'gönderici'} name='sender' />
          <FormRow
            type='text'
            labelText={'gönderici tel. numarası'}
            name='sender_phone'
          />
          <FormRow type='text' labelText='alıcı' name='receiver' />
          <FormRow
            type='text'
            labelText={'alıcı tel. numarası'}
            name='receiver_phone'
          />
          <FormRow type='text' labelText={'alıcı adresi'} name='address' />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddClient;
