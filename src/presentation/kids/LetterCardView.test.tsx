import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LetterCardView } from './LetterCardView';
import type { Letter } from '../../domain/models/Letter';

const letter: Letter = {
  id: 'b', upperCase: 'B', lowerCase: 'b', name: 'bê', displayOrder: 4,
  examples: [
    { id: 'e2', text: 'con bướm', kind: 'animal', isPrimary: false, displayOrder: 2, highlightStart: 4, emoji: '🦋', imagePath: null },
    { id: 'e1', text: 'bóng', kind: 'object', isPrimary: true, displayOrder: 1, highlightStart: 0, emoji: '⚽', imagePath: '/images/letters/bong.svg' },
  ],
};

const labels = { prev: 'Trước', next: 'Sau', back: 'Về' };

function setup(overrides = {}) {
  const props = { letter, hasPrev: true, hasNext: true, onPrev: vi.fn(), onNext: vi.fn(), onClose: vi.fn(), labels, ...overrides };
  render(<LetterCardView {...props} />);
  return props;
}

describe('LetterCardView', () => {
  it('shows the big letter, ordered examples and highlights the initial', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'B b' })).toBeInTheDocument();
    const words = screen.getAllByText((_, el) => el?.classList.contains('kid-word') ?? false);
    expect(words.map((w) => w.textContent)).toEqual(['bóng', 'con bướm']);
    const marks = document.querySelectorAll('mark');
    expect(Array.from(marks).map((m) => m.textContent)).toEqual(['b', 'b']);
    expect(screen.getByAltText('bóng')).toHaveAttribute('src', '/images/letters/bong.svg');
  });

  it('falls back to the emoji when there is no image or it fails', () => {
    setup();
    expect(screen.getByRole('img', { name: 'con bướm' })).toHaveTextContent('🦋');
    fireEvent.error(screen.getByAltText('bóng'));
    expect(screen.getByRole('img', { name: 'bóng' })).toHaveTextContent('⚽');
  });

  it('navigates with arrows and disables them at the ends', () => {
    const p = setup({ hasPrev: false });
    expect(screen.getByRole('button', { name: 'Trước' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Sau' }));
    expect(p.onNext).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Về' }));
    expect(p.onClose).toHaveBeenCalledOnce();
  });

  it('swipes left to go next and right to go prev', () => {
    const p = setup();
    const card = screen.getByTestId('letter-card');
    fireEvent.touchStart(card, { touches: [{ clientX: 200, clientY: 100 }] });
    fireEvent.touchEnd(card, { changedTouches: [{ clientX: 100, clientY: 105 }] });
    expect(p.onNext).toHaveBeenCalledOnce();
    fireEvent.touchStart(card, { touches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchEnd(card, { changedTouches: [{ clientX: 220, clientY: 100 }] });
    expect(p.onPrev).toHaveBeenCalledOnce();
  });
});
