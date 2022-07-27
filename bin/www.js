import app from '../src/app.js'
import Debug from "debug";

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`
  ################################################
  🛡️  Server listening on ${PORT} OPEN
  ################################################
`);
});
