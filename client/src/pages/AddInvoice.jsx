import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import Select, { components } from 'react-dropdown-select';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import styled from 'styled-components';

const allClientsQuery = (params) => {
  return {
    queryKey: ['clients'],

    queryFn: async () => {
      const { data } = await customFetch.get('/clients', {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allClientsQuery(params));
    return { searchValues: { ...params } };
  };

const AddInvoice = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allClientsQuery(searchValues));
  const [list, setList] = useState([]);

  const getClientOptions = (data) => {
    const clientOptions = data;
    if (!clientOptions) {
      return [];
    }
    let out = clientOptions.map((c) => {
      return {
        key: c._id,
        label: `${c.receiver} ${c.sender_phone} ${c.address}`,
        value: c._id,
      };
    });
    return out;
  };

  useEffect(() => {
    // setList(data?.clients);
  }, [data]);

  console.log('list: ', list);

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Invoice ekle</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='barcod'
            defaultValue={Math.floor(Math.random() * 100000) + 100}
            labelText={'Barkod'}
          />
          <FormRow type='text' name='kg' labelText={'kg'} />
          <FormRow type='text' name='price' labelText={'fiyat'} />
          <div>
            <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}>
              Alıcı ad-soyad, adress
            </p>
            <StyledSelect options={getClientOptions(data?.clients)} />
          </div>
          <FormRow type='text' name='kg' labelText={'ambalaj türü'} />
          {/*<FormRowSelect
            labelText='ambalaj türü'
            name='ambalaj_type'
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />*/}

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

const StyledSelect = styled(Select)`
  background: #333;
  border: #333 !important;
  color: #fff;

  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    color: #fff;
  }

  .react-dropdown-select-option {
    border: 1px solid #fff;
  }

  .react-dropdown-select-item {
    color: #333;
  }

  .react-dropdown-select-input {
    color: #fff;
  }

  .react-dropdown-select-dropdown {
    position: absolute;
    left: 0;
    border: none;
    width: 500px;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    max-height: 300px;
    overflow: auto;
    z-index: 9;
    background: #333;
    box-shadow: none;
    color: #fff !important;
  }

  .react-dropdown-select-item {
    color: #f2f2f2;
    border-bottom: 1px solid #333;

    :hover {
      color: #ffffff80;
    }
  }

  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    //background: #111;
    border-bottom: 1px solid #333;
    color: #fff;
    font-weight: bold;
  }

  .react-dropdown-select-item.react-dropdown-select-item-disabled {
    background: #777;
    color: #ccc;
  }
`;

export default AddInvoice;
