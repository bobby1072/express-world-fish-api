"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FishClass_1 = __importDefault(require("./FishClass"));
var myFish = new FishClass_1.default("Atlantic Salmon", "SAL", "esox");
myFish.getSpeciesInfo();
/*
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

app.listen(5000, () => console.log("Server running"));

*/ 
//# sourceMappingURL=index.js.map