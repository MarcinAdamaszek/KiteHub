import { Review } from "./review";

export interface SpotDetails {
    id: number;
    spotName: string;
    latitude: number;
    longitude: number;
    country: string;
    continent: string;
    description: string;
    creatorName: string,
    reviews: Review[],
    rating: number;
    dateCreated: string;
    isBeginner: boolean;
    isAdvanced: boolean;
    january: boolean;
    february: boolean;
    march: boolean;
    april: boolean;
    may: boolean;
    june: boolean;
    july: boolean;
    august: boolean;
    september: boolean;
    october: boolean;
    november: boolean;
    december: boolean;
}

