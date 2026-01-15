import { FC, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';

const Admin: FC = () => {
   const [brandVisible, setBrandVisible] = useState<boolean>(false);
   const [typeVisible, setTypeVisible] = useState<boolean>(false);
   const [deviceVisible, setDeviceVisible] = useState<boolean>(false);
   return (
      <Container className="d-flex flex-column">
         <Button onClick={() => setTypeVisible(true)} variant={'outline-dark'} className="mt-2 p-2">
            Добавить тип
         </Button>
         <Button
            onClick={() => setBrandVisible(true)}
            variant={'outline-dark'}
            className="mt-2 p-2">
            Добавить бренд
         </Button>
         <Button
            onClick={() => setDeviceVisible(true)}
            variant={'outline-dark'}
            className="mt-2 p-2">
            Добавить устройство
         </Button>
         <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
         <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
         <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      </Container>
   );
};

export default Admin;
