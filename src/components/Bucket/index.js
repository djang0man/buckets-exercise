import React from 'react';
import Button from '../Button';

import { useBucketsContext } from '../App';

function Bucket(props) {
  const { bucket } = props;
  const {
    transferable,
    onFillBucket,
    onEmptyBucket,
    onTransferBucket
  } = useBucketsContext();

  return (
    <div>
      <Button
        disabled={ bucket.level === bucket.capacity }
        onClick={ () => onFillBucket(bucket.id) }
      >
        Fill
      </Button>

      <Button
        disabled={ !bucket.level }
        onClick={ () => onEmptyBucket(bucket.id) }
      >
        Empty
      </Button>

      <Button
        disabled={ !bucket.level || !transferable(bucket) }
        onClick={ () => onTransferBucket(bucket) }
      >
        Transfer
      </Button>
      <span className="text-medium">{ bucket.level } / { bucket.capacity }</span>
    </div>
  )
}

export default Bucket;

