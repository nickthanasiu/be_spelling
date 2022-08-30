import { ChangeEvent } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { addPuzzleFormAtom, AddPuzzleFormState } from "../../recoil/atoms/admin";
import ApiClient from "../../api/client";
import type { AddPuzzleRequest } from "../../../../shared/types";


const AddPuzzleForm = () => {
    const [formState, setFormState] = useRecoilState(addPuzzleFormAtom);
    const resetFormState = useResetRecoilState(addPuzzleFormAtom);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const formatPuzzleRequestObject = (formState: AddPuzzleFormState) => {
        const { date, centerLetter, letters, pangrams, words } = formState;

        const requestObject: AddPuzzleRequest = {
            date,
            centerLetter,
            letters: letters.split(""),
            pangrams: pangrams.split(/\r?\n/),
            words: words.split(/\r?\n/),
        };

        return requestObject;
    };

    const submit = async () => {
        const requestObject = formatPuzzleRequestObject(formState);

        await ApiClient.post('/puzzles', requestObject);

        resetFormState();
    };

    return (
        <form>
            <Input 
                type="date"
                name="date"
                value={formState.date} 
                onChange={handleChange} 
            />
            <Input 
                type="text"
                name="centerLetter"
                placeholder="Center letter"
                maxLength={1}
                value={formState.centerLetter}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="letters"
                placeholder="Letters"
                maxLength={6} 
                value={formState.letters}
                onChange={handleChange} 
            />
            <TextArea
                name="pangrams"
                placeholder="Pangrams"
                value={formState.pangrams}
                onChange={handleChange}
            />
            <TextArea 
                name="words"
                value={formState.words}
                placeholder="Words"
                onChange={handleChange} 
            />

            <SubmitButton type="button" onClick={submit}>Add Puzzle</SubmitButton>    
        </form>
    );
};

export default AddPuzzleForm;

const Input = styled.input`
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
`;

const TextArea = styled.textarea`
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    margin-right: 0;
`;

const SubmitButton = styled.button`
    margin-top: 5px;
    background-color: lightgray;
    padding: 15px;
    border: none;
`; 