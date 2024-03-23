type setEUI = {
    setEUI: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function EUIInput({ setEUI }: setEUI) {

    const onDraw = (event: any) => {
        const euiValue: string = event.target.eui_value.value;
        setEUI(euiValue);
        event.preventDefault();
    }

    return (
        <form className="flex flex-col flex-wrap content-center justify-center m-1 font-medium" onSubmit={onDraw}>
            < input required type="text" placeholder="EUI" name="eui_value" className="w-32 mb-1 p-1 shadow rounded-md border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" >
            </input >
            <button className="bg-sky-500 hover:bg-sky-700 rounded-lg p-2 text-white font-bold self-center focus:outline-none focus:shadow-outline">
                Draw
            </button>
        </form >
    );
}