import MessageBox from "./MessageBox";
import HiveInput from "./HiveInput";
import Hive from "./Hive";
import HiveActions from "./HiveActions";

function Controls() {
    return (
        <div>
            <MessageBox />
            <HiveInput />
            <Hive />
            <HiveActions />
        </div>
    );
}

export default Controls;