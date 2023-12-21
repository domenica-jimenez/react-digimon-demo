import { useEffect, useState } from "react";
import { getDigimon } from "../utils/DigiApi";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../components/Alert";

export function ItemCard() {

    const [digimon, setDigiom] = useState([]);
    const [error, setError] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDigimon = async() => {
        setError('');
        try {
            const data = await getDigimon(id);
            setDigiom(data ?? []);
        } catch (error) {
            setError(error.code);
        }
    } 

    const handleBackHome = () => {
        navigate("/");
    }

    useEffect(() => {
        handleDigimon();
    }, []);

    return (
        digimon.length !== 0 &&
        <div className="w-full max-w-md m-auto">
            {error && <Alert message={error}/>}
            <div className="bg-white shadow-md rounded grid grid-cols-1 gap-3 place-items-center">
                <span className="block text-center text-slate-400 text-xs font-bold mb-2 pt-4">
                    #{digimon.id}
                </span>
                <div className="pt-3">
                    <img
                        src={digimon.images[0].href}
                        alt={digimon.name}
                        className="w-21 h-21"
                    />
                </div>
                <div className="bg-zinc-400 w-full rounded">
                    <span className="block text-center text-slate-900 text-lg font-bold mb-2 py-4 px-2">
                        {digimon.name}
                    </span>
                    <div className="flex justify-between px-6 ">
                        <div>
                            <span className="block text-center text-slate-900 text-md font-bold mb-2 pb-2 px-4">
                                Level
                            </span>
                            <span className="block text-center text-slate-900 text-sm mb-2 pb-2 px-4">
                                {digimon.levels.length !== 0 ? digimon.levels[0].level : "N/A"} 
                            </span>
                        </div>
                        <div>
                            <span className="block text-center text-slate-900 text-md font-bold mb-2 pb-2 px-4">
                                Atribute
                            </span>
                            <span className="block text-center text-slate-900 text-sm mb-2 pb-2 px-4">
                                {digimon.attributes.length !== 0 ? digimon.attributes[0].attribute : "N/A"}
                            </span>
                        </div>
                        <div>
                            <span className="block text-center text-slate-900 text-md font-bold mb-2 pb-2 px-4">
                                Type
                            </span>
                            <span className="block text-center text-slate-900 text-sm mb-2 pb-2 px-4">
                                {digimon.types.length !== 0 ? digimon.types[0].type : "N/A"}
                            </span>
                        </div>
                    </div>
                        {digimon.fields.length !== 0 &&
                        <div className="py-4">
                            <span className="block text-center text-slate-900 text-md font-bold pb-3 px-4">
                                Fields
                            </span>
                            <img
                                src={digimon.fields[0].image}
                                alt={digimon.fields[0].field}
                                className="w-8 h-8 mx-auto"
                            />
                            <span className="block text-center text-slate-900 text-sm pt-1 px-4">
                                {digimon.fields[0].field}
                            </span>
                        </div>
                        }
                </div>
            </div>
            <div class="flex space-x-4 justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm rounded mt-4 py-2 px-4" onClick={handleBackHome}>Home</button>
            </div>
        </div>
    )
}