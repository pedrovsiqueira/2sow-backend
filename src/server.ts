import app  from './app';

app.listen(process.env.PORT || 5000, () => {
  console.log(` 2sow is listening on port ${process.env.PORT}`);
});
