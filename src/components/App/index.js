import React, { createContext, useContext, useState } from 'react';
import Buckets from '../Buckets';

import '../../styles/main.scss';

import {
  BUCKET_DEFAULTS
} from '../../constants';

const BucketsContext = createContext({});
export const useBucketsContext = () => useContext(BucketsContext);

function App() {
  const [buckets, setBuckets] = useState(BUCKET_DEFAULTS);

  function onFillBucket(id) {
    const newBuckets = buckets.map(bucket =>
      bucket.id === id
        ? { ...bucket, level: bucket.capacity }
        : bucket
      );
    setBuckets(newBuckets);
  }

  function onEmptyBucket(id) {
    const newBuckets = buckets.map(bucket =>
      bucket.id === id
        ? { ...bucket, level: 0 }
        : bucket
      );
    setBuckets(newBuckets);
  }

  function onTransferBucket(from) {
    const to = findOtherBucket(from);
    const amount = Math.min(from.level, (to.capacity - to.level));

    const newBuckets = buckets.map(bucket =>
      bucket.id === from.id
        ? { ...bucket, level: bucket.level - amount }
        : { ...bucket, level: bucket.level + amount }
      );
    setBuckets(newBuckets);
  }

  function transferable(from) {
    const to = findOtherBucket(from);
    return to.level !== to.capacity;
  }

  function findOtherBucket(bucketA) {
    return buckets.find(bucketB => bucketB.id !== bucketA.id);
  }

  return (
    <BucketsContext.Provider
      value={{
        buckets,
        transferable,
        onFillBucket,
        onEmptyBucket,
        onTransferBucket
      }}>
      <Buckets />
    </BucketsContext.Provider>
  );
}

export default App;

