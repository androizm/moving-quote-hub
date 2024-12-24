import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/integrations/supabase/types";

type QuoteRequest = Database["public"]["Tables"]["quote_requests"]["Row"];

interface QuotesTableProps {
  quotes: QuoteRequest[];
  isLoading: boolean;
}

export const QuotesTable = ({ quotes, isLoading }: QuotesTableProps) => {
  if (isLoading) {
    return <p className="text-gray-600">Loading quotes...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Move Dates</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes?.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell>{quote.name}</TableCell>
              <TableCell>{quote.from_address}</TableCell>
              <TableCell>{quote.to_address}</TableCell>
              <TableCell>
                {new Date(quote.move_date_start).toLocaleDateString()} -{" "}
                {new Date(quote.move_date_end).toLocaleDateString()}
              </TableCell>
              <TableCell className="capitalize">{quote.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};