import { FC } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { IDevice } from '../store/DeviceStore';
import star from './../accets/img/star.png';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';

interface DeviceItemProps {
   device: IDevice;
}

const DeviceItem: FC<DeviceItemProps> = ({ device }) => {
   const navigate = useNavigate();

   return (
      <Col md={3} className="mt-3">
         <Card
            style={{ width: 150, cursor: 'pointer' }}
            border={'light'}
            onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
            <div className="mt-1 text-black-50 d-flex justify-content-between align-items-center">
               <div>samsung...</div>
               <div className="d-flex align-items-center">
                  <div>{device.rating}</div>
                  <Image width={20} height={20} src={star} />
               </div>
            </div>
            <div>{device.name}</div>
         </Card>
      </Col>
   );
};

export default DeviceItem;
