/**
 * Banner placement module for Shoptet e-commerce
 * This module handles placing a "favorite categories" banner on the homepage
 */

/**
 * Executes a function when the DOM is ready
 * @param {Function} fn - The function to execute
 */
function onReady(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

/**
 * Checks if the current page is the homepage
 * @returns {boolean} True if on homepage, false otherwise
 */
function isHome() {
  return location.pathname === '/' ||
         document.body.classList.contains('homepage') ||
         document.documentElement.classList.contains('homepage');
}

/**
 * Finds the benefits banner element in the DOM
 * @returns {Element|null} The benefits banner element or null if not found
 */
function getBenefits() {
  return document.querySelector('.benefitBanner.position--benefitHomepage')
      || document.querySelector('.benefitBanner');
}

/**
 * Finds the products heading element in the DOM
 * @returns {Element|null} The products heading element or null if not found
 */
function getProductsHeading() {
  return document.querySelector('.homepage-group-title.homepage-products-heading-4')
      || document.querySelector('.homepage-group-title');
}

/**
 * Places the favorite categories banner in the appropriate location
 * @returns {boolean} True if successfully placed, false otherwise
 */
function place() {
  var box = document.getElementById('favorite-categories');
  if (!box || box.dataset.moved === '1') return false;

  var benefits = getBenefits();
  if (benefits) {
    benefits.insertAdjacentElement('afterend', box);
    box.dataset.moved = '1';
    box.style.display = '';
    return true;
  }

  var heading = getProductsHeading();
  if (heading) {
    heading.insertAdjacentElement('beforebegin', box);
    box.dataset.moved = '1';
    box.style.display = '';
    return true;
  }

  return false;
}

/**
 * Initializes the banner placement logic
 * - Checks if on homepage
 * - Attempts to place banner
 * - Sets up retry logic with interval and MutationObserver
 */
function init() {
  onReady(function() {
    if (!isHome()) {
      var box = document.getElementById('favorite-categories');
      if (box) { /* keep hidden */ }
      return;
    }

    if (place()) return;

    var tries = 0;
    var iv = setInterval(function() {
      tries++;
      if (place() || tries > 120) clearInterval(iv);
    }, 125);

    var mo = new MutationObserver(function() {
      if (place()) mo.disconnect();
    });
    mo.observe(document.documentElement, {childList: true, subtree: true});
    setTimeout(function() {
      try { mo.disconnect(); } catch(e) {}
    }, 16000);
  });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    onReady,
    isHome,
    getBenefits,
    getProductsHeading,
    place,
    init
  };
}
