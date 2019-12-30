import React from 'react';
import StatsSubscriber from './StatsSubscriber';
import ModifiersSubscriber from './ModifiersSubscriber';
import TargetModifiersSubscriber from './TargetModifiersSubscriber';

const StoreSubscriber = () => (
  <div style={{ display: 'none !important' }}>
    <StatsSubscriber />
    <ModifiersSubscriber />
    <TargetModifiersSubscriber />
  </div>
);

export default StoreSubscriber;
