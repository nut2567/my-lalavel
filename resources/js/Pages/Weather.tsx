import dayjs from "dayjs";
import WeatherCard from "../components/WeatherCard";
import { Col, Row, Typography } from "antd";
import {
    ApartmentOutlined,
    BookOutlined,
    BuildOutlined,
    DatabaseOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import type { ISpec } from "@visactor/vchart";
import { VChart } from "@visactor/react-vchart";

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
    const spec2: ISpec = {
        type: 'pie',
        background: 'transparent',
        data: [
            {
                id: 'id0',
                values: [
                    { type: 'oxygen', value: '46.60' },
                    { type: 'silicon', value: '27.72' },
                    { type: 'aluminum', value: '8.13' },
                ]
            }
        ],
        outerRadius: 0.8,
        valueField: 'value',
        categoryField: 'type',
        pie: {
            style: {
                lineWidth: 0,
                strokeOpacity: 0.5
            },
            state: {
                cutomizedLegendHover: {
                    lineWidth: 20,
                    outerBorder: {
                        distance: 1,
                        stroke: '#fff',
                    }
                },

                hover: {
                    lineWidth: 20,
                    outerBorder: {
                        distance: 0.5,
                        stroke: '#fff'
                    }
                },
                selected: {
                    lineWidth: 20,
                    outerBorder: {
                        distance: 0.5,
                        stroke: '#fff'
                    }
                }
            }
        },
        title: {
            visible: false,
            text: 'Statistics of Surface Element Content'
        },
        legends: {
            visible: false,
        },
        label: {
            visible: true,
            rotate: false,
            layout: {
                strategy: 'priority',
                tangentConstraint: false
            },
            position: 'inside-center'
        },
        tooltip: {
            mark: {
                content: [
                    {
                        key: datum => datum['type'],
                        value: datum => datum['value'] + '%'
                    }
                ]
            }
        },
        indicator: {
            visible: false,
        }
    };

    const programStats = [
        {
            icon: <BookOutlined />,
            label: "หลักสูตรอุตสาหกรรมดิจิทัลและเทคโนโลยีสารสนเทศ",
            count: 112,
        },
        {
            icon: <DatabaseOutlined />,
            label: "หลักสูตรวิทยาการข้อมูลและปัญญาประดิษฐ์",
            count: 98,
        },
        {
            icon: <BuildOutlined />,
            label: "หลักสูตรวิศวกรรมซอฟต์แวร์",
            count: 76,
        },
        {
            icon: <ApartmentOutlined />,
            label: "หลักสูตรระบบเครือข่ายและความปลอดภัยไซเบอร์",
            count: 64,
        },
        {
            icon: <TeamOutlined />,
            label: "หลักสูตรธุรกิจดิจิทัล",
            count: 53,
        },
    ];
    const categoryBars = [
        { label: "หลักสูตรทั่วไป", value: 15, color: "#2f6fb4" },
        { label: "หลักสูตรวิชาชีพ", value: 85, color: "#ef7d7d" },
        { label: "หลักสูตรวิชาการ (ระยะสั้น)", value: 15, color: "#6abf69" },
    ];
    const levelBars = [
        { label: "ประกาศนียบัตร (ปวช.)", value: 15, color: "#2f6fb4" },
        { label: "ประกาศนียบัตร (ปวส.)", value: 85, color: "#ef7d7d" },
        { label: "ปริญญาตรี (ป.ตรี)", value: 8, color: "#6abf69" },
        { label: "ไม่ระบุ", value: 6, color: "#f0f25b" },
    ];
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
            <div style={{ marginTop: 24 }}>
                <Typography.Title level={3} style={{ marginBottom: 12 }}>
                    สรุปข้อมูลหลักสูตร
                </Typography.Title>
                <Row gutter={[16, 16]}>
                    {[
                        {
                            label: "รวมทั้งหมด",
                            value: 154,
                            color: "#fa8c16",
                            sub: "จำนวนหลักสูตรทั้งหมด",
                        },
                        {
                            label: "เปิดให้บริการอยู่",
                            value: 102,
                            color: "#52c41a",
                            sub: "จำนวนหลักสูตรที่เปิดให้บริการ",
                        },
                        {
                            label: "ปิดให้บริการแล้ว",
                            value: 52,
                            color: "#ff4d4f",
                            sub: "จำนวนหลักสูตรที่ปิดให้บริการ",
                        },
                    ].map((card) => (
                        <Col xs={24} sm={12} md={8} key={card.label}>
                            <div
                                style={{
                                    background: "#fff",
                                    border: "1px solid #f0f0f0",
                                    borderRadius: 12,
                                    padding: "12px 16px",
                                    textAlign: "center",
                                    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                                }}
                            >
                                <Typography.Text style={{ color: card.color }}>
                                    {card.label}
                                </Typography.Text>
                                <div
                                    style={{
                                        fontSize: 24,
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        color: "#1f1f1f",
                                        marginTop: 4,
                                    }}
                                >
                                    {card.value}
                                </div>
                                <Typography.Text type="secondary">
                                    {card.sub}
                                </Typography.Text>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <Row className="hero">
                <Col span={12} style={{}}>

                    <Typography.Title level={2} style={{ margin: 0 }}>
                        หลักสูตรยอดนิยม 5 อันดับ
                    </Typography.Title>
                    <Paragraph style={{ color: "red" }}>
                        ทั้งหมด 102 หลักสูตร
                    </Paragraph>
                    <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
                        {programStats.map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "10px 12px",
                                    border: "1px solid #f0f0f0",
                                    borderRadius: 10,
                                }}
                            >
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 8,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "#f5f7ff",
                                        color: "#2f54eb",
                                        fontSize: 18,
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Typography.Text>{item.label}</Typography.Text>
                                </div>
                                <Typography.Text strong style={{ color: "#cf1322" }}>
                                    {item.count} คน
                                </Typography.Text>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col span={12} style={{ textAlign: 'center' }}>
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        สัดส่วนแยกตามประเภทหลักสูตร
                    </Typography.Title><VChart spec={spec2} style={{ height: 500 }} /></Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                {[
                    {
                        title: "สัดส่วนแยกตามประเภทหลักสูตร",
                        data: categoryBars,
                    },
                    {
                        title: "สัดส่วนแยกตามระดับการศึกษาของหลักสูตร",
                        data: levelBars,
                    },
                ].map((panel) => (
                    <Col xs={24} md={12} key={panel.title}>
                        <div
                            style={{
                                background: "#fff",
                                border: "1px solid #f0f0f0",
                                borderRadius: 8,
                                overflow: "hidden",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                            }}
                        >
                            <div
                                style={{
                                    background: "#f5a623",
                                    color: "#fff",
                                    fontWeight: 700,
                                    padding: "8px 12px",
                                    textAlign: "center",
                                }}
                            >
                                {panel.title}
                            </div>
                            <div
                                style={{
                                    padding: 16,
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${panel.data.length}, minmax(0, 1fr))`,
                                    gap: 12,
                                    alignItems: "end",
                                    minHeight: 170,
                                }}
                            >
                                {panel.data.map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            display: "grid",
                                            gap: 8,
                                            alignContent: "end",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: "#595959",
                                            }}
                                        >
                                            {item.value}
                                        </div>
                                        <div
                                            style={{
                                                height: `${item.value * 1.6 + 20}px`,
                                                background: item.color,
                                                borderRadius: 4,
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: "#8c8c8c",
                                                minHeight: 32,
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Weather;
