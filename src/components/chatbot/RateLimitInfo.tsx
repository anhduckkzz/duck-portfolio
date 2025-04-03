
import React from 'react';
import { formatResetTime } from '@/utils/rateLimiter';
import { useIsMobile } from '@/hooks/use-mobile';
import { RateLimitInfo } from '@/hooks/use-chat-state';

interface RateLimitInfoProps {
  isRateLimited: boolean;
  rateLimitInfo: RateLimitInfo;
}

export const RateLimitDisplay = ({ isRateLimited, rateLimitInfo }: RateLimitInfoProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isRateLimited && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-red-600 dark:text-red-300 text-sm">
          <p className="font-medium">Rate limit exceeded</p>
          {rateLimitInfo.minuteLimitExceeded && (
            <p className="text-xs">Reached rate limit per minute. Resets at {formatResetTime(rateLimitInfo.minuteResetTime)}</p>
          )}
          {rateLimitInfo.dayLimitExceeded && (
            <p className="text-xs">Reached rate limit per day. Resets at {formatResetTime(rateLimitInfo.dayResetTime)}</p>
          )}
          <p className="text-xs">Requests remaining today: {rateLimitInfo.dayRemaining}/199</p>
          <p className="text-xs">Requests remaining this minute: {rateLimitInfo.minuteRemaining}/19</p>
        </div>
      )}
      
      <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
        <p className={isMobile ? "text-[10px]" : "text-xs"}>
          Requests: {19 - rateLimitInfo.minuteRemaining}/19 per minute | {199 - rateLimitInfo.dayRemaining}/199 per day
        </p>
      </div>
    </>
  );
};
