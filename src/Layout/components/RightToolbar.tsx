import {ModeToggle} from "@/Layout/components/modeToggle.tsx";
import ModeLogout from "@/Layout/components/ModeLogout.tsx";

const RightToolbar = () => {
    return (
        <div className={'flex gap-x-4'}>
            <ModeToggle/>
            <ModeLogout/>
        </div>
    );
};

export default RightToolbar;