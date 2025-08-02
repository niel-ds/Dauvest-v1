import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ChartData {
  month: string;
  receitas: number;
  despesas: number;
}

interface FinancialChartProps {
  data: ChartData[];
}

export function FinancialChart({ data }: FinancialChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(value) => `R$ ${value}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
          />
          <Legend 
            wrapperStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line 
            type="monotone" 
            dataKey="receitas" 
            stroke="hsl(var(--success))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
            name="Receitas"
          />
          <Line 
            type="monotone" 
            dataKey="despesas" 
            stroke="hsl(var(--destructive))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2 }}
            name="Despesas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}