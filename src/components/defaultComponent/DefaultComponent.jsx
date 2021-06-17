import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getDataAction } from './actions';
import { Timer } from "../Timer";
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
          ? <h1>🍅</h1>
          : <Timer />
      }
    </section>
  );
}

export default DefaultComponent;
