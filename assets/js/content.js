// Check whether this is an eBay search results page
if (window.location.host.startsWith('www.ebay') && window.location.pathname.startsWith('/sch/')) {
    // Wait for document to load
    $(document).ready(function () {
        // Get on/off toggle value for this feature
        chrome.storage.sync.get({
            enableSortByPopularity: true
        }, function (options) {
            // Check whether this feature is disabled
            if (!options.enableSortByPopularity) {
                return;
            }

            // Array of search results
            var results = [];

            // Traverse search results
            $('ul.srp-results li.s-item, ul#ListViewInner li[listingid]').each(function () {
                // Convert to jQuery object
                var listing = $(this);

                // Default listing sold count to 0
                var soldCount = 0;

                // Extract hotness text
                var hotnessText = listing.find('.s-item__itemHotness, .hotness-signal').text().replace(/,/g, '');

                // Get sold count as integer
                soldCount = parseInt(hotnessText) || 0;

                // Count indicates number of users watching this item and not number of times sold?
                if (hotnessText.includes('watching')) {
                    soldCount = 0;
                }

                // Count indicates a percentage discount and not number of times sold?
                if (hotnessText.includes('%')) {
                    soldCount = 0;
                }

                // Add item sold count and listing itself
                results.push({ sold: soldCount, listing: listing });

                // Delete element temporarily
                listing.remove();
            });

            // Sort all listings by sold count DESC
            results.sort(function (a, b) {
                return b.sold - a.sold;
            });

            // Get search results parent list
            var ul = $('.srp-river-answer, #ListViewInner').first();

            // Warn the user about the modified result order
            ul.append('<p>These search results have been modified by <b>eBay™ Popularity Sort</b>.</p>');

            // Re-add the sorted results
            results.forEach(function (item) {
                ul.append(item.listing);
            });
        });
    });
}