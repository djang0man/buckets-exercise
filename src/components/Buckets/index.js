import React, { useRef, useState, useEffect } from 'react';
import Bucket from '../Bucket';

import { useBucketsContext } from '../App';
import { TARGET_LEVEL } from '../../constants';

function Buckets() {
  const didMountRef = useRef(false);
  const { buckets } = useBucketsContext();

  const [clicks, setClick] = useState(0);
  useEffect(() => {
    if (didMountRef.current) {
      setClick(clicks => clicks + 1)
    } else {
      didMountRef.current = true;
    }
  }, [buckets]);

  const [level, setLevel] = useState(0);
  useEffect(() => {
    setLevel(buckets.map(bucket => bucket.level).reduce((total, current) => total + current, 0))
  }, [buckets]);

  return (
    <>
      <div>
        <p className="text-large">👍 target: { TARGET_LEVEL }</p>
        <p className="text-large">🚰 current: { level }</p>
        <p className="text-large">🖱️ actions: { clicks }</p>
      </div>

      <div>
        {level === TARGET_LEVEL
          ? <div className="text-xlarge">🎉😎</div>
          : buckets.map(bucket => (
            <Bucket
              key={ bucket.id }
              bucket={ bucket }
            />
          ))
        }
      </div>
    </>
  )
}

export default Buckets;

