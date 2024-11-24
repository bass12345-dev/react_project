export   const LogoutButton = ({ onClick }:{onClick:any}) => {
    return(
        <button onClick={onClick}
        className="md:block hidden inline-flex items-center text-white   bg-red-800 hover:bg-red-500 px-9 py-1  rounded-full">Logout</button>
    );
}