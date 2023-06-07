import React from 'react';

function PricingTable() {
    return (
        <stripe-pricing-table
            pricing-table-id={import.meta.env.VITE_PRICING_TABLE_ID}
            publishable-key={import.meta.env.VITE_PUBLISHABLE_KEY}
    >
    </stripe-pricing-table>
);
}
export default PricingTable;