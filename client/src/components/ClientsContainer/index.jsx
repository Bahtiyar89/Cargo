import React, { useState, useEffect } from 'react';
import { FaPen, FaPrint, FaTrash } from 'react-icons/fa';
import { useAllClientsContext } from '../../pages/AllClients';
import { Form, useNavigate } from 'react-router-dom';
import { CButton, CSmartTable } from '@coreui/react-pro';

import ClientPrint from './ClientPrint';

const ClientsContainer = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [client, setClient] = useState({});
  const { data } = useAllClientsContext();
  const { clients } = data;
  const [items, setItems] = useState([]);

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
    },
    { key: 'edit', filter: false, sorter: false, label: '' },
    {
      key: 'delete',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
    { key: 'print', filter: false, sorter: false, label: '' },
  ];

  const handleModal = (val) => {
    setVisible(true);
    setClient(val);
  };

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
          console.log('item::: ', item);

          return (
            <td className='py-2'>
              <CButton
                onClick={() => navigate(`../edit-client/${item._id}`)}
                color='primary'
                variant='outline'
                shape='square'
                size='sm'
              >
                <FaPen />
              </CButton>
            </td>
          );
        },
        print: (item) => {
          return (
            <td className='py-2'>
              <CButton
                onClick={() => handleModal(item)}
                color='primary'
                variant='outline'
                shape='square'
                size='sm'
              >
                <FaPrint />
              </CButton>

              <ClientPrint
                client={client}
                visible={visible}
                handleVisible={(val) => setVisible(val)}
              />
            </td>
          );
        },
        delete: (item) => {
          return (
            <td className='py-2'>
              <Form method='post' action={`../delete-client/${item._id}`}>
                <button type='submit' className='btn delete-btn'>
                  <FaTrash color={'red'} />
                </button>
              </Form>
            </td>
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
