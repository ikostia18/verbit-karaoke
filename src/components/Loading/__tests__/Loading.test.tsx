import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '..';

describe('Loading', () => {
    it('renders with the correct label', () => {
        const testLabel = 'Loading data...';
        render(<Loading label={testLabel} />);

        const loadingElement = screen.getByText(testLabel);
        expect(loadingElement).toBeInTheDocument();
        expect(loadingElement).toHaveClass('loadingContainer');
  });
});
