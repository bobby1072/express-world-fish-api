import httpClient from "./httpClient";
class Fish {
    public speciesName: string;
    public code: string;
    public latin: string;
    private physicalDescription?: string;
    private speciesPhoto?: string;
    private speciesNumbers?: object[];
    constructor(fishName: string, fishCode: string, fishLatin: string){
        this.speciesName = fishName;
        this.code = fishCode;
        this.latin = fishLatin;
    };
    async getSpeciesInfo(): Promise<void>{
        const req = await httpClient.get(`https://www.fishwatch.gov/api/species/${this.speciesName}`);
        const fishInfo = await req.data;
        if (fishInfo.length >= 1){
            this.physicalDescription = fishInfo[0]["Physical Description"],
            this.speciesPhoto = fishInfo[0]["Species Illustration Photo"].src
        };
    };
    async getSpeciesNumbers(): Promise<void>{
        try{
            const req = await httpClient.get(`http://openfisheries.org/api/landings/species/${this.code}.json`);
            const fishInfo = await req.data;
            if (fishInfo.length >= 1){
                this.speciesNumbers = fishInfo;
            };
        }
        catch(err){
        };
    };
    createFishJson(): object{
        return {
            Name: this.speciesName,
            Code: this.code,
            ScientificName: this.latin,
            SpecieNumbers: this.speciesNumbers,
            SpeciesInfo: {
                PhysicalDescription: this.physicalDescription,
                SpeciesPhoto: this.speciesPhoto
            }
        };
    };
};
export default Fish;