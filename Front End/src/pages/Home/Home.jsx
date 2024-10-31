import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { DollarSign, Users, Activity, Briefcase } from "lucide-react";

const data = [
  {
    month: "Jan",
    totalRevenue: 4000,
    adminRevenue: 1200,
    therapistRevenue: 2800,
  },
  {
    month: "Feb",
    totalRevenue: 5000,
    adminRevenue: 1500,
    therapistRevenue: 3500,
  },
  {
    month: "Mar",
    totalRevenue: 6000,
    adminRevenue: 1800,
    therapistRevenue: 4200,
  },
  {
    month: "Apr",
    totalRevenue: 7000,
    adminRevenue: 2100,
    therapistRevenue: 4900,
  },
  {
    month: "May",
    totalRevenue: 8000,
    adminRevenue: 2400,
    therapistRevenue: 5600,
  },
  {
    month: "Jun",
    totalRevenue: 9000,
    adminRevenue: 2700,
    therapistRevenue: 6300,
  },
];

const StatCard = ({ icon: Icon, title, value, percentage, isIncrease }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div
        className={`p-3 rounded-full ${
          isIncrease ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <Icon
          className={isIncrease ? "text-green-600" : "text-red-600"}
          size={24}
        />
      </div>
    </div>
    <p
      className={`mt-2 text-sm ${
        isIncrease ? "text-green-600" : "text-red-600"
      }`}
    >
      {isIncrease ? "↑" : "↓"} {percentage}% from last month
    </p>
  </div>
);

export default function DashboardStats() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value="$24,000"
          percentage={12}
          isIncrease={true}
        />
        <StatCard
          icon={Users}
          title="Total Users"
          value="1,234"
          percentage={8}
          isIncrease={true}
        />
        <StatCard
          icon={Activity}
          title="Active Therapists"
          value="89"
          percentage={5}
          isIncrease={true}
        />
        <StatCard
          icon={Briefcase}
          title="Completed Sessions"
          value="3,456"
          percentage={15}
          isIncrease={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#4F46E5"
                  name="Total Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="adminRevenue"
                  stroke="#10B981"
                  name="Admin Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="therapistRevenue"
                  stroke="#F59E0B"
                  name="Therapist Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Sessions</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalRevenue" fill="#4F46E5" name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
