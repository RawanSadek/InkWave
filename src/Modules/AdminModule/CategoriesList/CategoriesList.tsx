import { BiCategory } from "react-icons/bi";

export default function CategoriesList() {
    return (
        <>
            <h2 className="capitalize text-3xl main-gold-text font-semibold">dashboard</h2>
            <p className="secondary-text my-3 ">Welcome to InkWave Admin Portal</p>

            <div className="my-10 flex justify-between items-center gap-5 xs:*:w-full md:*:w-1/2 lg:*:w-1/4 *:p-5 *:ring-[0.2px] *:ring-[#bf8b14] *:rounded-lg *:shadow-sm">
                <div>
                    <div className="bg-[#2a7cfa] opacity-50">
                        <BiCategory color="#2a7cfa" />
                    </div>
                    
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>

        </>
    )
}
