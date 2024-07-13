// Graphic.test.tsx

import { render } from '@testing-library/react';
import React from 'react';

import Graphic from '@/components/layout/Graphic';

describe('Graphic component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Graphic />);
    expect(container).toBeInTheDocument();
  });

  test('contains Canvas element', () => {
    const { container } = render(<Graphic />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
