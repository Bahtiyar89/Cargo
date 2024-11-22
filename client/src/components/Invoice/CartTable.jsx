import React, { Fragment, useRef, useEffect } from 'react';
import { ReactToPrint } from 'react-to-print';
import {
  CButton,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro';

const CartTable = ({ items }) => {
  const componentRef = React.useRef(null);
  let totalkg = items.reduce(
    (accumulator, current) => parseFloat(accumulator) + parseFloat(current.kg),
    0
  );
  let totalprice = items.reduce(
    (accumulator, current) =>
      parseFloat(accumulator) + parseFloat(current.price),
    0
  );

  const text = async (filename, elId) => {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    link.setAttribute('download', filename);
    link.setAttribute(
      'href',
      'data:' + 'text/doc' + ';charset=utf-8,' + encodeURIComponent(elHtml)
    );
    link.click();
    console.log('link: ', link);
  };
  var fileName = 'tags.doc'; // You can use the .txt extension if you want

  return (
    <Fragment>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <ReactToPrint
          trigger={() => {
            return <CButton color={'secondary'}>Yazdır</CButton>;
          }}
          content={() => componentRef.current}
          documentTitle='title'
          removeAfterPrint={false}
        />
        <CButton
          style={{ marginLeft: 20 }}
          onClick={() => text(fileName, 'main')}
          color={'secondary'}
        >
          Word indir
        </CButton>
      </div>

      <div id='main'>
        <CTable ref={componentRef} bordered borderColor='secondary'>
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
                    <br />
                    {item?.receiver_id?.sender +
                      ' ' +
                      item?.receiver_id?.sender_phone}
                  </CTableDataCell>
                  <CTableDataCell>{item.ambalaj_type}</CTableDataCell>
                  <CTableDataCell>{item.vehicle_number}</CTableDataCell>
                  <CTableDataCell>{item.price}</CTableDataCell>
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>
        <div style={{ marginTop: 30 }}>
          Toplam: {items.length}, kg: {totalkg}, fiyat: {totalprice}
        </div>
      </div>
    </Fragment>
  );
};
export default CartTable;
