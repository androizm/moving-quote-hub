import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tables } from "@/integrations/supabase/types";

interface QuoteRequestsTableProps {
  quoteRequests: Tables<"quote_requests">[];
}

export const QuoteRequestsTable = ({ quoteRequests }: QuoteRequestsTableProps) => {
  if (quoteRequests.length === 0) {
    return <p className="text-gray-600">No quote requests matching your service areas.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Move Date</TableHead>
          <TableHead>Rooms</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quoteRequests.map((quote) => (
          <TableRow key={quote.id}>
            <TableCell>{format(new Date(quote.created_at), 'MMM d, yyyy')}</TableCell>
            <TableCell>
              <div>{quote.name}</div>
              <div className="text-sm text-gray-500">{quote.email}</div>
              <div className="text-sm text-gray-500">{quote.phone}</div>
            </TableCell>
            <TableCell>{quote.from_address}</TableCell>
            <TableCell>{quote.to_address}</TableCell>
            <TableCell>{format(new Date(quote.move_date), 'MMM d, yyyy')}</TableCell>
            <TableCell>{quote.room_count}</TableCell>
            <TableCell>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {quote.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};