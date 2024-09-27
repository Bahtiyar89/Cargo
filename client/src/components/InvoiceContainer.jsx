import React, { Fragment, useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useAllInvoicesContext } from '../pages/AllInvoices';
import { ReactToPrint } from 'react-to-print';
import { FormRow } from '.';
import {
  CButton,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react-pro';
import DatePicker from 'react-datepicker';
import { locale } from '../utils/constants';
import moment from 'moment';
import { useSubmit } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import InvoiceTable from './Invoice';
import CartTable from './Invoice/CartTable';

const InvoiceContainer = () => {
  const submit = useSubmit();
  const componentRef = React.useRef(null);
  const { data } = useAllInvoicesContext();
  const { invoices } = data;
  const [items, setItems] = useState([]);
  const [pointDate, setPointDate] = useState('');
  const [monthDate, setMonthDate] = useState('');
  const [vehicle_number, setVehicle_number] = useState('');

  useEffect(() => {
    setItems(invoices);
  }, [invoices]);

  const handleDate = (date) => {
    setPointDate(date);
    setMonthDate('');

    //  submit({ pointDate: moment(date).format('DD.MM.YYYY') });
  };

  const handleMonthDate = (date) => {
    setMonthDate(date);
    setPointDate('');
  };

  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

    return <span title={tooltipText}>{shortMonth}</span>;
  };

  const handleFormSubmit = async () => {
    const { data } = await customFetch.get(
      `/invoices/?pointDate=${moment(pointDate).format(
        'DD.MM.YYYY'
      )}&vehicle_number=${vehicle_number}&monthDate=${moment(monthDate).format(
        'YYYY-MM-DD'
      )}`
    );
    setItems(data.invoices);
  };

  return (
    <Fragment>
      <CCardHeader style={{}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>Tüm Invoice</h3>
        </div>
        <hr />

        <CRow>
          <CCol>
            <CForm>
              <div>
                <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}>
                  Araba numarası
                </p>
                <input
                  type={'text'}
                  id={'vehicle_numberx'}
                  name={'vehicle_number'}
                  value={vehicle_number}
                  onChange={(e) => setVehicle_number(e.target.value)}
                  required
                />
              </div>
            </CForm>
          </CCol>
          <CCol>
            <CForm>
              <div>
                <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}>
                  Invoice tarihi
                </p>
                <DatePicker
                  name='invoice_date'
                  dateFormat='dd.MM.yyyy'
                  selected={pointDate}
                  onChange={(date) => handleDate(date)}
                  locale={locale}
                />
              </div>
            </CForm>
          </CCol>

          <CCol>
            <div>
              <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}>
                Invoice Oluşturulmuş tarih
              </p>
              <DatePicker
                selected={monthDate}
                renderMonthContent={renderMonthContent}
                name='createdAt'
                dateFormat='dd.MM.yyyy'
                onChange={(date) => handleMonthDate(date)}
                locale={locale}
              />
            </div>
          </CCol>
          <CCol>
            <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}></p>
            <CButton onClick={handleFormSubmit} color={'secondary'}>
              Arama yap
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <>
        <CTabs activeItemKey={1}>
          <CTabList style={{ marginTop: 20 }} variant='underline'>
            <CTab aria-controls='home-tab-pane' itemKey={1}>
              Tablo
            </CTab>
            <CTab aria-controls='profile-tab-pane' itemKey={2}>
              Cart
            </CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel
              className='py-3'
              aria-labelledby='home-tab-pane'
              itemKey={1}
            >
              <InvoiceTable items={items} />
            </CTabPanel>
            <CTabPanel
              className='py-3'
              aria-labelledby='profile-tab-pane'
              itemKey={2}
            >
              <CartTable items={items} />
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </>
    </Fragment>
  );
};
export default InvoiceContainer;
