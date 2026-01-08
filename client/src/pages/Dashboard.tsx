import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { UploadPanel } from "@/components/dashboard/upload-panel";
import { FlaggedTransactionsTable } from "@/components/dashboard/transactions-table";
import { useTransactionsByHour, useAnomaliesByHour } from "@/hooks/use-charts";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/glass-card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

function ChartsSection() {
  const { data: txnData, isLoading: isLoadingTxn } = useTransactionsByHour();
  const { data: anomalyData, isLoading: isLoadingAnomaly } = useAnomaliesByHour();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-xl">
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-sm text-primary">
            Count: <span className="font-mono font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <GlassCard className="h-[400px]">
        <GlassCardHeader>
          <GlassCardTitle>Transaction Volume (24h)</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent className="h-[320px]">
          {isLoadingTxn ? (
            <Skeleton className="h-full w-full rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={txnData}>
                <defs>
                  <linearGradient id="colorTxn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorTxn)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </GlassCardContent>
      </GlassCard>

      <GlassCard className="h-[400px]">
        <GlassCardHeader>
          <GlassCardTitle>Anomalies Detected (24h)</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent className="h-[320px]">
          {isLoadingAnomaly ? (
            <Skeleton className="h-full w-full rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--destructive))" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout 
      title="Financial Overview" 
      description="Real-time transaction monitoring and anomaly detection."
    >
      <div className="space-y-6">
        <MetricsGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartsSection />
          </div>
          <div className="lg:col-span-1 mt-6">
            <UploadPanel />
          </div>
        </div>

        <div className="mt-6">
          <FlaggedTransactionsTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
