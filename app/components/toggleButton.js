

function Toggle({toggle,setToggle}) {
    return (
        <div
            className={`md:w-16 md:h-8 w-12 h-7 flex items-center ${toggle ?'bg-primary-light-blue' :'bg-primary-dark-blue2'}  rounded-full p-1 cursor-pointer  border-[1px] border-primary-dark-blue2`}
            onClick={() => {
                setToggle(!toggle);
            }}
        >

            <div
                className={
                    ` md:w-8 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out ${!toggle ? 'bg-primary-light-blue' : 'bg-primary-dark-blue2 transform translate-x-5'}`

                }
            ></div>
        </div>
    );
}

export default Toggle;