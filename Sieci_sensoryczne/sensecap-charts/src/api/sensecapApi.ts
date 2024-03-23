import axios from 'axios';
import { LineChartData } from '../components/LineChart';

export type SensecapPair = {
    value: number,
    label: Date
}

export enum AirParameterID {
    Temperature = 4097,
    Humidity = 4098
}

export function getAirParameter(type: AirParameterID, deviceEUI: string) {
    return axios.get("https://sensecap.seeed.cc/openapi/list_telemetry_data", {
        auth: { username: 'username', password: 'password' },
        params: { device_eui: deviceEUI, measurement_id: type },
        transformResponse: (data) => { return JSON.parse(data).data.list[1][0].map((value: any): SensecapPair => { return { label: new Date(value[1]), value: value[0] } }) }
    });
}