'use client';

import axios from 'axios';
import { Terminal } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

import Quote from '@/components/content/Quote';
import Spinner from '@/components/Spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/toast/use-toast';
import clsxm from '@/lib/clsxm';
import type { RandomQuoteResponse } from '@/types/quote';

const QUOTES_API_URL = '/quotes-api';

const QuotesPage = () => {
  const [quote, setQuote] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchRandomQuote = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: result } = await axios.get<RandomQuoteResponse>(
        `${QUOTES_API_URL}/random`,
      );
      setQuote(result[0].quote);
      setAuthor(result[0].author);
    } catch {
      toast({
        title: 'Failed to fetch quotes',
        description: 'Try to skibidi around',
        className: 'dark:bg-dark bg-light',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  return (
    <section className='flex flex-col items-center justify-center'>
      {quote && !isLoading && <Quote quote={quote} author={author} />}
      {!quote && !isLoading && (
        <Alert className='max-w-80'>
          <Terminal className='h-4 w-4 text-primary-300' />
          <AlertTitle>Whoops!</AlertTitle>
          <AlertDescription>
            You{"'"}re getting an error. Maybe check your internet connection?
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner className='h-12 w-12' />}
      <button
        className={clsxm(
          'btn-accent btn-circle btn mt-4',
          isLoading && 'hidden',
        )}
        onClick={(e) => {
          e.preventDefault();
          if (isLoading) return;
          setQuote(undefined);
          fetchRandomQuote();
        }}
      >
        <MdOutlineRefresh size={28} />
      </button>
    </section>
  );
};

export default QuotesPage;
