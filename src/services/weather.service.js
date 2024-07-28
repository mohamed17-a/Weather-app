import axios from "axios"

export async function getWeather(cityName){
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8e13a8adbd3a764175d5444f4162531e&units=metric`);
    }
    catch(err) {throw err}
}