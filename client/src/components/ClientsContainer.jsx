import React, { Fragment, useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useAllClientsContext } from '../pages/AllClients';
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

const ClientsContainer = () => {
  const { data } = useAllClientsContext();
  const { clients } = data;
  const [items, setItems] = useState([]);
  const [showPrint, setShowPrint] = useState(false);

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
    <CSmartTable
      style={{ zIndex: 0 }}
      activePage={2}
      columns={columns}
      columnFilter
      columnSorter
      items={items}
      itemsPerPageSelect
      itemsPerPage={10}
      pagination
      scopedColumns={{
        edit: (item) => {
          return (
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
          );
        },
      }}
      tableProps={{
        className: 'add-this-class',
        responsive: true,
        striped: true,
        hover: true,
      }}
    />
  );
};
export default ClientsContainer;
