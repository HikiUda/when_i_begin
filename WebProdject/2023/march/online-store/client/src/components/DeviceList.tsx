import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '..';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
   const context = useContext(Context);
   return (
      <Row className="d-flex" style={{ gap: 10 }}>
         {context?.device.devices.map((device) => (
            <DeviceItem device={device} key={device.id} />
         ))}
      </Row>
   );
});

export default DeviceList;
