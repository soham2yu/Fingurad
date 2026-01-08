import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { useRiskDistribution, useAnomalyReasons } from "@/hooks/use-charts";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export default function Analytics() {
  const { data: riskData, isLoading: loadingRisk } = useRiskDistribution();
  const { data: reasonData, isLoading: loadingReason } = useAnomalyReasons();

  const COLORS = ['#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <DashboardLayout 
      title="Analytics Engine" 
      description="Deep dive into anomaly patterns and risk factors."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="h-[500px]">
          <GlassCardHeader>
            <GlassCardTitle>Risk Score Distribution</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="h-[420px] flex items-center justify-center">
            {loadingRisk ? (
              <Skeleton className="h-[300px] w-[300px] rounded-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="range"
                  >
                    {riskData?.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }} 
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </GlassCardContent>
        </GlassCard>

        <GlassCard className="h-[500px]">
          <GlassCardHeader>
            <GlassCardTitle>Anomaly Reasons Breakdown</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="h-[420px]">
            {loadingReason ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reasonData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="reason" 
                    type="category" 
                    width={150} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }} 
                  />
                  <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </GlassCardContent>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
