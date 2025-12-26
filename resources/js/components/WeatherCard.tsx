import type { FC } from "react";
import { Card, Divider, Typography } from "antd";
import { VChart } from "@visactor/react-vchart";
import type { ISpec } from "@visactor/vchart";

type WeatherCardProps = {
    chartSpec: ISpec;
    data: { date: string; temperature: number }[];
};

const WeatherCard: FC<WeatherCardProps> = ({ chartSpec, data }) => (
    <Card
        title="กราฟสภาพอากาศ/อุณหภูมิ (เดือนปัจจุบัน)"
        extra={
            <Typography.Text type="secondary">
                ข้อมูลจำลองสำหรับสาธิต UI
            </Typography.Text>
        }
        variant="outlined"
        style={{ marginBottom: 16 }}
    >
        <div style={{ height: 320 }}>
            <VChart spec={chartSpec} style={{ height: 320 }} />
        </div>
        <Divider />
        <Typography.Paragraph>
            อุณหภูมิเฉลี่ย:{" "}
            <Typography.Text strong>
                {(
                    data.reduce((sum, item) => sum + item.temperature, 0) /
                    Math.max(data.length, 1)
                ).toFixed(1)}{" "}
                °C
            </Typography.Text>
        </Typography.Paragraph>
    </Card>
);

export default WeatherCard;
