export default interface Pokemon {
    name: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    sex: string;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
}