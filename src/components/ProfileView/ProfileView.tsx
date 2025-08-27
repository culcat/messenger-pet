interface ProfileProps{
    Profile:string
}

export const ProfileView = ( Profile:ProfileProps) => {
    return <>{Profile.Profile}</>;
}
