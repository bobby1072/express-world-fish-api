import Fish from './FishClass';
import AllFish from './AllFishDataClass';
import bodyParser from 'body-parser';
const cors = require('cors');
import express, { Application, Request, Response } from 'express';

const app: Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post(
  '/speciesfullinfo',
  async (req: Request, res: Response): Promise<void> => {
    const fishJson = req.body;
    if (fishJson.Code && fishJson.Name && fishJson.ScientificName) {
      try {
        const myFish = new Fish(
          fishJson.Name,
          fishJson.Code,
          fishJson.ScientificName,
          fishJson.Alias && fishJson.Alias
        );
        await Promise.all([
          myFish.getSpeciesNumbers(),
          myFish.getSpeciesInfo()
        ]);
        res.status(200);
        res.send(myFish.createFishJson());
      } catch (error) {
        res.status(500);
        res.send('Internal server error occured.');
        throw new Error('Most likely failed on api requests or response.');
      }
    } else {
      res.status(422);
      res.send('Unprocessable body given');
      throw new Error('User gave an invalid body');
    }
  }
);

app.get('/findspecieslist/', (req: Request, res: Response): void => {
  const searchTerm = req.query.specieskey;
  if (typeof searchTerm === 'string' && /^[A-Za-z\s]*$/.test(searchTerm)) {
    try {
      const allFish = new AllFish();
      const potentialFishArr = allFish.findFish(searchTerm);
      res.status(200);
      res.json(allFish.createApiResp(potentialFishArr));
    } catch (error) {
      res.status(500);
      res.send('Internal server error occured.');
      throw new Error('Most likely failed on api requests or response.');
    }
  } else {
    res.status(400);
    res.send('possibly inncorrect URL argument given.');
    throw new Error('User gave an invalid URL arg');
  }
});

const portVar: string | number = process.env.PORT || 5000;
app.listen(portVar, () =>
  console.log(`\n\nServer running on port: ${portVar}\n\n`)
);
