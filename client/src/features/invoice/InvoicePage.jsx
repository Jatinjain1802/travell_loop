import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, Download, PieChart as PieChartIcon, 
  DollarSign, ArrowUpRight, TrendingUp, ChevronLeft, 
  Plus, Calendar, MoreHorizontal, Printer
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';

const budgetData = [
  { name: 'Transport', value: 1200, color: '#3b82f6' },
  { name: 'Food', value: 800, color: '#10b981' },
  { name: 'Stay', value: 2500, color: '#f59e0b' },
  { name: 'Activities', value: 600, color: '#ef4444' },
];

const dailySpending = [
  { day: 'Day 1', amount: 450 },
  { day: 'Day 2', amount: 320 },
  { day: 'Day 3', amount: 580 },
  { day: 'Day 4', amount: 410 },
  { day: 'Day 5', amount: 650 },
  { day: 'Day 6', amount: 200 },
];

export default function InvoicePage() {
  const { id } = useParams();

  const total = budgetData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link to={`/trips/${id}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <ChevronLeft className="h-4 w-4" />
            Back to Itinerary
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Expense Insights & Invoice</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-muted transition-colors font-bold text-sm">
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all text-sm">
            <Download className="h-4 w-4" />
            Export PDF Report
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Key Stats & Chart */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-secondary rounded-[40px] p-8 text-white space-y-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Total Spent</p>
              <h2 className="text-5xl font-bold">${total.toLocaleString()}</h2>
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold pt-2">
                <ArrowUpRight className="h-4 w-4" />
                <span>12% under budget</span>
              </div>
            </div>
            
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Avg/Day</p>
                <p className="text-xl font-bold">$425</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Savings</p>
                <p className="text-xl font-bold">$840</p>
              </div>
            </div>
            
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -mr-24 -mt-24" />
          </div>

          <div className="bg-card border rounded-[40px] p-8 shadow-sm space-y-6">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Category Split
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {budgetData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs font-medium text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Bar Chart & Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border rounded-[40px] p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Daily Spend Analysis
              </h3>
              <select className="bg-muted text-xs font-bold px-3 py-1.5 rounded-lg border-none focus:ring-0">
                <option>Last 7 Days</option>
                <option>All Trip</option>
              </select>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySpending}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-xl">Recent Transactions</h3>
              <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                <Plus className="h-4 w-4" />
                Add Expense
              </button>
            </div>
            
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { desc: 'Flight to Paris', cat: 'Transport', date: 'June 10', amount: '$850.00' },
                    { desc: 'Hotel de la Paix', cat: 'Stay', date: 'June 15', amount: '$1,200.00' },
                    { desc: 'Gourmet Dinner', cat: 'Food', date: 'June 16', amount: '$145.00' },
                    { desc: 'Museum Tickets', cat: 'Activities', date: 'June 17', amount: '$85.00' },
                  ].map((item, idx) => (
                    <tr key={idx} className="group hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-foreground">{item.desc}</p>
                        <p className="text-[10px] text-muted-foreground">{item.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-tighter">
                          {item.cat}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-foreground">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
