import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSceleton: React.FC = (props) => (
   <ContentLoader
      speed={2}
      width={315}
      height={470}
      viewBox="0 0 315 470"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <circle cx="140" cy="140" r="140" />
      <rect x="1" y="290" rx="0" ry="0" width="280" height="16" />
      <rect x="4" y="325" rx="0" ry="0" width="280" height="84" />
      <rect x="0" y="431" rx="0" ry="0" width="87" height="27" />
      <rect x="135" y="422" rx="0" ry="0" width="151" height="44" />
   </ContentLoader>
);

export default PizzaSceleton;
