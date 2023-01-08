export type Quote = {
  id: number;
  quote: string;
  author: string;
  created_at: string;
  updated_at: string;
};

export type RandomQuoteResponse = Quote[];
