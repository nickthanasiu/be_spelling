import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IPuzzleSelectMenuProps {
    options: { _id: string, date: Date }[]
}

const PuzzleSelectForm = ({ options }: IPuzzleSelectMenuProps) => {
    const [selectedPuzzleId, setSelectedPuzzleId] = useState('');

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPuzzleId(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        navigate(`/puzzles/${selectedPuzzleId}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select name="puzzles" id="puzzles" defaultValue="" onChange={handleChange}>
                <option value="" disabled>Select date</option>

                {options.map((option) => {
                    const date = new Date(option.date);
                    const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                    return (
                        <option value={option._id}>{formattedDate}</option>
                    )
                })}
            </select>

            <button type="submit" disabled={selectedPuzzleId === ''}>Submit</button>
        </form>
    );
};

export default PuzzleSelectForm;
