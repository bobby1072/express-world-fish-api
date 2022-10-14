import httpClient from "./httpClient";
import Fish from "./FishClass";
interface Ifish{
    scientific_name: string;
    taxocode: string;  
    a3_code: string;
    isscaap: number;
    english_name: string;
};

class AllFish{
    private fishJsonData: Ifish[] | undefined;
    public async getAllFish(){
        const req = await httpClient.get(`http://openfisheries.org/api/landings/species.json`);
        const res = await req.data;
        this.fishJsonData = res;
    };
    public findFish(searchterm: string): Fish[] | [] {
        const fishList: Fish[] = [];
        if (this.fishJsonData){
            this.fishJsonData.forEach((element) =>{
                if (element.english_name.toLowerCase().includes(searchterm.toLowerCase()) ||
                element.scientific_name.toLowerCase().includes(searchterm.toLowerCase())){
                    const fishNameFixed = element.english_name.replace(/[()]/g, " ").replace(/[=]/g, "");
                    if (fishNameFixed){
                        const foundFish = new Fish(fishNameFixed, element.a3_code, element.scientific_name);
                        fishList.push(foundFish);
                    };
                };
            });
        };
        return fishList;
    };
    public createApiResp(fishObjs: Fish[]): object[] {
        let fishJsonList = [];
        const compare = (a: Fish, b: Fish):number =>{
            if(a.speciesName.toLowerCase() < b.speciesName.toLowerCase()){
                return -1;
            }
            else if (a.speciesName.toLowerCase() > b.speciesName.toLowerCase()){
                return 1;
            };
            return 0;
        };
        fishJsonList = fishObjs.sort(compare).map((element) =>{
            return element.createFishJson();
        });
        return fishJsonList;
    };
};
export default  AllFish;