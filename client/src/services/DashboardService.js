import axios from 'axios';
const DASHBOARD_BASE_URL="http://localhost:3001/dashboard/";

const DASHBOARD_HORSE_URL="https://api.zed.run/api/v1/horses/get/";

class DashboardService{

        getRaces(data){
            return axios.post(DASHBOARD_BASE_URL+'getRaces',data);
        }

        getHorseData(zedId){
            return axios.get(DASHBOARD_HORSE_URL+zedId);
        }
}

export default new DashboardService()