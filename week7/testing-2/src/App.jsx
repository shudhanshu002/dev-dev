import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { countAtom } from './store/atom';

function Counter() {
  const [count, setCount] = useRecoilState(countAtom);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function Display() {
  const count = useRecoilValue(countAtom);
  return <h2>Display only: {count}</h2>;
}

function Reset() {
  const setCount = useSetRecoilState(countAtom);
  return <button onClick={() => setCount(0)}>Reset</button>;
}

function App() {
  return (
    <>
      <h1>Recoil Hook Demo</h1>
      <Counter />
      <Display />
      <Reset />
    </>
  );
}

export default App;
