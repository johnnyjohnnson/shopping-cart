import logo from './logo.svg';
import './App.css';
import { CartHeader } from './CartHeader';
import { CartFooter } from './CartFooter';
import { CartItems} from './CartItems';

function App() {
  return (
    <div className="App">
      <CartHeader />
      <CartItems />
      <CartFooter copyright="2021"/>
    </div>
  );
}

export default App;
