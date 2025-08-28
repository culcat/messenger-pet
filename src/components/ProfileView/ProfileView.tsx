import { FC } from "react";

interface ProfileProps{
    Profile:string
}

export const ProfileView: FC<ProfileProps> = ( Profile) => {
    return <>{Profile.Profile}</>;
}
