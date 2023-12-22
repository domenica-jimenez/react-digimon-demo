import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import { firebaseErrors } from "../utils/MessageErrors";
import { Alert } from "../components/Alert";
import { getDigimonList } from "../utils/DigiApi";
import { pageSize } from "../utils/Constants";
import { ItemGrid } from "../components/ItemGrid";
import logo from "../img/logo.png";


export function Home() {
    const { logout, user, loading } = useAuth();
    const [error, setError] = useState();
    const [digimonList, setDigiomList] = useState([]);
    const [actualPage, setActualPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);

    // handleLogout, call logout from Firebase.
    const handleLogout = async() => {
        setError('');
        try {
            await logout();
        } catch (error) {
            setError(firebaseErrors(error.code))
        }
    } 

    // handleDigimons, call api getDigimonList to get all digimons.
    const handleDigimons = async() => {
        setError('');
        try {
            const {content, pageable} = await getDigimonList(pageSize, actualPage);
            setDigiomList(content ?? []);
            setMaxPages(pageable.totalPages ?? 0);
        } catch (error) {
            setError(error.code);
        }
    } 

    // handleNext, change actualPage variable.
    const handleNext = () => {
        if (actualPage!==maxPages) setActualPage(actualPage+1);
    } 

    // handlePreview, change actualPage variable.
    const handlePreview = () => {
        if (actualPage!==0) setActualPage(actualPage-1);
    } 

    useEffect(() => {
        setError('');
        getDigimonList(pageSize, actualPage).then(({content, pageable}) => {
            setDigiomList(content ?? []);
            setMaxPages(pageable.totalPages ?? 0);
        }).catch(error => {
            setError(error.code);
        });
    }, []);

    useEffect(() => {
        handleDigimons();
    }, [actualPage]);

    if (loading) return <div>Loading...</div>
       

    return (
    <div className="w-full max-w-max 2xl:max-w-screen-2xl m-auto">
        <div className="bg-stone-100 shadow-md rounded flex justify-between px-8 pt-6 pb-5 mb-4">
            <img src={logo} alt={"logo"} className="w-20 h-20" />
            <div>
                <h1 className="text-xl text-center"> Welcome</h1>
                <h1 className="text-lg text-center">{user.email}</h1>
            </div>
            <div>
                <button className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black" onClick={handleLogout}>Logout</button>
            </div>
        </div>
        {error && <Alert message={error}/>}
        <div className="bg-stone-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl mb-8 text-center font-bold"> DigiiDex Demo </h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {digimonList.map((digimon, index) => (
                    <ItemGrid
                        key={index}
                        name={digimon.name}
                        number={digimon.id}
                        image={digimon.image}
                    />
                ))}
            </div>
        </div>
        <div className="flex space-x-4 justify-center">
                <button className="bg-slate-100 hover:bg-slate-300 rounded py-2 px-4 text-black" onClick={handlePreview}>&lt;</button>
                <button className="bg-slate-100 hover:bg-slate-300 rounded py-2 px-4 text-black" onClick={handleNext}>&gt;</button>
        </div>
    </div>
    );
}