import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  async function submitForm(e) {
    e.preventDefault();


    const webhookUrl = 'https://internteamorg.slack.com/archives/C05G7BD87J7/p1688971822123479';

    const data = {
      "text": `Name: ${name} \n${email} \n${message}`,

    }


    let res = await axios.post(webhookUrl, JSON.stringify(data), {
      withCredentials: false,
      transformRequest: [(data, headers) => {
        delete headers.post["Content-Type"]
        return data
      }]
    })

    if (res.status === 200) {
      alert("Message Sent!")

      //clear state so text boxes clear
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert("There was an error.  Please try again later.")
    }

  }

  return (
    <div className="flex">
      <div >
        <form>
          <center>
         <h1> Send Msg To Slack</h1><br></br><br></br>
          <label >
            Name
        </label>
          <input
            id="name"
            type="text"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <br></br>
          <br></br>

          <label>
            Email
        </label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
         <br></br>
         <br></br>
          <label>
            Message
        </label>
          <textarea
            id="message"
            type="message"
            placeholder="Write your message here"
            value={message}
            onChange={(e) => { setMessage(e.target.value) }}
          />
          <br></br>
          <br></br>
          <button
            onClick={(e) => submitForm(e)}>
            Submit
        </button>
        </center>
        </form>
      </div>
    </div>
  );
}
 
export default App;