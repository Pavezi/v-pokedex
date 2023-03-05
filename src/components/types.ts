export type Pokemon = {
    name: string;
    image: string;
    types: Type[];
    height: number;
    weight: number;
    sex: string;
};

export type Type = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";
