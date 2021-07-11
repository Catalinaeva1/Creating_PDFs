import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { saveAs } from 'file-saver';

import './App.css';
import '.'

const anchors = document.querySelectorAll( 'a[href^="http"]:not([href*="example.com"])' );
class App extends Component {
  state = {
    name: '',
    receiptId: 0,
    price1: 0.00,
    price2: 0.00,
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'NewPdf.pdf');
      })
  }

  render() {
    return (
      <div className="App">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Creating PDFs with Node.js</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
       <div className="Banner ex2"><h1>How to Create PDFs Using Node.js</h1></div>
       <div className="wrapper">
       
          <div class="Sidebar">
            <h3 class="w3-bar-item">Menu</h3>
            <a href="https://nodejs.dev/learn" rel="noopener noreferrer" target="_blank" class="w3-bar-item w3-button">Link 1</a>
            <a href="https://nodejs.dev/learn" rel="noopener noreferrer" target="_blank">Link 2</a>
            <a href="https://nodejs.dev/learn" rel="noopener noreferrer" target="_blank">Link 3</a>
          </div>
          <div className="main-content">          
                  <p>Please enter the following information in the text-boxes below:</p>
                  <input type="text" placeholder="Name - Enter any name you choose" name="name" onChange={this.handleChange}/>
                  <input type="number" placeholder="Receipt ID - Enter any numbers" name="receiptId" onChange={this.handleChange} />
                  <input type="number" placeholder="Price 1 - Enter any price without dollar sign" name="price1" onChange={this.handleChange} />
                  <input type="number" placeholder="Price 2 - Enter any price without dollar sign" name="price2" onChange={this.handleChange} />
                  <div className="button-align">
                  <button onClick={this.createAndDownloadPdf}>Download PDF</button>
                </div>
              </div>
          </div>
        <div className="Footer">PDF Test Site</div>
      </div>
    );
  }
}

export default App;