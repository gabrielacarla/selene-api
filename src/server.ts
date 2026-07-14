import "dotenv/config";
import app from "./app";

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Selene API running on port ${PORT}`);
});