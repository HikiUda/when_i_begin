import Canvas from './Canvas';
import Settingbar from './Settingbar';
import Toolbar from './Toolbar';

const Session = () => {
   return (
      <div className="app">
         <Toolbar />
         <Settingbar />
         <Canvas />
      </div>
   );
};

export default Session;
