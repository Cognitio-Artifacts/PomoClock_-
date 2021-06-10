import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from 'react';
import { getDataAction } from './actions'
import './defaultComponent.scss';

const DefaultComponent = () => {
  const storeData = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='sectionHome-container'>
      {
        storeData?.loading
          ? <h1>Loading...</h1>
          : <Fragment>
            <h1>Welcome to Cognitio Artifacts SAS</h1>
            <div>{storeData.hello}</div>
            {storeData?.data && <p>{storeData?.data.name} </p>}
          </Fragment>
      }
    </section>
  );
}

export default DefaultComponent;
