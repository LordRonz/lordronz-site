/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import CoolButton from '@/components/buttons/CoolButton';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('CoolButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
  it('renders a coolbutton', async () => {
    const { rerender } = render(
      <CoolButton data-testid='cool-button'>Test</CoolButton>,
    );

    const container = await screen.findByTestId('cool-button');
    expect(container).toBeInTheDocument();

    rerender(<CoolButton data-testid='cool-button'>Test</CoolButton>);

    const button = await screen.findByText('Test');
    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with classname', async () => {
    const { rerender } = render(
      <CoolButton data-testid='cool-button'>Test</CoolButton>,
    );

    rerender(<CoolButton data-testid='cool-button'>Test</CoolButton>);

    const button = await screen.findByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with rest', () => {
    const { rerender } = render(
      <CoolButton aria-label='balls' wrapperClassName='bg-dark'>
        Test
      </CoolButton>,
    );

    rerender(
      <CoolButton aria-label='balls' wrapperClassName='bg-dark'>
        Test
      </CoolButton>,
    );

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with wrapperclassname', () => {
    const { rerender } = render(
      <CoolButton wrapperClassName='bg-dark'>Test</CoolButton>,
    );

    rerender(<CoolButton wrapperClassName='bg-dark'>Test</CoolButton>);

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with moving polygon classname', () => {
    const { rerender } = render(
      <CoolButton movingPolygonClassName='bg-dark'>Test</CoolButton>,
    );

    rerender(<CoolButton movingPolygonClassName='bg-dark'>Test</CoolButton>);

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with all props', () => {
    const { rerender } = render(
      <CoolButton
        wrapperClassName='bg-dark'
        movingPolygonClassName='bg-dark'
        className='balls'
        aria-checked='true'
      >
        Test
      </CoolButton>,
    );

    rerender(
      <CoolButton
        wrapperClassName='bg-dark'
        movingPolygonClassName='bg-dark'
        className='balls'
        aria-checked='true'
      >
        Test
      </CoolButton>,
    );

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with all props overwrite', () => {
    const { rerender } = render(
      <CoolButton
        wrapperClassName='justify-end'
        polygonClassName='duration-100'
        movingPolygonClassName='bg-dark'
        className='duration-100'
        aria-checked='true'
      >
        Test
      </CoolButton>,
    );

    rerender(
      <CoolButton
        wrapperClassName='justify-end'
        polygonClassName='duration-100'
        movingPolygonClassName='bg-dark'
        className='duration-100'
        aria-checked='true'
      >
        Test
      </CoolButton>,
    );

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with different props', () => {
    const { rerender } = render(
      <CoolButton
        wrapperClassName='justify-end'
        polygonClassName='duration-100'
        movingPolygonClassName='bg-dark'
        className='duration-100'
        aria-checked='true'
      >
        Test
      </CoolButton>,
    );

    rerender(
      <CoolButton
        wrapperClassName='justify-end'
        polygonClassName='duration-100'
        movingPolygonClassName='bg-dark'
        className='duration-100'
        aria-checked='true'
      >
        Test
      </CoolButton>,
    );

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a default coolbutton if given invalid size', () => {
    const { rerender } = render(
      <CoolButton width={0} height={0}>
        Test
      </CoolButton>,
    );

    rerender(
      <CoolButton width={0} height={0}>
        Test
      </CoolButton>,
    );

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });
});
