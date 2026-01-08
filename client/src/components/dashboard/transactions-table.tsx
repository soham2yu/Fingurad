import { useFlaggedTransactions } from "@/hooks/use-transactions";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";

export function FlaggedTransactionsTable() {
  const { data: transactions, isLoading } = useFlaggedTransactions();

  if (isLoading) {
    return <Skeleton className="w-full h-64 rounded-xl" />;
  }

  return (
    <GlassCard className="col-span-full">
      <GlassCardHeader>
        <GlassCardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          Recent High-Risk Transactions
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="rounded-md border border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase">Transaction ID</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Reasons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions && transactions.length > 0 ? (
                transactions.slice(0, 10).map((tx) => (
                  <TableRow key={tx.transaction_id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {tx.transaction_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="font-medium">{tx.account}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(tx.timestamp), "MMM d, HH:mm")}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      ${tx.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{tx.location}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${tx.risk_score > 0.8 ? 'border-red-500/50 text-red-400 bg-red-500/10' : 
                            tx.risk_score > 0.5 ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : 
                            'border-green-500/50 text-green-400 bg-green-500/10'}
                        `}
                      >
                        {(tx.risk_score * 100).toFixed(0)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {tx.reasons.map((reason, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No flagged transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}
