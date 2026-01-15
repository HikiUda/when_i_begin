import { FC, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import DeviceItem from '../components/DeviceItem';
import { getBasket } from '../http/basketApi';
import { IDevice } from '../store/DeviceStore';

const Basket: FC = () => {
   const [devices, setDevices] = useState<IDevice[]>([]);
   useEffect(() => {
      getBasket().then((res) => setDevices(res.data));
   }, []);

   return (
      <Container>
         <Row className="d-flex" style={{ gap: 10 }}>
            {devices.map((device) => (
               <DeviceItem device={device} key={device.id} />
            ))}
         </Row>
      </Container>
   );
};

export default Basket;
