import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import Select, { components } from 'react-dropdown-select';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import styled from 'styled-components';
import FormRowValue from '../components/FormRowValue';
import { CButton } from '@coreui/react-pro';
import { locale } from '../utils/constants';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();

    const data = Object.fromEntries(formData);
    console.log('data: 3', data);
    try {
      await customFetch.post('/invoices', data);
      queryClient.invalidateQueries(['invoices']);
      toast.success('Invoice added successfully ');
      return redirect('/dashboard/all-invoices');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { searchValues } = useLoaderData();
  const [startDate, setStartDate] = useState(new Date());
  const { data } = useQuery(allClientsQuery(searchValues));
  const [invoice, setInvoice] = useState({
    barcod: 'k-' + Math.floor(Math.random() * 100000) + 100,
    kg: 1,
    price: 1.3,
    ambalaj_type: '',
    receiver_id: '',
    vehicle_number: '',
    invoice_date: moment(new Date()).format('DD.MM.YYYY'),
  });

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

  const onInputChange = (o, fieldName) => {
    setInvoice((prev) => {
      const varTs = { ...prev };
      switch (fieldName) {
        case 'barcod':
          varTs.barcod = o.value;
          break;
        case 'kg':
          varTs.kg = o.value;
          varTs.price = (o.value * 1.3).toFixed(2);
          break;
        case 'price':
          varTs.price = o.value;
          break;
        case 'ambalaj_type':
          varTs.ambalaj_type = o.value;
          break;
        case 'receiver_id':
          varTs.receiver_id = o.value;
          break;
        default:
          varTs[fieldName] = o.value;
      }
      return varTs;
    });
  };

  const handleDate = (date) => {
    setStartDate(date);
    setInvoice((prev) => {
      let newDate = moment(date).format('DD.MM.YYYY');

      return {
        ...prev,
        invoice_date: newDate,
      };
    });
  };
  console.log('invoice :', invoice.invoice_date);

  const validate = () => {
    const errors = [];
    const { ambalaj_type, receiver_id } = invoice;
    if (ambalaj_type === null || ambalaj_type === undefined || !ambalaj_type) {
      toast.error('Ambalaj türünü seçin');
      errors.push('Ambalaj türünü seçin');
    }
    if (receiver_id === null || receiver_id === undefined || !receiver_id) {
      toast.error('Alıcı seçin');
      errors.push('Alıcı seçin');
    }

    return errors;
  };

  const handleSumbit = async () => {
    let errors = [];
    errors = validate();

    if (errors === null || errors === undefined || errors.length === 0) {
      try {
        await customFetch.post('/invoices', invoice);
        toast.success('Invoice added successfully ');
        queryClient.invalidateQueries('invoices');
        navigate('/dashboard/all-invoices');
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    } else {
      console.log('errors');
    }
  };
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Invoice ekle</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='barcod'
            defaultValue={invoice?.barcod}
            labelText={'Barkod'}
            onChange={(e, o) => onInputChange(e.target, 'barcod')}
          />
          <FormRow
            type='text'
            name='kg'
            labelText={'kg'}
            defaultValue={invoice.kg}
            onChange={(e, o) => onInputChange(e.target, 'kg')}
          />
          <FormRowValue
            type='text'
            name='price'
            labelText={'fiyat'}
            value={invoice.price}
            onChange={(e, o) => onInputChange(e.target, 'price')}
          />
          <FormRow
            type='text'
            name='ambalaj_type'
            labelText={'ambalaj türü'}
            defaultValue={invoice.ambalaj_type}
            onChange={(e, o) => onInputChange(e.target, 'ambalaj_type')}
          />
          <FormRow
            type='text'
            name='vehicle_number'
            labelText={'Araba numarası'}
            defaultValue={invoice.vehicle_number}
            onChange={(e, o) => onInputChange(e.target, 'vehicle_number')}
          />

          <div>
            <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}>
              Alıcı ad-soyad, adress
            </p>
            <StyledSelect
              name='receiver_id'
              options={getClientOptions(data?.clients)}
              onChange={(values) => onInputChange(values[0], 'receiver_id')}
            />
          </div>
          <div>
            <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}>
              Araba çıkış tarihi
            </p>
            <DatePicker
              name='invoice_date'
              dateFormat='dd.MM.yyyy'
              selected={startDate}
              onChange={(date) => handleDate(date)}
              locale={locale}
            />
          </div>
          <CButton onClick={handleSumbit} color='primary'>
            Kaydet
          </CButton>
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
