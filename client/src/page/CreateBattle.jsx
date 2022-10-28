import React from 'react';
import { PageHOC } from '../components';

const CreateBattle = () => {
  return (
    <div>
      <h1 className='text-white text-3xl'>Hello from the create battle page</h1>
    </div>
  )
};

export default PageHOC(
  CreateBattle,
  <>Create <br/> a new Battle</>,
  <>Create your custom battle and invite players to join you</>
  );