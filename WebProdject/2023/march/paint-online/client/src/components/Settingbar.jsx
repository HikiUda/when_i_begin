import toolState from '../store/toolState';

const Settingbar = () => {
   function changeLineWidth(e) {
      if (e.target.value > 50) {
         toolState.setLineWidth(50);
         return;
      }
      toolState.setLineWidth(e.target.value);
   }
   return (
      <div className="settingbar">
         <label htmlFor="line-width"> Толщина линии</label>
         <input
            onChange={changeLineWidth}
            style={{ margin: '0 10px' }}
            id="line-width"
            type="number"
            defaultValue={1}
            min={1}
            max={50}
         />
         <label htmlFor="stroke-color">Цвет обводки</label>
         <input
            onChange={(e) => toolState.setStrokeColor(e.target.value)}
            style={{ margin: '0 10px' }}
            id="stroke-color"
            type="color"
         />
      </div>
   );
};

export default Settingbar;
