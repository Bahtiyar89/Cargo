import React, { Fragment, useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useAllInvoicesContext } from '../../pages/AllInvoices';
import { ReactToPrint } from 'react-to-print';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro';

const CartTable = ({ items }) => {
  const componentRef = React.useRef(null);

  return (
    <Fragment>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <ReactToPrint
          trigger={() => {
            return <CButton color={'secondary'}>Print</CButton>;
          }}
          content={() => componentRef.current}
          documentTitle='title'
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
            <CTableHeaderCell scope='col'>alıcı ve tel</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Ambalaj tipi</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Araba numarası</CTableHeaderCell>
            <CTableHeaderCell scope='col'>fiyat</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {items.map((item, index) => {
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
                </CTableDataCell>
                <CTableDataCell>{item.ambalaj_type}</CTableDataCell>
                <CTableDataCell>{item.vehicle_number}</CTableDataCell>
                <CTableDataCell>{item.price}</CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>
    </Fragment>
  );
};
export default CartTable;
