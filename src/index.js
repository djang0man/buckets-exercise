import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';

const CAPACITY_A = 3;
const CAPACITY_B = 5;
const TARGET_LEVEL = 4;

const BUCKET_DEFAULTS = [
  { id: btoa(Math.random()), level: 0, capacity: CAPACITY_A },
  { id: btoa(Math.random()), level: 0, capacity: CAPACITY_B }
]

const BucketsContext = createContext();

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

  function findOtherBucket(a) {
    return buckets.find(b => b.id !== a.id);
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

function Buckets() {
  const didMountRef = useRef(false);
  const { buckets } = useContext(BucketsContext);

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
    setLevel(buckets.map(bucket => bucket.level).reduce((a, c) => a + c, 0))
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

function Bucket(props) {
  const { bucket } = props;
  const {
    transferable,
    onFillBucket,
    onEmptyBucket,
    onTransferBucket
  } = useContext(BucketsContext);

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

function Button(props) {
  const { onClick, className, disabled, children } = props;
  return (
    <button
      type="button"
      onClick={ onClick }
      disabled={ disabled }
      className={ className }
    >
      { children }
    </button>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

