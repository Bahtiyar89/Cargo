import React, { Fragment, useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useAllInvoicesContext } from '../pages/AllInvoices';
import Wrapper from '../assets/wrappers/JobsContainer';
import { ReactToPrint, useReactToPrint } from 'react-to-print';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CSmartTable,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro';
import '@coreui/coreui-pro/dist/css/coreui.min.css';

const InvoiceContainer = () => {
  const { data } = useAllInvoicesContext();
  const { clients } = data;
  const [items, setItems] = useState([]);
  const [showPrint, setShowPrint] = useState(false);
  const componentRef = React.useRef(null);

  useEffect(() => {
    setItems(clients);
  }, [clients]);

  const columns = [
    {
      key: 'sender',
      label: 'Gönderici',
      _style: { width: '20%' },
    },

    {
      key: 'sender_phone',
      label: 'Gönderici Tel',
      _style: { width: '20%' },
    },
    {
      key: 'receiver',
      label: 'Alıcı',
      _style: { width: '20%' },
    },
    {
      key: 'receiver_phone',
      label: 'Alıcı Tel',
      _style: { width: '20%' },
    },
    {
      key: 'address',
      label: 'Adres',
      _style: { width: '20%' },
    },
    { key: 'edit', filter: false, sorter: false, label: '' },
  ];
  console.log('showPrint: ', showPrint);

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
              <CFormInput
                type='email'
                id='exampleFormControlInput1'
                placeholder='name@example.com'
                text='Must be 8-20 characters long.'
                aria-describedby='exampleFormControlInputHelpInline'
              />
            </CForm>
          </CCol>

          <CCol>
            <CFormInput
              type='email'
              id='exampleFormControlInput1'
              placeholder='name@example.com'
              text='Must be 8-20 characters long.'
              aria-describedby='exampleFormControlInputHelpInline'
            />
          </CCol>
          <CCol>
            <CButton color={'secondary'}>Сформировать</CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <CTableBody>
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
        <CTable ref={componentRef}>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope='col'>#</CTableHeaderCell>
              <CTableHeaderCell scope='col'>sender</CTableHeaderCell>
              <CTableHeaderCell scope='col'>sender_phone</CTableHeaderCell>
              <CTableHeaderCell scope='col'>receiver</CTableHeaderCell>
              <CTableHeaderCell scope='col'>receiver_phone</CTableHeaderCell>
              <CTableHeaderCell scope='col'>address</CTableHeaderCell>
              <CTableHeaderCell scope='col'></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map((item, i) => {
              return (
                <CTableRow key={item.id}>
                  <CTableHeaderCell>{i + 1}</CTableHeaderCell>
                  <CTableDataCell>{item.sender}</CTableDataCell>
                  <CTableDataCell>{item.sender_phone}</CTableDataCell>
                  <CTableDataCell>{item.receiver}</CTableDataCell>
                  <CTableDataCell>{item.receiver_phone}</CTableDataCell>
                  <CTableDataCell>{item.address}</CTableDataCell>
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
      </CTableBody>
    </Fragment>
  );
};
export default InvoiceContainer;
