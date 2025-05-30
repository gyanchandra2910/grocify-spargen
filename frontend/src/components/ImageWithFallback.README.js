/**
 * How to use the ImageWithFallback component:
 * 
 * 1. Import the component:
 *    import ImageWithFallback from '../components/ImageWithFallback';
 * 
 * 2. Replace standard Image components with ImageWithFallback:
 * 
 *    // Before:
 *    <Image 
 *      src={product.image}
 *      alt={product.name}
 *      fluid
 *      loading="lazy" 
 *    />
 * 
 *    // After:
 *    <ImageWithFallback 
 *      src={product.image}
 *      alt={product.name}
 *      fluid
 *    />
 * 
 * Benefits:
 * - Includes "loading='lazy'" automatically
 * - Shows loading spinner until image is loaded
 * - Handles error states with default fallback image
 * - Smooth fade-in transition when images load
 * - Maintains all standard React Bootstrap Image props
 */
