let state = {
  hash: window.location.hash,
  inputValue: "",
};

/*
React.createElement() === DOM

sebelum state :
event => ubah DOM

state :
event => state => ubah DOM
*/

function setState(newState) {
  const nextState = { ...state, ...newState };
  state = nextState;
  render();
}

function CartPage() {
  const title = document.createElement("h1");
  title.textContent = "Cart Page";

  const link = document.createElement("a");
  link.href = "#about";
  link.textContent = "go to about";
  link.onclick = function (event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    setState({ hash: url.hash });
    history.pushState({}, "", url);
  };

  const input = document.createElement("input");
  input.placeholder = "input product name";
  input.oninput = (event) => {
    setState({ inputValue: event.target.value });
  };
  input.value = state.inputValue;

  const buttonClear = document.createElement("button");
  buttonClear.textContent = "clear";
  buttonClear.onclick = () => {
    setState({ inputValue: "" });
  };

  const textPreview = document.createElement("p");
  textPreview.textContent = state.inputValue;

  const container = document.createElement("div");
  container.append(title, link, input, buttonClear, textPreview);

  return container;
}

function AboutPage() {
  const title = document.createElement("h1");
  title.textContent = "About Page";

  const link = document.createElement("a");
  link.href = "#home";
  link.textContent = "go to cart";
  link.onclick = function (event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    setState({ hash: url.hash });
    history.pushState({}, "", url);
  };

  const container = document.createElement("div");
  container.append(title, link);

  return container;
}

function App() {
  if (state.hash === "" || state.hash === "#home") {
    return CartPage();
  } else if (state.hash === "#about") {
    return AboutPage();
  }
}

function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.append(App());
}

render();
