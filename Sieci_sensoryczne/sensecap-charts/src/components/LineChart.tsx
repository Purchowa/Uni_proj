import { Line } from 'react-chartjs-2';

export type LineChartData = {
    airTemperature?: number,
    airHumidity?: number,
    label: Date
}

export function LineChart({ data }: { data: LineChartData[] }) {
    return <Line data={{
        labels: data.map(entry => entry.label.toLocaleTimeString()),
        datasets: [
            { label: "Temperatura powietrza", data: data.map(entry => entry.airTemperature), backgroundColor: 'green', borderColor: 'black', borderWidth: 0.5, tension: 0.1 },
            { label: "Wilgotność powietrza", data: data.map(entry => entry.airHumidity), backgroundColor: 'blue', borderColor: 'black', borderWidth: 0.5 }
        ]
    }}
        options={{ plugins: { title: { display: true, text: "Wykres temperatury i wilgotności" } } }} />
}