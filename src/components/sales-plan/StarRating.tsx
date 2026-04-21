
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  maxRating?: number;
}

export function StarRating({ rating, size = 16, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}
