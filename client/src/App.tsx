import { RecoilRoot } from 'recoil';
import './App.css';
import Input from './components/Input';
import Hive from './components/Hive';

function App() {
  return (
    <RecoilRoot>
      <Input />
      <Hive />
    </RecoilRoot>
  );
}

export default App;
