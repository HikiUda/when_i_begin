import React from 'react';
import ContentLoader from 'react-content-loader';

const CotologProductSceleton: React.FC = (props: any) => (
   <ContentLoader
      speed={2}
      width={215}
      height={260}
      viewBox="0 0 215 260"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <rect x="45" y="23" rx="0" ry="0" width="132" height="119" />
      <rect x="45" y="157" rx="0" ry="0" width="133" height="13" />
      <rect x="44" y="176" rx="0" ry="0" width="133" height="13" />
      <rect x="45" y="201" rx="0" ry="0" width="72" height="13" />
      <rect x="46" y="223" rx="0" ry="0" width="72" height="15" />
      <rect x="138" y="200" rx="0" ry="0" width="37" height="38" />
      <rect x="121" y="254" rx="0" ry="0" width="5" height="3" />
   </ContentLoader>
);

export default CotologProductSceleton;
