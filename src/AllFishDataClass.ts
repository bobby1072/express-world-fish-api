import httpClient from "./httpClient";
import Fish from "./FishClass";
class AllFish{
    private fishJsonData: object[] | undefined;
    async getAllFish(){
        const req = await httpClient.get(`http://openfisheries.org/api/landings/species.json`);
        const res = await req.data;
        this.fishJsonData = res;
    };
    async findFish(searchterm: string){
        await this.getAllFish();
        let fishList: Fish[] | [] = [];
        this.fishJsonData?.forEach((element) => {
            console.log("boi");
            //if(searchterm === element.english_name) 
        })
        return fishList;

    }
};
export default  AllFish;