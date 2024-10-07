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
      size='xl'
      backdrop='static'
      visible={visible}
      onClose={() => handleVisible(false)}
      aria-labelledby='StaticBackdropExampleLabel'
    >
      <CModalBody style={{ padding: 10 }} ref={componentRef}>
        <h1
          style={{
            textAlign: 'center',
            padding: 10,
            textTransform: 'uppercase',
            fontSize: 30,
          }}
        >
          Magdanly Express Kargo
        </h1>
        <CTable bordered>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope='row' style={{ fontSize: 36 }}>
                ALICI
              </CTableHeaderCell>
              <CTableDataCell
                style={{ fontSize: 24, textTransform: 'uppercase' }}
              >
                {client.receiver}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell style={{ fontSize: 36 }} scope='row'>
                GÖNDEREN
              </CTableHeaderCell>
              <CTableDataCell
                style={{ fontSize: 36, textTransform: 'uppercase' }}
              >
                {client.sender}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell style={{ fontSize: 36 }} scope='row'>
                ALICI TEL.
              </CTableHeaderCell>
              <CTableDataCell
                style={{ fontSize: 36, textTransform: 'uppercase' }}
              >
                {client.receiver_phone}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell style={{ fontSize: 36 }} scope='row'>
                ADRES
              </CTableHeaderCell>
              <CTableDataCell
                style={{ fontSize: 36, textTransform: 'uppercase' }}
              >
                {client.address}
              </CTableDataCell>
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
          pageStyle={{ padding: 20 }}
          content={() => componentRef.current}
          documentTitle=''
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
