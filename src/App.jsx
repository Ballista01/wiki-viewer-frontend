import { Container, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import QueryList from './QueryList';

function App() {
  const [state, setState] = useState({
    input: '',
    queryResult: null,
  });
  const wikiQuery = async (input) => {
    const response = await fetch(`/api?input=${input}`);
    const body = await response.json();
    console.log(body);
    return body;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    wikiQuery(state.input)
      .then((res) => {
        setState((prevState) => ({ ...prevState, queryResult: res }));
      })
      .catch((err) => console.error(err));
  };
  const handleChange = (e) => {
    const input = e.target.value;
    setState((prevState) => ({ ...prevState, input }));
    console.log(`state.input = ${state.input}`);
  };
  return (
    <Container className="App">
      <form onSubmit={handleSubmit}>
        <TextField
          id="search-field"
          label="Search Wiki"
          type="search"
          placeholder="katana"
          onChange={handleChange}
          value={state.input}
        />
      </form>
      {state.queryResult ? <QueryList query={state.queryResult} /> : null}
    </Container>
  );
}

export default App;
