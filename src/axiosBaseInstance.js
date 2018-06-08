import axios from 'axios';

export default axios.create({
    baseURL: `https://limitless-everglades-74089.herokuapp.com/api/`
});