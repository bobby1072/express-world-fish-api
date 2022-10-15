import Fish from './FishClass';
import allFish from './allFish.json';
interface Ifish {
  scientific_name: string;
  taxocode: string;
  a3_code: string;
  isscaap: number;
  english_name: string;
}

class AllFish {
  private fishJsonData: Ifish[];
  constructor() {
    this.fishJsonData = allFish;
  }
  public findFish(searchterm: string): Fish[] | [] {
    const fishList: Fish[] = [];
    this.fishJsonData &&
      this.fishJsonData.forEach((element) => {
        if (
          element.english_name
            .toLowerCase()
            .includes(searchterm.toLowerCase()) ||
          element.scientific_name
            .toLowerCase()
            .includes(searchterm.toLowerCase())
        ) {
          const fishNameAka = /\(([^)]+)\)/.exec(element.english_name);
          let aka = fishNameAka && fishNameAka[1].replace(/[=]/g, ' ');
          if (aka && aka.charAt(0) === ' ') {
            aka = aka.substring(1);
          }
          const fishNameFixed = fishNameAka
            ? element.english_name.replace(fishNameAka[0], ' ')
            : element.english_name;
          const foundFish =
            fishNameFixed &&
            (aka
              ? new Fish(
                  fishNameFixed,
                  element.a3_code,
                  element.scientific_name,
                  aka
                )
              : new Fish(
                  fishNameFixed,
                  element.a3_code,
                  element.scientific_name
                ));
          foundFish && fishList.push(foundFish);
        }
      });
    return fishList;
  }
  public createApiResp(fishObjs: Fish[]): object[] {
    const compare = (a: Fish, b: Fish): number => {
      if (a.speciesName.toLowerCase() < b.speciesName.toLowerCase()) {
        return -1;
      } else if (a.speciesName.toLowerCase() > b.speciesName.toLowerCase()) {
        return 1;
      }
      return 0;
    };
    const fishJsonList = fishObjs.sort(compare).map((element) => {
      return element.createFishJson();
    });
    return fishJsonList;
  }
}
export default AllFish;
