import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:3000';

export default {
    getAllWatches(page, search, limit){ // Hozzáadtuk a limit paramétert
        return Axios.get(`/watches?_page=${page}&_limit=${limit}&Model_like=${search}`) // Módosítottuk a limit használatát
    }
}