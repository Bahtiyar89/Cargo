import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
  return {
    queryKey: ['client', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/clients/${id}`);
      console.log('datadata ', data);

      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-clients');
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/clients/${params.id}`, data);
      queryClient.invalidateQueries(['clients']);

      toast.success('Müşteri başarıyla güncellendi');
      return redirect('/dashboard/all-clients');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditClient = () => {
  const id = useLoaderData();

  const {
    data: { client },
  } = useQuery(singleJobQuery(id));
  console.log('client: ', client);

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>müşteriyi düzenle</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='sender'
            labelText={'gönderici'}
            defaultValue={client.sender}
          />
          <FormRow
            type='text'
            name='sender_phone'
            labelText={'gönderi tel.'}
            defaultValue={client.sender_phone}
          />
          <FormRow
            type='text'
            name='receiver'
            labelText='alıcı'
            defaultValue={client.receiver}
          />
          <FormRow
            type='text'
            name='receiver_phone'
            labelText='alıcı tel'
            defaultValue={client.receiver_phone}
          />
          <FormRow
            type='text'
            name='address'
            labelText='alıcı addresi'
            defaultValue={client.address}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditClient;
