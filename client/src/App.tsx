import { RecoilRoot } from 'recoil';
import Status from './components/status/Status';
import Controls from './components/controls/Controls';

function App() {
  return (
    <RecoilRoot>
      <Status />
      <Controls />
    </RecoilRoot>
  );
}

export default App;
