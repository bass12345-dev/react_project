

export const UserWelcome = ({name}:{name:any}) => {
    return(
        <div className="flex gap-x-3 justify-center align-center sm:flex-row flex-wrap mt-5">
        <div className="block w-full  px-4 py-2 text-right">
          <p className="font-normal text-1xl text-white dark:text-gray-300">Welcome! {name} </p>
        </div>
      </div>
    );
}
