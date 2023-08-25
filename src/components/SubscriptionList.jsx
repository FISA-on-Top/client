import React from 'react';
import SubscriptionItem from './SubscriptionItem';

function SubscriptionList({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <SubscriptionItem key={index} title={item.title} description={item.description} />
      ))}
    </div>
  );
}

export default SubscriptionList;
