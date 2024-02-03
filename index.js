import Bard from "./src/bard.js"
import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ credits: "Ivan Cotacte" })
})

app.post('/', async (req, res) => {
  try {
    let { message, image_url } = req.body;
    if (!message) return res.status(500).send({ message: "Missing paraneter 'message'" });

    let myBard = new Bard(""); //// COOKIE HERE ////

    if (image_url) {
      const imageBuffer = await fetch(image_url).then(res => res.arrayBuffer());
      let response = await myBard.ask(message, { image: imageBuffer });
      console.log(response);
      return res.send(response);
    } else {
      let response = await myBard.ask(message);
      console.log(response);
      return res.send(response);
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.send({ message: `An error occurred, please contact 'Ivan Cotacte'` });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});