import app from './app';
import { PORT } from './configs/env';

app.listen(PORT, () => {
  console.log(`2sow is listening on port ${PORT}`);
});
