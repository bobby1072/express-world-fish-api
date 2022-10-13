import Fish from "./FishClass";
import AllFish from "./AllFishDataClass";
import express, {Application, Request, Response} from "express";
async function main(){
    const myFish = new Fish("Salmon", "SAL", "esox");
    //await myFish.getSpeciesNumbers();
    //await myFish.getSpeciesInfo();
    const allFish = new AllFish();
    const myArr = allFish.findFish(myFish.speciesName);
    //console.log(myFish.createFishJson());
}
main();

/*
const app: Application = express();
app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

app.listen(5000, () => console.log("Server running"));
*/


