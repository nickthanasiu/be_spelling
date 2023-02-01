import { useState } from "react";
import LoadingAnimation from "./loading/LoadingAnimation";
import { Button } from "./Button";

interface Props {
    onClick: any;
    children: any;
}

const LoadMoreButton = ({ onClick, children }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <LoadingAnimation/>;
    }

    const handleClick = async () => {
        setIsLoading(true);

        try {
            await onClick();
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.error(err);
        }
    };

    return (
        <div style={{ marginTop: '40px' }}>
            <Button onClick={handleClick}>
                {children}
            </Button>
        </div>
    );
};

export default LoadMoreButton;