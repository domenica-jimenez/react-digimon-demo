// getDigimonList, get a list of digimons.
export const getDigimonList = async (pageSize, page) => {
    const res = await fetch(`https://laravel-digimon-demo-production.up.railway.app/api/digimons?pageSize=${pageSize}&page=${page}`);
    return await res.json();
}

// getDigimon, get information of one digimon.
export const getDigimon = async (id) => {
    const res = await fetch(`https://laravel-digimon-demo-production.up.railway.app/api/digimon/${id}`);
    return await res.json();
}