const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Journey Builder Config
app.get('/config.json', (req, res) => {
  res.sendFile(__dirname + '/public/config.json');
});

// UI Page
app.get('/activity', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 🔥 SEND SMS TO MESSAGEWHIZ
app.post('/sendSMS', async (req, res) => {
  const { phone, message } = req.body;

  try {
    const response = await axios.post(
      "https://api.messagewhiz.com/sms/send",
      {
        mobile: phone,
        message: message,
        senderId: "MSGWHZ"
      },
      {
        headers: {
          "Authorization": "Bearer YOUR_MESSAGEWHIZ_API_KEY"
        }
      }
    );

    res.json({ status: "SMS Sent", data: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("MessageWhiz Activity Running"));