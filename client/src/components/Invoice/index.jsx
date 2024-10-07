import React, { Fragment } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro';

const InvoiceTable = ({ items, hanleDeleteInvoice }) => {
  const navigate = useNavigate();
  const componentRef = React.useRef(null);

  return (
    <Fragment>
      {/*    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <ReactToPrint
          trigger={() => {
            return <CButton color={'secondary'}>Print</CButton>;
          }}
          content={() => componentRef.current}
          documentTitle='title'
          removeAfterPrint={false}
        />
      </div>*/}

      <CTable ref={componentRef}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>#</CTableHeaderCell>
            <CTableHeaderCell scope='col'>barcod</CTableHeaderCell>
            <CTableHeaderCell scope='col'>adres</CTableHeaderCell>
            <CTableHeaderCell scope='col'>kg</CTableHeaderCell>
            <CTableHeaderCell scope='col'>alıcı ve tel</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Ambalaj tipi</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Araba numarası</CTableHeaderCell>
            <CTableHeaderCell scope='col'>fiyat</CTableHeaderCell>
            <CTableHeaderCell scope='col'></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {items.map((item, index) => {
            console.log('item: ', item);

            return (
              <CTableRow key={index}>
                <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.barcod}</CTableDataCell>
                <CTableDataCell>{item?.receiver_id?.address}</CTableDataCell>
                <CTableDataCell>{item.kg}</CTableDataCell>
                <CTableDataCell>
                  {item?.receiver_id?.receiver +
                    ' ' +
                    item?.receiver_id?.receiver_phone}
                  <br />
                  {item?.receiver_id?.sender +
                    ' ' +
                    item?.receiver_id?.sender_phone}
                </CTableDataCell>
                <CTableDataCell>{item.ambalaj_type}</CTableDataCell>
                <CTableDataCell>{item.vehicle_number}</CTableDataCell>
                <CTableDataCell>{item.price}</CTableDataCell>
                <CTableDataCell>
                  <Fragment>
                    <CButton
                      onClick={() => navigate(`../edit-invoice/${item._id}`)}
                      color='primary'
                      variant='outline'
                      shape='square'
                      size='sm'
                    >
                      <FaPen />
                    </CButton>
                    <CButton
                      onClick={() => hanleDeleteInvoice(item._id)}
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
    </Fragment>
  );
};
export default InvoiceTable;
