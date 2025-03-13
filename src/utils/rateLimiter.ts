
/**
 * Simple rate limiter utility to restrict API calls
 */

interface RateLimitInfo {
  minuteLimit: number;
  dayLimit: number;
  minuteCount: number;
  dayCount: number;
  minuteReset: number;
  dayReset: number;
}

// Initialize or get rate limit info from localStorage
export const getRateLimitInfo = (): RateLimitInfo => {
  const now = Date.now();
  const storedInfo = localStorage.getItem('rateLimitInfo');
  
  if (storedInfo) {
    const info: RateLimitInfo = JSON.parse(storedInfo);
    
    // Reset minute counter if minute has passed
    if (now > info.minuteReset) {
      info.minuteCount = 0;
      info.minuteReset = now + 60 * 1000; // 1 minute from now
    }
    
    // Reset day counter if day has passed
    if (now > info.dayReset) {
      info.dayCount = 0;
      info.dayReset = now + 24 * 60 * 60 * 1000; // 24 hours from now
    }
    
    return info;
  }
  
  // Initial rate limit info
  return {
    minuteLimit: 19,
    dayLimit: 199,
    minuteCount: 0,
    dayCount: 0,
    minuteReset: now + 60 * 1000, // 1 minute from now
    dayReset: now + 24 * 60 * 60 * 1000 // 24 hours from now
  };
};

// Increment the counter and check if rate limit is exceeded
export const checkRateLimit = (): { 
  allowed: boolean; 
  minuteRemaining: number;
  dayRemaining: number;
  minuteResetTime: number;
  dayResetTime: number;
  minuteLimitExceeded: boolean;
  dayLimitExceeded: boolean;
} => {
  const info = getRateLimitInfo();
  
  // Increment counters
  info.minuteCount++;
  info.dayCount++;
  
  // Save updated info
  localStorage.setItem('rateLimitInfo', JSON.stringify(info));
  
  // Check if either limit is exceeded
  const minuteLimitExceeded = info.minuteCount > info.minuteLimit;
  const dayLimitExceeded = info.dayCount > info.dayLimit;
  const allowed = !minuteLimitExceeded && !dayLimitExceeded;
  
  return {
    allowed,
    minuteRemaining: info.minuteLimit - info.minuteCount,
    dayRemaining: info.dayLimit - info.dayCount,
    minuteResetTime: info.minuteReset,
    dayResetTime: info.dayReset,
    minuteLimitExceeded,
    dayLimitExceeded
  };
};

// Format time to show when rate limit will reset
export const formatResetTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
