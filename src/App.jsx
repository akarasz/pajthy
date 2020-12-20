import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <Countdown />
    <Control />
  </div>)

const Header = () => (
  <header>
    <logo></logo>
    <h1>Pajthy</h1>
  </header>)

const Countdown = () => (
  <countdown></countdown>)

const Landing = () => (
  <content>
    <TextInput name="Session" placeholder="Alpha Team Grooming 1st of April" />
    <BigButton text="Fibonacci" />
    <BigButton text="T-Shirt" />
  </content>)

const Control = () => (
  <content class="admin">
    <h2>Alpha Team Grooming 1st of April</h2>
    <div class="share">
      <div class="link">https://pajthy.com/abcde</div>
      <div class="button">Copy</div>
    </div>
    <hr />
    <BigButton text="Begin voting!" />
    <hr />
    <table class="votes">
      <tbody>
        <tr>
          <td>Alice (x)</td>
          <td>2</td>
        </tr>
        <tr>
          <td>Bob (x)</td>
          <td>?</td>
        </tr>
        <tr>
          <td>Carol (x)</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </content>)

const TextInput = ({ name, placeholder }) => (
  <div class="pair">
    <label for={name}>{name}</label>
    <input id={name} type="text" placeholder={placeholder} />
  </div>)

const BigButton = ( { text }) => (
  <button class="big">{text}</button>)

export default App;
