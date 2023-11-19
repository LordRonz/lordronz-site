import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

import Quote from '@/components/content/Quote';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Spinner from '@/components/Spinner';
import clsxm from '@/lib/clsxm';
import type { RandomQuoteResponse } from '@/types/quote';

const QUOTES_API_URL = 'https://quotes-api-go-production.up.railway.app';

const QuotesPage: NextPage = () => {
  const [quote, setQuote] = useState<string>();
  const [author, setAuthor] = useState<string>();

  const fetchRandomQuote = async () => {
    const { data: result } = await axios.get<RandomQuoteResponse>(
      `${QUOTES_API_URL}/random`,
    );
    setQuote(result[0].quote);
    setAuthor(result[0].author);
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

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
