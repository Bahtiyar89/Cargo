import React, { Fragment, useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useAllInvoicesContext } from '../pages/AllInvoices';
import { ReactToPrint } from 'react-to-print';
import {
  CButton,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CTab,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react-pro';
import '@coreui/coreui-pro/dist/css/coreui.min.css';
import DatePicker from 'react-datepicker';
import { locale } from '../utils/constants';
import moment from 'moment';
import { useSubmit } from 'react-router-dom';
import customFetch from '../utils/customFetch';

const InvoiceContainer = () => {
  const submit = useSubmit();
  const componentRef = React.useRef(null);
  const { data } = useAllInvoicesContext();
  const { invoices } = data;
  const [items, setItems] = useState([]);
  const [pointDate, setPointDate] = useState('');
  const [monthDate, setMonthDate] = useState(new Date());
  const [showPrint, setShowPrint] = useState(false);

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
  console.log('mont: ', moment(monthDate).format('M.YYYY'));
  console.log('pointDate: ', pointDate);

  const handleFormSubmit = async () => {
    if (pointDate != '') {
      const { data } = await customFetch.get(
        `/invoices/?pointDate=${moment(pointDate).format('DD.MM.YYYY')}`
      );
      setItems(data.invoices);
    } else {
      const { data } = await customFetch.get(
        `/invoices/?pointDate=${moment(monthDate).format('MM.YYYY')}`
      );
      setItems(data.invoices);
    }
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
          <h3>Tüm müşteriler</h3>
        </div>
        <hr />

        <CRow>
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
                Invoice Ayı
              </p>
              <DatePicker
                selected={monthDate}
                renderMonthContent={renderMonthContent}
                showMonthYearPicker
                name='invoice_date'
                dateFormat='MM.yyyy'
                onChange={(date) => handleMonthDate(date)}
                locale={locale}
              />
            </div>
          </CCol>
          <CCol>
            <p style={{ paddingTop: 5, paddingBottom: 15, fontSize: 14 }}></p>
            <CButton onClick={handleFormSubmit} color={'secondary'}>
              Сформировать
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <>
        <CTabs activeItemKey={2}>
          <CTabList variant='underline'>
            <CTab aria-controls='home-tab-pane' itemKey={1}>
              Home
            </CTab>
            <CTab aria-controls='profile-tab-pane' itemKey={2}>
              Profile
            </CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel
              className='py-3'
              aria-labelledby='home-tab-pane'
              itemKey={1}
            >
              <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                <ReactToPrint
                  trigger={() => {
                    return <CButton color={'secondary'}>Print</CButton>;
                  }}
                  content={() => componentRef.current}
                  documentTitle='title'
                  onBeforePrint={() => {
                    return setShowPrint(true);
                  }}
                  onAfterPrint={() => setShowPrint(false)}
                  removeAfterPrint={false}
                />
              </div>

              <CTable ref={componentRef}>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>barcod</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>adres</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>kg</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>
                      alıcı ve tel
                    </CTableHeaderCell>
                    <CTableHeaderCell scope='col'>
                      Ambalaj tipi
                    </CTableHeaderCell>
                    <CTableHeaderCell scope='col'>fiyat</CTableHeaderCell>
                    <CTableHeaderCell scope='col'></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {items.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.barcod}</CTableDataCell>
                        <CTableDataCell style={{ width: '20%' }}>
                          {item.receiver_id.address}
                        </CTableDataCell>
                        <CTableDataCell>{item.kg}</CTableDataCell>
                        <CTableDataCell>
                          {item.receiver_id.receiver +
                            ' ' +
                            item.receiver_id.receiver_phone}
                        </CTableDataCell>
                        <CTableDataCell>{item.ambalaj_type}</CTableDataCell>
                        <CTableDataCell>{item.price}</CTableDataCell>
                        <CTableDataCell>
                          <Fragment>
                            <CButton
                              onClick={() => console.log(item)}
                              color='primary'
                              variant='outline'
                              shape='square'
                              size='sm'
                            >
                              <FaPen />
                            </CButton>
                            <CButton
                              onClick={() => console.log(item)}
                              color='primary'
                              variant='outline'
                              shape='square'
                              size='sm'
                            >
                              <FaTrash color={'red'} />
                            </CButton>
                          </Fragment>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </CTabPanel>
            <CTabPanel
              className='py-3'
              aria-labelledby='profile-tab-pane'
              itemKey={2}
            >
              Profile tab content
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </>
    </Fragment>
  );
};
export default InvoiceContainer;
