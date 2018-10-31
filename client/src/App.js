import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import Navigation from './components/Navigation'
import FormContainer from './components/FormContainer'
import Footer from './components/Footer'

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, network: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get pertinent ERC 725 Contract ABI
      // const Contract = truffleContract(SimpleStorageContract);
      // const instance = await Contract.deployed();
      // Contract.setProvider(web3.currentProvider);


      const network = await web3.eth.net.getId();

      console.log("network = ", network);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, network });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navigation network={this.state.network}/>

        <FormContainer />

        <Footer />
      </div>
    );
  }
}

export default App;