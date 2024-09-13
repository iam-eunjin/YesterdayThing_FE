const express = require('express');
const axios = require('axios');
const cors = require('cors'); // CORS 라이브러리 추가

const app = express();
const port = 4000;

// CORS 허용 설정
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.get('/news', async (req, res) => {
  const clientId = 'kl1pQyC2pz4YDpTIKtcO'; // 네이버에서 발급받은 Client ID
  const clientSecret = 'iNn4GKZgid'; // 네이버에서 발급받은 Client Secret
  const query = req.query.query || 'React';

  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
      params: { query, display: 10 },
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Naver API' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
