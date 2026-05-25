import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  { name: "Jan", users: 120, donations: 2400 },
  { name: "Feb", users: 180, donations: 3200 },
  { name: "Mar", users: 250, donations: 4100 },
  { name: "Apr", users: 310, donations: 5200 },
  { name: "May", users: 460, donations: 6800 },
  { name: "Jun", users: 580, donations: 7600 },
];
export default function AdminCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass rounded-3xl p-5">
        <h3 className="mb-4 font-semibold">Alumni Growth</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="u" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#6366f1"
              fill="url(#u)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="glass rounded-3xl p-5">
        <h3 className="mb-4 font-semibold">Donations</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="donations" fill="#14b8a6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
