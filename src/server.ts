import "dotenv/config";      // .env 자동 로드
import app from "./app.js";  // ESM 해석 위해 .js 확장자처럼 적어도 tsx가 해결해줌

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
