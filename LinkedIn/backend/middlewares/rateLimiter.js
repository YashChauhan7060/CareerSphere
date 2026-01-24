import { RateLimiterMemory } from 'rate-limiter-flexible';

// 1. Connection Requests: 10 per day
const connectionLimiter = new RateLimiterMemory({
  points: 10,           
  duration: 86400,      
});

// 2. Public Feed/Browsing: 100 per minute
const feedLimiter = new RateLimiterMemory({
  points: 100,          
  duration: 60,         
});

// 3. Authentication: 5 per 15 minutes
const authLimiter = new RateLimiterMemory({
  points: 5,            
  duration: 900,        
});

// 4. General API: 50 per minute (for other routes)
const generalLimiter = new RateLimiterMemory({
  points: 50,
  duration: 60,
});

const createRateLimiterMiddleware = (limiter, limitName = 'Rate limit') => {
  return async (req, res, next) => {
    const key = req.user ? req.user._id.toString() : req.ip;

    try {
      const rateLimiterRes = await limiter.consume(key);
      
      res.setHeader('X-RateLimit-Limit', limiter.points);
      res.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString());
      
      next();
    } catch (rateLimiterRes) {
      const retryAfter = Math.round(rateLimiterRes.msBeforeNext / 1000) || 1;
      const retryAfterMinutes = Math.ceil(retryAfter / 60);
      
      res.status(429).json({
        success: false,
        message: `${limitName} exceeded. Please try again later.`,
        retryAfterSeconds: retryAfter,
        retryAfterMinutes: retryAfterMinutes
      });
    }
  };
};

export const connectionRateLimiter = createRateLimiterMiddleware(connectionLimiter, 'Connection request limit');
export const feedRateLimiter = createRateLimiterMiddleware(feedLimiter, 'Feed browsing limit');
export const authRateLimiter = createRateLimiterMiddleware(authLimiter, 'Authentication limit');
export const generalRateLimiter = createRateLimiterMiddleware(generalLimiter, 'API rate limit');

export default generalRateLimiter;