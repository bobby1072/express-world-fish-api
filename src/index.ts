import Fish from "./FishClass";
import express, {Application, Request, Response} from "express";
async function main(){
    const myFish = new Fish("Atlantic Salmon", "SAL", "esox");
    await myFish.getSpeciesNumbers();
    await myFish.getSpeciesInfo();
    console.log(myFish.createFishJson());
}
main();

/*
const app: Application = express();
app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

app.listen(5000, () => console.log("Server running"));
*/


