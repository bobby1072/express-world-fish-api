import httpClient from "./httpClient";
import Fish from "./FishClass";
interface Ifish{
    scientific_name: string;
    taxocode: string;  
    a3_code: string;
    isscaap: number;
    english_name: string;
}

class AllFish{
    public fishJsonData?: Ifish[] | undefined;
    async getAllFish(){
        const req = await httpClient.get(`http://openfisheries.org/api/landings/species.json`);
        const res = await req.data;
        this.fishJsonData = res;
    }
    async findFish(searchterm: string): Promise<Fish[] | []> {
        const fishList: Fish[] = [];
        if (this.fishJsonData){
            this.fishJsonData.forEach((element) =>{
                if (element.english_name.toLowerCase().includes(searchterm.toLowerCase()) ||
                element.scientific_name.toLowerCase().includes(searchterm.toLowerCase())){
                    const fishNameFixed = element.english_name.replace("/(|)|=/g", "");
                    if (fishNameFixed){
                        const foundFish = new Fish(element.english_name, element.a3_code, element.scientific_name);
                        fishList.push(foundFish);
                    }
                };
            });
        }
        return fishList;

    }
};
export default  AllFish;