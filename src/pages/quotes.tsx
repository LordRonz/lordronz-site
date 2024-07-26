import axios from 'axios';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

import Quote from '@/components/content/Quote';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Spinner from '@/components/Spinner';
import { useToast } from '@/components/ui/toast/use-toast';
import clsxm from '@/lib/clsxm';
import type { RandomQuoteResponse } from '@/types/quote';

const QUOTES_API_URL = '/quotes-api';

const QuotesPage: NextPage = () => {
  const [quote, setQuote] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchRandomQuote = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: result } = await axios.get<RandomQuoteResponse>(
        `${QUOTES_API_URL}/randomos`,
      );
      setQuote(result[0].quote);
      setAuthor(result[0].author);
    } catch {
      toast({
        title: 'Failed to fetch quotes',
        description: 'Try to skibidi around',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  return (
    <Layout>
      <Seo templateTitle='Quotes' />
      <main className='flex flex-col items-center justify-center'>
        {quote ? (
          <Quote quote={quote} author={author} />
        ) : (
          <Spinner className='h-12 w-12' />
        )}
        <button
          className={clsxm(
            'btn-accent btn-circle btn mt-4',
            quote == null && 'btn-disabled',
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
      </main>
    </Layout>
  );
};

export default QuotesPage;
