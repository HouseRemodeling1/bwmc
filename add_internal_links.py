"""
Script to add internal links, keywords, and related content to blog posts
This enhances SEO by creating an internal linking structure
"""

import json
import re

# Read the blogs.json file
with open('public/data/blogs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define internal links to add to each blog post
internal_links = {
    "business-setup-uae-mainland-freezone-offshore": {
        "keywords": ["UAE business setup", "mainland license", "free zone Dubai", "offshore company UAE", "business formation"],
        "relatedPosts": ["obtain-trade-license-uae-types-cost-process", "trademark-registration-uae-process-cost-legal-protection"],
        "relatedServices": ["business-setup", "licensing"],
        "links_to_add": [
            {
                "search": "Once you've chosen your jurisdiction, the next step is obtaining the appropriate trade license",
                "replace": "Once you've chosen your jurisdiction, the next step is obtaining the appropriate <a href='/blog/obtain-trade-license-uae-types-cost-process'>trade license for your business activity</a>"
            },
            {
                "search": "Don't forget to protect your brand identity",
                "replace": "Don't forget to protect your brand identity through <a href='/blog/trademark-registration-uae-process-cost-legal-protection'>trademark registration</a>"
            },
            {
                "search": "Contact BWMC today to book your expert consultation!",
                "replace": "<a href='/contact'>Contact BWMC</a> today to book your expert consultation! You can also <a href='/calculator'>calculate your setup costs</a> or explore our <a href='/services/business-setup'>Business Setup services</a>."
            }
        ]
    },
    "obtain-trade-license-uae-types-cost-process": {
        "keywords": ["trade license UAE", "commercial license Dubai", "professional license", "industrial license", "licensing cost"],
        "relatedPosts": ["business-setup-uae-mainland-freezone-offshore", "accounting-bookkeeping-uae-legal-requirements"],
        "relatedServices": ["licensing", "business-setup"],
        "links_to_add": [
            {
                "search": "Before applying for a trade license, make sure you understand the different business setup options",
                "replace": "Before applying for a trade license, make sure you understand the different <a href='/blog/business-setup-uae-mainland-freezone-offshore'>business setup options in the UAE</a>"
            },
            {
                "search": "you'll also need to ensure proper accounting and bookkeeping systems",
                "replace": "you'll also need to ensure proper <a href='/blog/accounting-bookkeeping-uae-legal-requirements'>accounting and bookkeeping systems</a>"
            },
            {
                "search": "Contact BWMC for a customized quote and consultation!",
                "replace": "<a href='/contact'>Contact BWMC</a> for a customized quote and consultation! Explore our <a href='/services/licensing'>Licensing services</a> for expert guidance."
            }
        ]
    },
    "trademark-registration-uae-process-cost-legal-protection": {
        "keywords": ["trademark UAE", "IP registration", "brand protection", "trademark cost", "intellectual property"],
        "relatedPosts": ["business-setup-uae-mainland-freezone-offshore", "accounting-bookkeeping-uae-legal-requirements"],
        "relatedServices": ["legal"],
        "links_to_add": [
            {
                "search": "Trademark registration should be part of your initial business setup strategy",
                "replace": "Trademark registration should be part of your initial <a href='/blog/business-setup-uae-mainland-freezone-offshore'>business setup strategy in the UAE</a>"
            },
            {
                "search": "Proper trademark management requires accurate financial record-keeping",
                "replace": "Proper trademark management requires accurate <a href='/blog/accounting-bookkeeping-uae-legal-requirements'>financial record-keeping</a>"
            },
            {
                "search": "Contact BWMC for expert Trademark and IP services!",
                "replace": "<a href='/contact'>Contact BWMC</a> for expert Trademark and IP services! Visit our <a href='/services/legal'>Legal Services</a> page for more information."
            }
        ]
    },
    "accounting-bookkeeping-uae-legal-requirements": {
        "keywords": ["accounting UAE", "bookkeeping Dubai", "financial records", "VAT compliance", "audit requirements"],
        "relatedPosts": ["vat-uae-registration-filing-compliance-guide", "uae-corporate-tax-registration-guide"],
        "relatedServices": ["accounting"],
        "links_to_add": [
            {
                "search": "Accurate bookkeeping is essential for VAT compliance and filing",
                "replace": "Accurate bookkeeping is essential for <a href='/blog/vat-uae-registration-filing-compliance-guide'>VAT compliance and filing</a>"
            },
            {
                "search": "With the new UAE Corporate Tax regime",
                "replace": "With the new <a href='/blog/uae-corporate-tax-registration-guide'>UAE Corporate Tax regime</a>"
            },
            {
                "search": "Contact BWMC for professional Accounting and Bookkeeping services!",
                "replace": "<a href='/contact'>Contact BWMC</a> for professional Accounting and Bookkeeping services! Learn more about our <a href='/services/accounting'>Accounting services</a>."
            }
        ]
    },
    "vat-uae-registration-filing-compliance-guide": {
        "keywords": ["VAT UAE", "VAT registration", "VAT filing", "FTA compliance", "tax return UAE"],
        "relatedPosts": ["accounting-bookkeeping-uae-legal-requirements", "uae-corporate-tax-registration-guide"],
        "relatedServices": ["taxation"],
        "links_to_add": [
            {
                "search": "VAT compliance starts with proper accounting and bookkeeping practices",
                "replace": "VAT compliance starts with proper <a href='/blog/accounting-bookkeeping-uae-legal-requirements'>accounting and bookkeeping practices</a>"
            },
            {
                "search": "don't overlook the new Corporate Tax requirements",
                "replace": "don't overlook the new <a href='/blog/uae-corporate-tax-registration-guide'>Corporate Tax requirements</a>"
            },
            {
                "search": "Contact BWMC for expert VAT and Tax consultancy today!",
                "replace": "<a href='/contact'>Contact BWMC</a> for expert VAT and Tax consultancy today! Explore our <a href='/services/taxation'>Tax Services</a> or <a href='/contact'>schedule a consultation</a>."
            }
        ]
    },
    "uae-corporate-tax-registration-guide": {
        "keywords": ["corporate tax UAE", "tax registration", "9% tax rate", "FTA registration", "tax compliance"],
        "relatedPosts": ["vat-uae-registration-filing-compliance-guide", "accounting-bookkeeping-uae-legal-requirements"],
        "relatedServices": ["taxation"],
        "links_to_add": [
            {
                "search": "Corporate Tax compliance requires robust accounting systems and financial record-keeping",
                "replace": "Corporate Tax compliance requires robust <a href='/blog/accounting-bookkeeping-uae-legal-requirements'>accounting systems and financial record-keeping</a>"
            },
            {
                "search": "Corporate Tax is separate from VAT obligations",
                "replace": "Corporate Tax is separate from <a href='/blog/vat-uae-registration-filing-compliance-guide'>VAT obligations</a>"
            },
            {
                "search": "read our comprehensive guide on UAE business structures",
                "replace": "read our comprehensive guide on <a href='/blog/business-setup-uae-mainland-freezone-offshore'>UAE business structures</a>"
            },
            {
                "search": "Contact BWMC today for your Corporate Tax Assessment and Registration!",
                "replace": "<a href='/contact'>Contact BWMC</a> today for your Corporate Tax Assessment and Registration! Visit our <a href='/services/taxation'>Tax Services</a> page or <a href='/contact'>book a consultation</a>."
            }
        ]
    }
}

# Update each blog post
for blog in data['blogs']:
    slug = blog.get('slug')
    
    if slug in internal_links:
        # Add keywords
        blog['keywords'] = internal_links[slug]['keywords']
        
        # Add related posts
        blog['relatedPosts'] = internal_links[slug]['relatedPosts']
        
        # Add related services
        blog['relatedServices'] = internal_links[slug]['relatedServices']
        
        # Add internal links to content
        content = blog['content']
        for link_data in internal_links[slug]['links_to_add']:
            # Use case-insensitive search
            pattern = re.compile(re.escape(link_data['search']), re.IGNORECASE)
            content = pattern.sub(link_data['replace'], content, count=1)
        
        blog['content'] = content
        
        print(f"Updated: {blog['title']}")

# Write back to file
with open('public/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("\n✅ All blog posts updated with internal links and metadata!")
print("📊 Added keywords, related posts, and related services to 6 blog posts")
print("🔗 Inserted contextual internal links throughout the content")
