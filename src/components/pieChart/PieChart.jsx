import {
    Legend,
    Pie,
    PieChart as RechartsPieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";


// const chartColour = [COLOURS.PIECHART.SUCCESS, COLOURS.PIECHART.FAILED];

export default function PieChart({ success, failed }) {
    const total = success + failed;
    const data = [
        { name: 'Success', value: Number(success) || 0, fill: "var(--color-success)" },
        { name: 'Failed', value: Number(failed) || 0, fill: "var(--color-error)" }
    ];

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <RechartsPieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                        {/* {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColour[index]}/>
                    ))} */}
                        {/* <Label
                    position="center"
                    content={() => {
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                            <tspan x="50%" dy="-2" fontSize="18" fontWeight="700">
                    {total}
                  </tspan>
                  <tspan x="50%" dy="18" fontSize="12">
                    Total
                  </tspan>

                        </text>
                    }}

                    /> */}
                    </Pie>
                    <Tooltip />
                    <Legend />

                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    )
}