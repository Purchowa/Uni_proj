import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { LineChart, LineChartData } from '../components/LineChart';
import { EUIInput } from '../components/EUI_Input';
import { useEffect, useState } from 'react';
import { AirParameterID, SensecapPair, getAirParameter } from '../api/sensecapApi';


Chart.register(CategoryScale);

function App() {
  const [deviceEUI, setDeviceEUI] = useState<string>();
  const [chartData, setChartData] = useState<LineChartData[]>([]);

  useEffect(() => {
    if (deviceEUI) {
      let airTemperature: SensecapPair[];

      getAirParameter(AirParameterID.Temperature, deviceEUI)
        .then((response) => {
          airTemperature = response.data;
          console.log(airTemperature);

          getAirParameter(AirParameterID.Humidity, deviceEUI)
            .then((response) => {
              const airHumidity: SensecapPair[] = response.data;
              console.log(airHumidity);

              setChartData(airTemperature.map((temperature, i): LineChartData => {
                return { label: temperature.label, airTemperature: temperature.value, airHumidity: airHumidity[i].value }
              }));

            })
            .catch((error) => {
              console.error(`Parameter of ID: ${AirParameterID.Humidity} can't be read\n${error}`);
              setChartData(airTemperature.map((temperature) => { return { label: temperature.label, airTemperature: temperature.value, airHumidity: undefined } }));
            })
        })
        .catch((error) => { console.error(`Parameter of ID: ${AirParameterID.Temperature} can't be read\n${error}`); })
    }
  }, [deviceEUI]);


  return (
    <div>
      <LineChart data={chartData} />
      <EUIInput setEUI={setDeviceEUI} />
    </div>
  );
}

export default App;
