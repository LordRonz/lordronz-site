'use client';

import { Terminal } from 'lucide-react';
import queryString from 'query-string';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

import Quote from '@/components/content/Quote';
import Spinner from '@/components/Spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Toaster } from '@/components/ui/toast/toaster';
import { useToast } from '@/components/ui/toast/use-toast';
import clsxm from '@/lib/clsxm';
import type { RandomQuoteResponse } from '@/types/quote';

const QUOTES_API_URL = '/quotes-api';

const fetchQuote = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<RandomQuoteResponse>;
};

const QuotesPage = ({ tagParam }: { tagParam?: string }) => {
  const [quoteData, setQuoteData] = useState<{
    quote?: string;
    author?: string;
  }>({});
  const [isLoading, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchRandomQuote = useCallback(async () => {
    startTransition(async () => {
      try {
        const result = await fetchQuote(
          queryString.stringifyUrl({
            url: `${QUOTES_API_URL}/random`,
            query: {
              tag: tagParam,
            },
          }),
        );
        setQuoteData({ quote: result[0].quote, author: result[0].author });
      } catch {
        toast({
          title: 'Failed to fetch quotes',
          description: 'Try to skibidi around',
          className: 'dark:bg-dark bg-light',
          duration: 5000,
        });
      }
    });
  }, [tagParam, toast]);

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  const handleRefreshClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!isLoading) {
        setQuoteData({});
        fetchRandomQuote();
      }
    },
    [isLoading, fetchRandomQuote],
  );

  return (
    <section className='flex flex-col items-center justify-center'>
      <Toaster />
      {isLoading ? (
        <Spinner className='h-12 w-12' />
      ) : quoteData.quote ? (
        <Quote quote={quoteData.quote} author={quoteData.author} />
      ) : (
        <Alert className='max-w-80'>
          <Terminal className='h-4 w-4 text-primary-300' />
          <AlertTitle>Whoops!</AlertTitle>
          <AlertDescription>
            You{"'"}re getting an error. Maybe check your internet connection?
          </AlertDescription>
        </Alert>
      )}
      <button
        aria-label='Load another quote'
        className={clsxm(
          'mt-4 inline-flex size-12 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300 dark:bg-primary-300 dark:text-primary-950 dark:hover:bg-primary-200',
          isLoading && 'hidden',
        )}
        onClick={handleRefreshClick}
      >
        <MdOutlineRefresh size={28} />
      </button>
    </section>
  );
};

export default QuotesPage;
