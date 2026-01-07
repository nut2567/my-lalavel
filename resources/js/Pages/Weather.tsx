import dayjs from "dayjs";
import WeatherCard from "../components/WeatherCard";
import type { ISpec } from "@visactor/vchart";
import { Typography } from "antd";

const { Paragraph } = Typography;

const Weather = () => {
    const weatherData = (() => {
        const days = dayjs().daysInMonth();
        return Array.from({ length: days }, (_, idx) => {
            const temperature =
                25 +
                Math.sin((idx / days) * Math.PI * 2) * 4 +
                Math.random() * 1.5;
            return {
                date: dayjs()
                    .date(idx + 1)
                    .format("YYYY-MM-DD"),
                temperature: Number(temperature.toFixed(1)),
            };
        });
    })();

    const chartSpec: ISpec = {
        type: "line",
        height: 320,
        data: {
            id: "temp",
            values: weatherData,
        },
        xField: "date",
        yField: "temperature",
        point: { visible: false },
        color: ["#1677ff"],
        axes: [
            { orient: "left", title: { text: "อุณหภูมิ (°C)" } },
            { orient: "bottom", type: "band", label: { autoHide: true } },
        ],
        tooltip: {
            mark: {
                title: <Typography.Text>สภาพอากาศเดือนนี้</Typography.Text>,
                content: [
                    { key: "วันที่", value: "$key" },
                    { key: "อุณหภูมิ", value: "$value°C" },
                ],
            },
        },
    };

    return (
        <>
            <div className="hero__header" style={{ marginBottom: 8 }}>
                <Typography.Title level={2} style={{ margin: 0 }}>
                    กราฟสภาพอากาศและอุณหภูมิ (เดือนนี้)
                </Typography.Title>
            </div>
            <Paragraph className="hero__meta">
                ข้อมูลสังเคราะห์เพื่อสาธิตการแสดงผลด้วย Ant Design + VChart
            </Paragraph>
            <WeatherCard chartSpec={chartSpec} data={weatherData} />
        </>
    );
};

export default Weather;
