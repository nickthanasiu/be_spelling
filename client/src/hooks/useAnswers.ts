import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { answersById } from "../state/answers";

type SortType = "alphabetic" | "reverse";

export function useAnswers(sortType?: SortType) {
    const { id } = useParams();
    const answers = useRecoilValue(answersById(id as string));

    if (sortType === 'alphabetic') {
        return [...answers].sort((a, b) => a.localeCompare(b));
    }

    if (sortType === 'reverse') {
        return [...answers].reverse();
    }

    return answers;
}