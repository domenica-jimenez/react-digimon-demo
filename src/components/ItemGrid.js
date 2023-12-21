import { Link } from "react-router-dom";

export function ItemGrid({name, number, image}) {
    return (
        <Link to={`digimon/${number}`}>
            <div className="bg-white shadow-md rounded grid grid-cols-1 gap-4 place-items-center">
                <div className="pt-3">
                    <img
                        src={image}
                        alt={name}
                        className="w-20 h-20"
                    />
                </div>
                <div className="w-full rounded bg-cyan-950">
                    <span className="block text-center text-slate-100 text-xs font-fold mb-2 pt-2">
                        #{number}
                    </span>
                    <span className="block text-center text-slate-100 text-sm font-fold mb-2 pb-2 px-4">
                        {name}
                    </span>
                </div>
            </div>
        </Link>
    )
}