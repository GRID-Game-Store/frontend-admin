import {
  Bar,
  BarChart,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "STRIPE", value: 17, fill: "#0088FE", className:"fill-secondary" },
  { name: "PAYPAL", value: 19 },
];

interface ShapePieChart {
  dataPipeChart: any
  amount: number
}


export const ShapePieChart : React.FC<ShapePieChart> = ({dataPipeChart, amount}) => {
  return (
    <ResponsiveContainer max-width="50%" height={350} className="w-auto">
      <PieChart data={dataPipeChart}>
        <Pie
          data={dataPipeChart}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          className="fill-primary"
          dataKey="value"

        >
          <Label value={amount} position="center" className="text-3xl font-bold color-black" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
