import Fish from "./FishClass";
import express, {Application, Request, Response} from "express";

const myFish = new Fish("Atlantic Salmon", "SAL", "esox");
myFish.getSpeciesInfo();

/*
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

app.listen(5000, () => console.log("Server running"));

*/