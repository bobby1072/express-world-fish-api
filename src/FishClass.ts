import httpClient from './httpClient';
class Fish {
    speciesName: string;
    code: string;
    latin: string;
    speciesJson?: object;
    constructor(fishName: string, fishCode: string, fishLatin: string){
        this.speciesName = fishName;
        this.code = fishCode;
        this.latin = fishLatin;
    };
    async getSpeciesInfo(){
        const infoRequest = async () => {
            const req = await httpClient.get(`https://www.fishwatch.gov/api/species/${this.speciesName}`);
            return await req.data;
        };
        const fishInfo = await infoRequest();
        return fishInfo;
    };
};
export default Fish;