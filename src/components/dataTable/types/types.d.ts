export type Payment = {
  userId: string;
  createdAt: string;
  paid: boolean;
  updatedAt: string;
  totalAmount: number;
  paymentMethods: string;
  transactionId: string;
};
interface IDataTableProps {
  data: Payment[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  currentPageURL: number;
  width?: string;
  mode?: "large" | "small";
}
