import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Context } from '..';

const TypeBar = observer(() => {
   const context = useContext(Context);
   return (
      <ListGroup>
         {context?.device.types.map((type) => (
            <ListGroup.Item
               style={{ cursor: 'pointer' }}
               active={type.id === context?.device.selectedType.id}
               onClick={() => context?.device.setSelectedType(type)}
               key={type.id}>
               {type.name}
            </ListGroup.Item>
         ))}
      </ListGroup>
   );
});

export default TypeBar;
