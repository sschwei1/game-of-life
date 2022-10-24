import { useState } from 'react';

import './styles/main.less';
import {Game} from './components/game';

const App = () => {
  const [count, setCount] = useState<Number>(0)

  return (
    <div className='main'>
      <Game />
    </div>
  )
}

export default App
