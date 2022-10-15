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
          fishJson.ScientificName
        );
        await myFish.getSpeciesNumbers();
        await myFish.getSpeciesInfo();
        res.status(200);
        res.send(myFish.createFishJson());
      } catch (error) {
        res.status(500);
        res.send('Internal server error occured.');
      }
    } else {
      res.status(422);
      res.send('Unprocessable body given');
    }
  }
);

app.get('/findspecieslist/', (req: Request, res: Response): void => {
  const searchTerm = req.query.specieskey;
  if (typeof searchTerm === 'string' && searchTerm.match('^[A-Za-z]+$')) {
    try {
      const allFish = new AllFish();
      const potentialFishArr = allFish.findFish(
        searchTerm.replace(/[_-]/g, ' ')
      );
      res.status(200);
      res.json(allFish.createApiResp(potentialFishArr));
    } catch (error) {
      res.status(500);
      res.send('Internal server error occured.');
    }
  } else {
    res.status(400);
    res.send('possibly inncorrect URL argument given.');
  }
});

const portVar: string | number = process.env.PORT || 5000;
app.listen(portVar, () =>
  console.log(`\n\nServer running on port: ${portVar}\n\n`)
);
