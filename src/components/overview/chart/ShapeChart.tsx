import {
  Bar,
  BarChart,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

export const ShapePieChart = () => {
  return (
    <ResponsiveContainer max-width="50%" height={350} className="w-auto">
      <PieChart data={data}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          className="fill-primary"
          dataKey="value"
          label
        >
          <Label value="350" position="center" className="text-3xl font-bold color-black" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
