import { useEffect } from 'react';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import FormRowValue from '../components/FormRowValue';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { locale } from '../utils/constants';
import { CButton } from '@coreui/react-pro';
import styled from 'styled-components';
import Select from 'react-dropdown-select';
import moment from 'moment';

const singleInvoiceQuery = (id) => {
  return {
    queryKey: ['invoices', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/invoices/${id}`);

      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleInvoiceQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-invoices');
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
      return redirect('/dashboard/all-invoices');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const allClientsQuery = () => {
  return {
    queryKey: ['clients'],

    queryFn: async () => {
      const { data } = await customFetch.get('/clients');
      console.log('data: ', data);

      return data;
    },
  };
};

const EditInvoice = () => {
  const id = useLoaderData();

  const {
    data: { invoice },
  } = useQuery(singleInvoiceQuery(id));
  const { data } = useQuery(allClientsQuery());
  const [startDate, setStartDate] = useState(new Date());
  const [pointDate, setPointDate] = useState('');
  const [invoiceEdit, setInvoiceEdit] = useState({
    barcod: '',
    kg: 1,
    price: 1.3,
    ambalaj_type: '',
    receiver_id: '',
    vehicle_number: '',
    invoice_date: '',
  });

  const onInputChange = (o, fieldName) => {
    setInvoiceEdit((prev) => {
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

  const handleSumbit = async () => {
    console.log('invoiceEdit. ', invoiceEdit);
    await customFetch.patch(`/invoices/${id}`, invoiceEdit);
  };

  const getClientOptions = (data) => {
    const clientOptions = data;
    if (!clientOptions) {
      return [];
    }
    let out = clientOptions.map((c) => {
      return {
        key: c._id,
        label: `${c?.receiver} ${c?.sender_phone} ${c?.address}`,
        value: c._id,
      };
    });
    return out;
  };

  const getLabel = (data) => {
    const clientOptions = data;
    if (!clientOptions) {
      return [];
    }
    let found = clientOptions.find(
      (element) => element._id === invoiceEdit.receiver_id
    );

    return [
      {
        value: invoiceEdit.receiver_id,
        label: found?.receiver + ' ' + found?.address,
      },
    ];
  };

  const handleDate = (date) => {
    setPointDate(date);
    setInvoiceEdit((prev) => {
      let newDate = moment(date).format('DD.MM.YYYY');

      return {
        ...prev,
        invoice_date: newDate,
      };
    });
  };

  useEffect(() => {
    const splitted = invoice.invoice_date.split('.');

    setInvoiceEdit((prev) => ({
      ...prev,
      barcod: invoice.barcod,
      kg: invoice.kg,
      price: invoice.price,
      ambalaj_type: invoice.ambalaj_type,
      receiver_id: invoice.receiver_id,
      vehicle_number: invoice.vehicle_number,
      invoice_date: new Date(+splitted[2], splitted[1] - 1, +splitted[0]),
    }));
  }, [invoice]);

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>invoice düzenle</h4>
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
            defaultValue={invoiceEdit.kg}
            onChange={(e, o) => onInputChange(e.target, 'kg')}
          />
          <FormRowValue
            type='text'
            name='price'
            labelText={'fiyat'}
            value={invoiceEdit.price}
            onChange={(e, o) => onInputChange(e.target, 'price')}
          />
          <FormRow
            type='text'
            name='ambalaj_type'
            labelText={'ambalaj türü'}
            defaultValue={invoiceEdit.ambalaj_type}
            onChange={(e, o) => onInputChange(e.target, 'ambalaj_type')}
          />
          <FormRow
            type='text'
            name='vehicle_number'
            labelText={'Araba numarası'}
            defaultValue={invoiceEdit.vehicle_number}
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
              labelField={'label'}
              valueField={'value'}
              values={getLabel(data?.clients)}
            />
          </div>
          <div>
            <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}>
              Araba çıkış tarihi
            </p>
            <DatePicker
              name='invoice_date'
              dateFormat='dd.MM.yyyy'
              selected={pointDate === '' ? invoiceEdit.invoice_date : pointDate}
              onChange={(date) => handleDate(date)}
              locale={locale}
            />
          </div>
          <CButton onClick={handleSumbit} color='primary'>
            Güncelle
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

export default EditInvoice;
