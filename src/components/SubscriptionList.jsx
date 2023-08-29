import React from 'react';
import SubscriptionItem from './SubscriptionItem';

function SubscriptionList({ events }) {
  return (
    <div>
      {events.map((event, index) => (
        <SubscriptionItem
          key={event.ipoId}
          event={event}
        />
      ))}
    </div>
  );
}

export default SubscriptionList;
