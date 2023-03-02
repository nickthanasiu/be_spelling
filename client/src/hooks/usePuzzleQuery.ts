import { useState, useEffect } from "react";
import { PuzzlesApiResponse } from "../state/puzzle";
import ApiClient from "../api/client";

type SortOption = "newest" | "oldest" | "hardest" | "easiest";

export interface QueryParams {
    sort?: SortOption;
    cursor?: string;
};

export default function usePuzzleQuery(filterParams: QueryParams) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<PuzzlesApiResponse>();

    const BASE_URL = '/puzzles';

    const buildQueryString = (additionalParams?: QueryParams): string =>
        Object
            .entries({ ...filterParams, ...additionalParams })
            .reduce((queryString, entry: [string, string]) => {
                const queryParam = entry[0] + "=" + entry[1];
                const operator = queryString === BASE_URL ? '?' : '&';
                return queryString + operator + queryParam;
            }, BASE_URL);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const queryString = buildQueryString(filterParams);
                const puzzles = await ApiClient.get<PuzzlesApiResponse>(queryString);

                setData(puzzles);
                setIsLoading(false);
            } catch (err) {
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, [filterParams]);

    const loadMore = async () => {

        if (!data?.nextCursor) return;
        
        const nextCursor = data.nextCursor;
        const queryString = buildQueryString({ cursor: nextCursor });
        const response = await ApiClient.get<PuzzlesApiResponse>(queryString);

        setData({
            puzzles: [...data.puzzles, ...response.puzzles],
            nextCursor: response.nextCursor
        });
    };


    return { isLoading, isError, data, loadMore };
}
