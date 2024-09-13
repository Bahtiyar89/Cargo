import { CButton } from '@coreui/react-pro';
import React, { Fragment } from 'react';
import { ReactToPrint } from 'react-to-print';

const CartTable = ({ items }) => {
  const componentRef = React.useRef(null);

  return (
    <Fragment>
      <ReactToPrint
        trigger={() => {
          return <CButton color={'secondary'}>Print</CButton>;
        }}
        content={() => componentRef.current}
        documentTitle='title'
        removeAfterPrint={false}
      />
      <div ref={componentRef}>
        {items.map((item, index) => {
          console.log('iiii ', item);

          return (
            <div
              style={{
                margin: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'black',
                borderStyle: 'solid',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 25 }}>
                Alıcı: {item?.receiver_id?.receiver}
              </p>
              <p style={{ fontSize: 25 }}>
                Gönderen: {item?.receiver_id?.sender}
              </p>
              <p style={{ fontSize: 25 }}>
                Gönderici: {item?.receiver_id?.sender_phone}
              </p>
              <p style={{ fontSize: 25 }}>
                Alıcı: {item?.receiver_id?.receiver_phone}
              </p>
              <p style={{ fontSize: 25 }}>
                Address: {item?.receiver_id?.address}
              </p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default CartTable;
