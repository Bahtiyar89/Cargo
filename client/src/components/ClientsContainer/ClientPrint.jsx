import React, { useState, useEffect, Fragment } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro';

import ReactToPrint from 'react-to-print';
import './style.css';
import { FaPrint } from 'react-icons/fa';

const ClientPrint = ({ client, visible, handleVisible }) => {
  const componentRef = React.useRef(null);
  const [showPrint, setShowPrint] = useState(false);
  return (
    <CModal
      size='lg'
      backdrop='static'
      visible={visible}
      onClose={() => handleVisible(false)}
      aria-labelledby='StaticBackdropExampleLabel'
    >
      <CModalBody style={{ padding: 10 }} ref={componentRef}>
        <h3 style={{ textAlign: 'center', padding: 10 }}>
          Magdanly Express Kargo
        </h3>
        <CTable bordered>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope='row'>Alıcı</CTableHeaderCell>
              <CTableDataCell>{client.receiver}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope='row'>Gönderen</CTableHeaderCell>
              <CTableDataCell>{client.sender}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope='row'>Alıcı tel.</CTableHeaderCell>
              <CTableDataCell>{client.receiver_phone}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope='row'>Adres</CTableHeaderCell>
              <CTableDataCell>{client.address}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CModalBody>

      <CModalFooter>
        <CButton color='secondary' onClick={() => handleVisible(false)}>
          kapat
        </CButton>
        <ReactToPrint
          trigger={() => {
            return (
              <CButton color={'secondary'}>
                Yazdır <FaPrint />
              </CButton>
            );
          }}
          content={() => componentRef.current}
          documentTitle='title'
          onBeforePrint={() => {
            return setShowPrint(true);
          }}
          onAfterPrint={() => setShowPrint(false)}
          removeAfterPrint={false}
        />
      </CModalFooter>
    </CModal>
  );
};
export default ClientPrint;
