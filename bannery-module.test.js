/**
 * Comprehensive test suite for bannery-module.js
 * Tests all functions with various scenarios and edge cases
 */

const {
  onReady,
  isHome,
  getBenefits,
  getProductsHeading,
  place
} = require('./bannery-module');

describe('Banner Module Tests', () => {

  // Reset DOM before each test
  beforeEach(() => {
    document.body.innerHTML = '';
    document.documentElement.className = '';
    document.body.className = '';
    // Reset location to a known state
    delete window.location;
    window.location = { pathname: '/other' };
  });

  describe('onReady()', () => {
    test('should execute function immediately when DOM is already loaded', () => {
      const mockFn = jest.fn();
      Object.defineProperty(document, 'readyState', {
        writable: true,
        value: 'complete'
      });

      onReady(mockFn);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should execute function immediately when DOM is interactive', () => {
      const mockFn = jest.fn();
      Object.defineProperty(document, 'readyState', {
        writable: true,
        value: 'interactive'
      });

      onReady(mockFn);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should wait for DOMContentLoaded when document is loading', () => {
      const mockFn = jest.fn();
      Object.defineProperty(document, 'readyState', {
        writable: true,
        value: 'loading'
      });

      onReady(mockFn);

      // Should not be called yet
      expect(mockFn).not.toHaveBeenCalled();

      // Simulate DOMContentLoaded event
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple onReady calls', () => {
      const mockFn1 = jest.fn();
      const mockFn2 = jest.fn();
      Object.defineProperty(document, 'readyState', {
        writable: true,
        value: 'complete'
      });

      onReady(mockFn1);
      onReady(mockFn2);

      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });
  });

  describe('isHome()', () => {
    test('should return true when pathname is "/"', () => {
      window.location.pathname = '/';

      expect(isHome()).toBe(true);
    });

    test('should return true when body has homepage class', () => {
      window.location.pathname = '/other';
      document.body.classList.add('homepage');

      expect(isHome()).toBe(true);
    });

    test('should return true when documentElement has homepage class', () => {
      window.location.pathname = '/other';
      document.documentElement.classList.add('homepage');

      expect(isHome()).toBe(true);
    });

    test('should return true when multiple conditions are met', () => {
      window.location.pathname = '/';
      document.body.classList.add('homepage');
      document.documentElement.classList.add('homepage');

      expect(isHome()).toBe(true);
    });

    test('should return false when not on homepage', () => {
      window.location.pathname = '/products/item';

      expect(isHome()).toBe(false);
    });

    test('should return false when pathname has trailing content', () => {
      window.location.pathname = '/home';

      expect(isHome()).toBe(false);
    });

    test('should handle empty body and documentElement classes', () => {
      window.location.pathname = '/about';
      document.body.className = '';
      document.documentElement.className = '';

      expect(isHome()).toBe(false);
    });
  });

  describe('getBenefits()', () => {
    test('should find benefits banner with full selector', () => {
      document.body.innerHTML = `
        <div class="benefitBanner position--benefitHomepage">Benefits</div>
      `;

      const result = getBenefits();

      expect(result).not.toBeNull();
      expect(result.textContent).toBe('Benefits');
      expect(result.classList.contains('benefitBanner')).toBe(true);
      expect(result.classList.contains('position--benefitHomepage')).toBe(true);
    });

    test('should find benefits banner with fallback selector', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits Fallback</div>
      `;

      const result = getBenefits();

      expect(result).not.toBeNull();
      expect(result.textContent).toBe('Benefits Fallback');
      expect(result.classList.contains('benefitBanner')).toBe(true);
    });

    test('should prefer full selector over fallback', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Fallback</div>
        <div class="benefitBanner position--benefitHomepage">Preferred</div>
      `;

      const result = getBenefits();

      expect(result.textContent).toBe('Preferred');
    });

    test('should return null when no benefits banner exists', () => {
      document.body.innerHTML = `<div class="other">Other</div>`;

      const result = getBenefits();

      expect(result).toBeNull();
    });

    test('should handle empty DOM', () => {
      document.body.innerHTML = '';

      const result = getBenefits();

      expect(result).toBeNull();
    });

    test('should find benefits banner in nested structure', () => {
      document.body.innerHTML = `
        <div class="container">
          <div class="wrapper">
            <div class="benefitBanner position--benefitHomepage">Nested</div>
          </div>
        </div>
      `;

      const result = getBenefits();

      expect(result).not.toBeNull();
      expect(result.textContent).toBe('Nested');
    });
  });

  describe('getProductsHeading()', () => {
    test('should find products heading with full selector', () => {
      document.body.innerHTML = `
        <h2 class="homepage-group-title homepage-products-heading-4">Products</h2>
      `;

      const result = getProductsHeading();

      expect(result).not.toBeNull();
      expect(result.textContent).toBe('Products');
      expect(result.classList.contains('homepage-group-title')).toBe(true);
      expect(result.classList.contains('homepage-products-heading-4')).toBe(true);
    });

    test('should find products heading with fallback selector', () => {
      document.body.innerHTML = `
        <h2 class="homepage-group-title">Products Fallback</h2>
      `;

      const result = getProductsHeading();

      expect(result).not.toBeNull();
      expect(result.textContent).toBe('Products Fallback');
      expect(result.classList.contains('homepage-group-title')).toBe(true);
    });

    test('should prefer full selector over fallback', () => {
      document.body.innerHTML = `
        <h2 class="homepage-group-title">Fallback</h2>
        <h2 class="homepage-group-title homepage-products-heading-4">Preferred</h2>
      `;

      const result = getProductsHeading();

      expect(result.textContent).toBe('Preferred');
    });

    test('should return null when no products heading exists', () => {
      document.body.innerHTML = `<div class="other">Other</div>`;

      const result = getProductsHeading();

      expect(result).toBeNull();
    });

    test('should handle empty DOM', () => {
      document.body.innerHTML = '';

      const result = getProductsHeading();

      expect(result).toBeNull();
    });

    test('should find products heading in nested structure', () => {
      document.body.innerHTML = `
        <div class="container">
          <div class="wrapper">
            <h2 class="homepage-group-title homepage-products-heading-4">Nested</h2>
          </div>
        </div>
      `;

      const result = getProductsHeading();

      expect(result).not.toBeNull();
      expect(result.textContent).toBe('Nested');
    });
  });

  describe('place()', () => {
    test('should return false when favorite-categories box does not exist', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
      `;

      const result = place();

      expect(result).toBe(false);
    });

    test('should return false when box already moved', () => {
      document.body.innerHTML = `
        <div id="favorite-categories" data-moved="1">Banner</div>
        <div class="benefitBanner">Benefits</div>
      `;

      const result = place();

      expect(result).toBe(false);
    });

    test('should place banner after benefits element when available', () => {
      document.body.innerHTML = `
        <div class="benefitBanner position--benefitHomepage">Benefits</div>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const benefits = document.querySelector('.benefitBanner');
      const box = document.getElementById('favorite-categories');

      const result = place();

      expect(result).toBe(true);
      expect(box.dataset.moved).toBe('1');
      expect(box.style.display).toBe('');
      expect(benefits.nextElementSibling).toBe(box);
    });

    test('should place banner before products heading when benefits not available', () => {
      document.body.innerHTML = `
        <h2 class="homepage-group-title">Products</h2>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const heading = document.querySelector('.homepage-group-title');
      const box = document.getElementById('favorite-categories');

      const result = place();

      expect(result).toBe(true);
      expect(box.dataset.moved).toBe('1');
      expect(box.style.display).toBe('');
      expect(heading.previousElementSibling).toBe(box);
    });

    test('should prefer benefits over products heading', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
        <h2 class="homepage-group-title">Products</h2>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const benefits = document.querySelector('.benefitBanner');
      const box = document.getElementById('favorite-categories');

      const result = place();

      expect(result).toBe(true);
      expect(benefits.nextElementSibling).toBe(box);
    });

    test('should return false when neither benefits nor heading exist', () => {
      document.body.innerHTML = `
        <div id="favorite-categories" style="display:none">Banner</div>
        <div class="other">Other content</div>
      `;

      const result = place();

      expect(result).toBe(false);

      const box = document.getElementById('favorite-categories');
      expect(box.dataset.moved).toBeUndefined();
      expect(box.style.display).toBe('none');
    });

    test('should only move banner once', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const result1 = place();
      expect(result1).toBe(true);

      const result2 = place();
      expect(result2).toBe(false);
    });

    test('should clear inline display style when placing', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const box = document.getElementById('favorite-categories');
      expect(box.style.display).toBe('none');

      place();

      expect(box.style.display).toBe('');
    });

    test('should handle complex DOM structure', () => {
      document.body.innerHTML = `
        <div class="header">Header</div>
        <div class="main-content">
          <div class="benefitBanner position--benefitHomepage">Benefits</div>
          <div class="products">
            <h2 class="homepage-group-title">Products</h2>
          </div>
        </div>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const benefits = document.querySelector('.benefitBanner');
      const box = document.getElementById('favorite-categories');

      const result = place();

      expect(result).toBe(true);
      expect(benefits.nextElementSibling).toBe(box);
    });

    test('should use fallback selectors when primary selectors not found', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits Basic</div>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const benefits = document.querySelector('.benefitBanner');
      const box = document.getElementById('favorite-categories');

      const result = place();

      expect(result).toBe(true);
      expect(benefits.nextElementSibling).toBe(box);
    });

    test('should handle banner with existing dataset properties', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
        <div id="favorite-categories" data-other="value" style="display:none">Banner</div>
      `;

      const box = document.getElementById('favorite-categories');
      expect(box.dataset.other).toBe('value');

      place();

      expect(box.dataset.moved).toBe('1');
      expect(box.dataset.other).toBe('value');
    });
  });

  describe('Integration scenarios', () => {
    test('should handle typical homepage DOM structure', () => {
      document.body.innerHTML = `
        <header class="site-header">Header</header>
        <main>
          <div class="benefitBanner position--benefitHomepage">
            <p>Free shipping on orders over $50</p>
          </div>
          <div class="homepage-content">
            <h2 class="homepage-group-title homepage-products-heading-4">Featured Products</h2>
            <div class="products-grid">Products here</div>
          </div>
        </main>
        <div id="favorite-categories" style="display:none">
          <h2>Favorite Categories</h2>
        </div>
      `;

      window.location.pathname = '/';

      expect(isHome()).toBe(true);
      expect(getBenefits()).not.toBeNull();
      expect(getProductsHeading()).not.toBeNull();
      expect(place()).toBe(true);

      const box = document.getElementById('favorite-categories');
      const benefits = getBenefits();
      expect(benefits.nextElementSibling).toBe(box);
    });

    test('should handle non-homepage correctly', () => {
      document.body.innerHTML = `
        <div id="favorite-categories" style="display:none">Banner</div>
        <div class="product-detail">Product</div>
      `;

      window.location.pathname = '/product/123';

      expect(isHome()).toBe(false);
    });

    test('should handle missing banner element gracefully', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
        <h2 class="homepage-group-title">Products</h2>
      `;

      window.location.pathname = '/';

      expect(isHome()).toBe(true);
      expect(place()).toBe(false);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle null or undefined document states', () => {
      document.body.innerHTML = '';

      expect(() => getBenefits()).not.toThrow();
      expect(() => getProductsHeading()).not.toThrow();
      expect(() => place()).not.toThrow();
    });

    test('should handle malformed HTML', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">
          <div id="favorite-categories" style="display:none">Banner</div>
      `;

      expect(() => place()).not.toThrow();
    });

    test('should handle multiple elements with same ID', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
        <div id="favorite-categories" style="display:none">Banner 1</div>
        <div id="favorite-categories" style="display:none">Banner 2</div>
      `;

      // getElementById behavior with duplicate IDs is undefined (invalid HTML)
      // Test should not throw and handle gracefully
      expect(() => place()).not.toThrow();

      const box = document.getElementById('favorite-categories');
      expect(box).not.toBeNull();
    });

    test('should handle empty className strings', () => {
      document.body.className = '';
      document.documentElement.className = '';
      window.location.pathname = '/products';

      expect(isHome()).toBe(false);
    });

    test('should handle whitespace in classNames', () => {
      document.body.className = '  homepage  ';
      window.location.pathname = '/other';

      expect(isHome()).toBe(true);
    });
  });

  describe('Performance and state management', () => {
    test('place() should be idempotent after first successful placement', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const benefits = document.querySelector('.benefitBanner');

      place();
      const firstPosition = benefits.nextElementSibling;

      place();
      const secondPosition = benefits.nextElementSibling;

      expect(firstPosition).toBe(secondPosition);
    });

    test('should handle rapid successive calls', () => {
      document.body.innerHTML = `
        <div class="benefitBanner">Benefits</div>
        <div id="favorite-categories" style="display:none">Banner</div>
      `;

      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(place());
      }

      expect(results[0]).toBe(true);
      expect(results.slice(1).every(r => r === false)).toBe(true);
    });
  });
});
