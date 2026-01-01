
import { FileText, CheckCircle, BarChart, Settings, Shield, Globe } from "lucide-react";

// Service content definitions
export const serviceContent: Record<string, any> = {
    "accounting-bookkeeping": {
        category: "accounting",
        title: "Professional Accounting & Bookkeeping Services",
        subtitle: "Bookkeeping and Accounting Services for Every Stage of Your Business",
        description: "We provide comprehensive accounting and bookkeeping solutions designed to streamline your financial operations. Whether you are a startup needing basic ledgers or an established enterprise requiring complex financial reporting, our expert team ensures your books are accurate, compliant, and insightful. We let you focus on growing your business while we handle the numbers.",
        context: "In the UAE's evolving regulatory landscape, accurate bookkeeping is not just about compliance - it's about survival and growth. From VAT filing to Corporate Tax readiness, our services ensure you are always audit-ready and penalty-free.",
        scope: [
            "Financial Statement Preparation (P&L, Balance Sheet)",
            "Daily Transaction Recording & Bank Reconciliation",
            "Accounts Payable & Receivable Management",
            "Cloud Accounting Setup (Xero, QuickBooks, Zoho)",
            "VAT Compliant Invoicing & Return Filing",
            "Payroll Processing & WPS Compliance"
        ],
        methodology: [
            { phase: "Onboard", desc: "Personalized assessment of your business needs and software setup." },
            { phase: "Streamline", desc: "Implementation of efficient, automated accounting processes." },
            { phase: "Manage", desc: "Ongoing recording, reconciliation, and financial oversight." },
            { phase: "Report", desc: "Delivery of timely financial statements and strategic insights." }
        ],
        faq: [
            { q: "Why outsource bookkeeping?", a: "Outsourcing allows you to focus on your core business while ensuring your financials are handled by experts, often at a lower cost than hiring in-house." },
            { q: "What software do you use?", a: "We are certified experts in major cloud platforms including Xero, QuickBooks, and Zoho Books." },
            { q: "How often do I get reports?", a: "We provide monthly or quarterly management reports tailored to your specific business requirements." },
            { q: "Is bookkeeping mandatory for small businesses?", a: "Yes, under the Corporate Tax Law, all businesses must maintain financial records to justify their tax returns." }
        ]
    },

    "auditing-assurance": {
        category: "accounting",
        title: "Audit & Assurance Services",
        subtitle: "Clarity, Confidence, and Compliance for Your Business",
        description: "In an era of complex regulatory frameworks, financial transparency is not just a legal requirement but a strategic asset. Our Audit & Assurance services go beyond statutory compliance to deliver actionable insights into your business performance. Whether you operate in Dubai, Abu Dhabi, or Free Zones like DMCC, JAFZA, and ADGM, we ensure your financial statements are accurate, defensible, and aligned with global standards.\n\nWe leverage advanced digital audit tools and data analytics to provide a faster, more accurate audit process. Our approach is risk-based, focusing on the areas that matter most to your business continuity and growth.",
        context: "We are fully compliant with the UAE Commercial Companies Law, IFRS, and Anti-Money Laundering (AML) regulations. As registered auditors with key authorities (including ADGM and DIFC), we help you navigate the requirements of banks, investors, and regulators with absolute confidence. Our industry expertise spans Financial Services, Energy, Real Estate, and Retail.",
        scope: [
            "Statutory Financial Audit (Mainland & Free Zones)",
            "Anti-Money Laundering (AML) Audit & Compliance",
            "Internal Audit, Risk Advisory & Internal Controls",
            "Forensic Audit & Fraud Investigation",
            "Liquidation & De-registration Reports",
            "Sales Certification & RERA Audits",
            "Agreed-Upon Procedures (AUP) & Due Diligence",
            "ICV (In-Country Value) Certification Support",
            "Concurrent Audit & Real-time Transaction Checks",
            "Customs Audit & Supply Chain Compliance",
            "Mystery Audit & Service Quality Assessment",
            "Quarterly Review Reporting for Banks"
        ],
        methodology: [
            { phase: "Planning & Risk Assessment", desc: "Deep dive into your business environment to identify key risks and control gaps." },
            { phase: "Data Analytics & Fieldwork", desc: "Leveraging digital tools for sampling and substantive testing of transactions." },
            { phase: "Control Evaluation", desc: "Testing the effectiveness of internal controls and governance structures." },
            { phase: "Review & Quality Assurance", desc: " rigorous internal quality checks aligned with International Standards on Quality Control (ISQC)." },
            { phase: "Reporting & Insight", desc: "Issuance of independent auditor's report along with a management letter detailing strategic recommendations." }
        ],
        faq: [
            { q: "Do all UAE companies need an audit?", a: "Yes, under the new Corporate Tax law and stricter Free Zone regulations (like DMCC), most entities are required to maintain audited financial statements." },
            { q: "Are you approved in all key jurisdictions?", a: "We are registered with major jurisdictions including DMCC, JAFZA, DAFZA, and ADGM, ensuring our reports are accepted by all government bodies and banks." },
            { q: "What is an AML Audit?", a: "It is a mandatory independent review for Designated Non-Financial Businesses and Professions (DNFBPs) to ensure compliance with UAE's anti-money laundering laws." },
            { q: "How does your digital audit approach help?", a: "Our technology-driven approach reduces manual errors, speeds up the turnaround time, and provides deeper insights into financial trends and anomalies." }
        ]
    },
    "internal-audit": {
        category: "accounting",
        title: "Internal Audit & Risk Advisory",
        subtitle: "Enhance Governance, Mitigate Risks, and Optimize Operations",
        description: "Internal Auditing is an independent, objective assurance and consulting activity designed to add value and improve an organization's operations. We help you accomplish your objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control, and governance processes. Unlike external audits which focus on financial accuracy for stakeholders, our internal audit service focuses on operational efficiency, process optimization, and asset protection.",
        context: "In the dynamic UAE business landscape, robust internal controls are essential to prevent fraud, ensure regulatory compliance, and streamline operations. Our certified internal auditors act as your strategic partners, identifying bottlenecks and recommending practical solutions.",
        scope: [
            "Risk Assessment & Heat Mapping",
            "Internal Control Framework Evaluation (COSO)",
            "Operational Process Reviews & Optimization",
            "Fraud Prevention & Forensic Investigation",
            "Regulatory Compliance Audits (AML, ESR, VAT)",
            "IT General Controls (ITGC) Review",
            "SOP Development & Implementation",
            "Corporate Governance Advisory"
        ],
        methodology: [
            { phase: "Risk Assessment", desc: "Identify high-risk areas and prioritize audit focus based on business impact." },
            { phase: "Process Walkthrough", desc: "Document current processes to understand flows and identify control gaps." },
            { phase: "Testing & Fieldwork", desc: "Evaluate the design and operating effectiveness of internal controls." },
            { phase: "Reporting", desc: "Provide actionable recommendations to management for process improvement." },
            { phase: "Follow-up", desc: "Monitor the implementation of agreed management action plans." }
        ],
        faq: [
            { q: "How is Internal Audit different from External Audit?", a: "Internal Audit focuses on improving internal processes, risk management, and operational efficiency, whereas External Audit focuses on the accuracy of financial statements for shareholders." },
            { q: "Is Internal Audit mandatory in UAE?", a: "While not mandatory for all, it is a regulatory requirement for listed companies, financial institutions, and specific Free Zone entities. It is highly recommended for all growing SMEs." },
            { q: "What are the key benefits?", a: "It ensures compliance, establishes standard operating procedures, prevents fraud, improves resource utilization, and enhances overall corporate governance." }
        ]
    },
    "external-audit": {
        category: "accounting",
        title: "External Audit & Financial Reporting",
        subtitle: "Independent Verification for Global Credibility",
        description: "External Audit is the cornerstone of financial trust. It is an independent examination of your company's financial statements to ensure they differ materially from reality and comply with International Financial Reporting Standards (IFRS) and UAE laws. Beyond a statutory obligation, an external audit enhances your credibility with banks, investors, and government authorities, facilitating license renewals, loan approvals, and strategic partnerships.",
        context: "In the UAE, external audits are mandatory for most Free Zone license renewals (such as DMCC and JAFZA) and for all mainland companies under the new Corporate Tax regime. We serve as your independent authorized auditors, providing reports that are accepted by all major banks and regulatory bodies.",
        scope: [
            "Statutory Annual Financial Audit",
            "Free Zone License Renewal Audit",
            "Bank Compliance & Credit Facility Audit",
            "IFRS Conversion & Compliance",
            "Financial Statement Analysis",
            "Fraud Detection & Risk Assessment",
            "In-Depth Review of Accounting Policies",
            "Audit for Dispute Resolution & Shareholder Assurance"
        ],
        methodology: [
            { phase: "Engagement Planning", desc: "Understanding business operations and designing a tailored audit strategy." },
            { phase: "Risk Assessment", desc: "Identifying key financial risks and control gaps." },
            { phase: "Fieldwork & Testing", desc: "Substantive testing of transactions, balances, and disclosures." },
            { phase: "Review & Quality Control", desc: "Rigorous review to ensure compliance with ISA and IFRS." },
            { phase: "Reporting", desc: "Issuing the Independent Auditor's Report and Management Letter." }
        ],
        faq: [
            { q: "Is External Audit mandatory for license renewal?", a: "Yes, for most Free Zones like DMCC, JAFZA, and DAFZA, submitting an audited financial report is a mandatory requirement for annual license renewal." },
            { q: "Do banks require audited financial statements?", a: "Absolutely. UAE banks require audited reports to assess creditworthiness before approving or renewing loans and banking facilities." },
            { q: "What standards do you follow?", a: "We strictly adhere to International Financial Reporting Standards (IFRS) and International Standards on Auditing (ISA)." }
        ]
    },
    "liquidation-report": {
        category: "other",
        title: "Company Liquidation Report Services",
        subtitle: "Simplifying Business Closure & Deregistration",
        description: "Closing a business in the UAE involves a formal liquidation process to settle liabilities, clear debts, and distribute assets. A certified Liquidator's Report is a mandatory requirement for cancelling your trade license and removing the company from the commercial register. We handle the entire process with precision, ensuring full legal compliance and a hassle-free exit strategy.",
        context: "Whether it's a voluntary winding up or a mandatory closure, navigating the requirements of the DED, Free Zone authorities, and Federal Tax Authority (FTA) can be complex. We act as your appointed liquidator, managing everything from public notices to final clearance certificates.",
        scope: [
            "Appointment of Registered Liquidator",
            "Board Resolution Drafting",
            "Newspaper Advertisement (Public Notice)",
            "clearance Certificate Coordination (DED, FTA, Utilities)",
            "Liability Settlement & Asset Distribution",
            "Final Liquidation Audit Report",
            "Trade License Cancellation",
            "Deregistration from VAT & Corporate Tax"
        ],
        methodology: [
            { phase: "Board Resolution", desc: "Drafting and notarizing the decision to liquidate." },
            { phase: "Appointment", desc: "Officially appointing us as the registered liquidator." },
            { phase: "Public Notice", desc: "Publishing the required liquidation notice in two newspapers." },
            { phase: "Clearance & Settlement", desc: "Obtaining NOCs and settling all debts and liabilities." },
            { phase: "Final Report", desc: "Submitting the final audit report to authorities for license cancellation." }
        ],
        faq: [
            { q: "What is a Liquidation Report?", a: "It is a formal document prepared by a registered auditor confirming that a company has no outstanding debts and has distributed its assets legally." },
            { q: "How long does the process take?", a: "The mandatory notice period is 45 days. The entire process typically takes 60-90 days depending on the jurisdiction and clearances." },
            { q: "Is it mandatory to appoint a liquidator?", a: "Yes, UAE Commercial Companies Law requires the appointment of a registered liquidator to oversee the winding-up process." }
        ]
    },
    "statutory-audit": {
        category: "accounting",
        title: "Statutory Audit Services",
        subtitle: "Ensuring Financial Transparency & Regulatory Compliance",
        description: "A Statutory Audit is a legally required examination of your company's financial records to verify accuracy and compliance with UAE Federal Law No. 2 of 2015 (Company Law). Beyond fulfilling a legal obligation, our statutory audits build trust with shareholders, investors, and regulatory bodies like the Ministry of Economy. We provide an unbiased opinion on your financial health, identifying risks and ensuring your statements reflect a true and fair view.",
        context: "Under the new UAE Corporate Tax regime and strict Free Zone regulations, accurate financial reporting is more critical than ever. Statutory audits are mandatory for Mainland LLCs, PJSCs, and most Free Zone entities (DIFC, JAFZA, DMCC) to renew their trade licenses and avoid penalties.",
        scope: [
            "Review of Financial Statements (Balance Sheet, P&L, Cash Flow)",
            "Verification of Supporting Documents (Invoices, Contracts, Bank Statements)",
            "Audit of Internal Controls & Accounting Systems",
            "Compliance with UAE Commercial Companies Law",
            "Assessment of Statutory Dues & Tax Obligations (VAT, Corporate Tax)",
            "Inventory Count & Asset Verification",
            "Payroll & Employee Benefit Audit",
            "Shareholder Equity & Capital Structure Review"
        ],
        methodology: [
            { phase: "Planning & Strategy", desc: "Understanding the entity's legal structure, industry, and audit risks." },
            { phase: "Documentation Review", desc: "Collecting key documents: bank statements, contracts, invoices, and board minutes." },
            { phase: "Fieldwork & Verification", desc: "Testing controls, verifying assets (inventory/cash), and auditing transactions." },
            { phase: "Draft Reporting", desc: "Discussing findings and adjustments with management to ensure accuracy." },
            { phase: "Final Audit Report", desc: "Issuing the formal opinion signed by our licensed auditors for submission to authorities." }
        ],
        faq: [
            { q: "What is the difference between Internal and Statutory Audit?", a: "Internal audit is optional and focused on improving operations, while Statutory Audit is a mandatory legal requirement focused on financial statement accuracy for external stakeholders." },
            { q: "What is the deadline for submission?", a: "Most authorities, including the Ministry of Economy, require audited financial statements within 3 months of the financial year-end." },
            { q: "Who needs a Statutory Audit?", a: "Mainland LLCs, PJSCs, branches of foreign companies, and entities in specific Free Zones (like DMCC, JAFZA) are legally required to conduct annual statutory audits." }
        ]
    },
    "due-diligence-audit": {
        category: "accounting",
        title: "Due Diligence Audit Services",
        subtitle: "Comprehensive Risk Assessment for Smart Business Decisions",
        description: "Due Diligence is a critical investigation performed before entering into a business agreement or financial transaction. It goes beyond a standard audit to evaluate the history, performance, capability, and goodwill of a potential investment. Whether you are acquiring a company, merging with another entity, or planning a major investment, our Due Diligence Audit provides the deep insights needed to uncover hidden risks, validate financial claims, and negotiate the best deal.",
        context: "In the UAE's competitive market, 'Caveat Emptor' (Buyer Beware) is a guiding principle. Our detailed reports empower buyers and investors to make informed decisions by scrutinizing every aspect of the target entity - from financial health to legal standing and operational efficiency.",
        scope: [
            "Financial Due Diligence (Historical Results, Cash Flow, Forecasts)",
            "Commercial Due Diligence (Market Position, Competitors, Product Assessment)",
            "Legal Due Diligence (Disputes, IP Rights, Contracts)",
            "Operational Due Diligence (HR, Systems, Processes)",
            "Tax Due Diligence (VAT Compliance, Corporate Tax Exposure)",
            "Environmental & Environmental Compliance Checks",
            "Background Checks on Key Management (People Due Diligence)",
            "Synergy & Valuation Analysis"
        ],
        methodology: [
            { phase: "Engagement Strategy", desc: "Defining the scope and objectives (e.g., M&A, Investment, Partnership)." },
            { phase: "Data Collection", desc: "Gathering operational data, financial records, and legal documents." },
            { phase: "Fiscal & Legal Scrutiny", desc: "in-depth examination of financial statements and legal liabilities." },
            { phase: "Operational Review", desc: "Assessing non-financial factors like HR, IT systems, and workflows." },
            { phase: "Reporting", desc: "Delivering a comprehensive report highlighting risks, opportunities, and valuation insights." }
        ],
        faq: [
            { q: "When is Due Diligence required?", a: "It is essential before any major business transaction, such as mergers and acquisitions (M&A), joint ventures, serious investments, or purchasing a business." },
            { q: "How does it differ from a regular audit?", a: "A regular audit focuses on compliance and historical accuracy, while Due Diligence focuses on the future potential, risks, and commercial viability of a specific transaction." },
            { q: "How long does it take?", a: "Depending on the complexity of the business, a thorough Due Diligence process typically takes between 2 to 4 weeks." }
        ]
    },
    "vat-accounting": {
        category: "taxation",
        title: "VAT Accounting & Consultancy",
        subtitle: "Ensure 100% Compliance & Optimize Your Tax Position",
        description: "Value Added Tax (VAT) management is a critical aspect of doing business in the UAE. Our specialized VAT accounting services ensure that your business remains fully compliant with Federal Tax Authority (FTA) regulations while optimizing your tax position. From initial registration to accurate return filing and refund processing, we handle the complexities of VAT so you can focus on your core business operations.",
        context: "With strict penalties for non-compliance, manual errors in VAT filing can be costly. We act as your tax agent, ensuring that every invoice, return, and record meets the FTA's stringent standards. We also assist with complex scenarios like designated zones, mixed-use developments, and cross-border transactions.",
        scope: [
            "VAT Registration & Deregistration Services",
            "Quarterly VAT Return Filing (Form 201)",
            "VAT Impact Assessment & Implementation",
            "Transaction Review & Tax Coding",
            "VAT Refund Processing for Exporters/Tourists",
            "Voluntary Disclosure (Form 211) Assistance",
            "Liaising with FTA for Tax Audits",
            "Advisory on Zero-Rated & Exempt Supplies"
        ],
        methodology: [
            { phase: "Assessment", desc: "Analyzing your business model to determine VAT liability and exemptions." },
            { phase: "Registration", desc: "Assisting with TRN generation and FTA portal setup." },
            { phase: "Recording", desc: "Ensuring all accounting records are VAT-compliant (Tax Invoices)." },
            { phase: "Filing", desc: "Calculating output/input tax and submitting accurate returns on time." },
            { phase: "Audit Support", desc: "Representing your business during any FTA clarifications or audits." }
        ],
        faq: [
            { q: "Is VAT registration mandatory?", a: "Yes, if your taxable supplies and imports exceed AED 375,000 per annum. It is voluntary if they exceed AED 187,500." },
            { q: "What happens if I make a mistake in filing?", a: "Errors should be corrected via a Voluntary Disclosure. We help identify and rectify errors to minimize potential penalties." },
            { q: "Can I claim a VAT refund?", a: "Yes, if your input tax exceeds your output tax or if you are eligible under specific schemes (e.g., business visitors, Expo participants)." }
        ]
    },
    "corporate-tax": {
        category: "taxation",
        title: "Corporate Tax Advisory",
        subtitle: "Strategic Planning for the New Tax Era",
        description: "The introduction of Corporate Tax in the UAE marks a significant shift in the business landscape. We provide comprehensive advisory services to help businesses navigate this new regime, ensuring full compliance while optimizing tax efficiency. From analyzing the impact on your bottom line to restructuring operations for tax benefits, our experts guide you through every step of the Corporate Tax lifecycle.",
        context: "Effective from June 2023, Corporate Tax applies to net profits of businesses. Navigating the exemptions for Free Zone entities, Small Business Relief, and the complexities of Transfer Pricing requires expert guidance to avoid penalties and maximize legitimate tax savings.",
        scope: [
            "Corporate Tax Registration & Deregistration",
            "Tax Impact Assessment & Gap Analysis",
            "Free Zone Exemption & Qualifying Income Analysis",
            "Transfer Pricing Compliance & Benchmarking",
            "Tax Grouping & Restructuring",
            "Annual Corporate Tax Return Filing",
            "Calculation of Taxable Income & Deductible Expenses",
            "Representation before the FTA"
        ],
        methodology: [
            { phase: "Impact Assessment", desc: "Evaluating how Corporate Tax affects your specific business structure and margins." },
            { phase: "Structuring", desc: "Advising on the most tax-efficient structure, including Free Zone benefits." },
            { phase: "Registration", desc: "Handling the official registration process with the Federal Tax Authority." },
            { phase: "Compliance", desc: "Ensuring proper accounting records and transfer pricing documentation." },
            { phase: "Filing", desc: "Preparing and submitting annual tax returns accurately and on time." }
        ],
        faq: [
            { q: "What is the Corporate Tax rate?", a: "The standard rate is 9% on taxable income exceeding AED 375,000. Income up to this threshold is taxed at 0%." },
            { q: "Are Free Zone companies exempt?", a: "Free Zone companies can benefit from a 0% rate on 'Qualifying Income' if they meet specific substance and compliance requirements." },
            { q: "What is Transfer Pricing?", a: "It is a regulation ensuring that transactions between related parties (e.g., group companies) are conducted at arm's length prices." }
        ]
    },
    "excise-tax": {
        category: "taxation",
        title: "Excise Tax Services",
        subtitle: "Managing Compliance for Excisable Goods",
        description: "Excise Tax is a specialized tax levied on specific goods detrimental to human health or the environment, such as tobacco, energy drinks, and carbonated beverages. Our Excise Tax services are designed for importers, producers, and stockpilers to ensure strict adherence to FTA regulations, from product registration to monthly filing and warehouse management.",
        context: "Managing Excise Tax involves rigorous inventory controls, specific clearing procedures for imports, and strict reporting timelines. Non-compliance can lead to severe penalties and confiscation of goods. We help you navigate these complexities, including the management of Designated Zones.",
        scope: [
            "Excise Tax Registration & Deregistration",
            "Product Registration & Classification",
            "Designated Zone Registration & Management",
            "Monthly Excise Tax Return Filing",
            "Stockpiler & Producer Compliance",
            "Import/Export Declaration Support",
            "Inventory Audits & Reconciliation",
            "Voluntary Disclosure Support"
        ],
        methodology: [
            { phase: "Classification", desc: "Reviewing your product portfolio to identify excisable goods and applicable rates." },
            { phase: "Registration", desc: "Registering your business and your products on the FTA portal." },
            { phase: "Operations Setup", desc: "Advising on compliance procedures for warehousing and movement of goods." },
            { phase: "Filing", desc: "Calculating tax liability based on production/import volumes and filing returns." },
            { phase: "Audit", desc: "Conducting mock audits to ensure inventory records match filed returns." }
        ],
        faq: [
            { q: "Which goods are subject to Excise Tax?", a: "Tobacco, tobacco products, electronic smoking devices, energy drinks (100%), and carbonated drinks (50%)." },
            { q: "Who is liable to pay Excise Tax?", a: "Importers, producers, and stockpilers of excisable goods in the UAE." },
            { q: "What is a Designated Zone for Excise?", a: "It is a specific fenced area where excisable goods can be stored with tax suspension, subject to strict FTA controls." }
        ]
    },
    "tax-agency": {
        category: "taxation",
        title: "Tax Agency Services",
        subtitle: "FTA-Approved Representation for Peace of Mind",
        description: "As your appointed Tax Agency, we act as your official representative before the Federal Tax Authority (FTA). We take on the responsibility of managing your tax affairs, ensuring correct filings, handling correspondence, and representing you in all tax-related matters. This service is ideal for businesses seeking a professional buffer between their operations and regulatory bodies to ensure precision and compliance.",
        context: "Appointing a Tax Agency delegates your compliance burden to licensed professionals. It provides an added layer of security, as we handle all FTA queries, audits, and submissions on your behalf, reducing the risk of administrative errors and penalties.",
        scope: [
            "Official Representation before the FTA",
            "Management of Tax Portal & Correspondence",
            "Filing of VAT & Corporate Tax Returns",
            "Handling Tax Assessments & Penalties",
            "Submission of Reconsideration Forms",
            "Guidance on Complex Tax Rulings",
            "Record Keeping & Documentation Compliance",
            "Updates on Changing Tax Legislation"
        ],
        methodology: [
            { phase: "Appointment", desc: "Formalizing our role as your Tax Agency via the FTA portal." },
            { phase: "Review", desc: "Initial health check of your tax history and current compliance status." },
            { phase: "Management", desc: "Taking over the daily management of tax filings and portal notifications." },
            { phase: "Advisory", desc: "Providing ongoing advice on tax implications of business decisions." },
            { phase: "Representation", desc: "Directly handling all interactions, queries, and audits from the FTA." }
        ],
        faq: [
            { q: "What is a Tax Agency?", a: "A legal entity licensed by the FTA to operate and aid taxable persons in complying with their tax obligations." },
            { q: "Why appoint a Tax Agency?", a: "It ensures professional handling of tax affairs, minimizes errors, and provides expert representation during audits." },
            { q: "Does a Tax Agency take liability?", a: "While we manage compliance, the ultimate liability remains with the taxable person, but we significantly mitigate risks through expert management." }
        ]
    },
    "tax-audit": {
        category: "taxation",
        title: "Tax Audit Services",
        subtitle: "Audit Readiness & Defense Strategies",
        description: "A Tax Audit by the FTA can be a rigorous process. our Tax Audit services are designed to prepare your business for such scrutiny. We conduct pre-audit health checks (Mock Audits) to identify vulnerabilities and rectify them before the authorities do. If you are selected for an official audit, we provide full support, managing the process and defending your position to minimize penalties.",
        context: "The FTA conducts audits to verify the accuracy of Tax Returns and compliance with laws. Inconsistencies between filings and financial records are primary triggers. Our goal is to ensure your documentation is audit-ready and to handle the audit process smoothly.",
        scope: [
            "Pre-Audit Health Checks (Mock Audits)",
            "Review of VAT & Corporate Tax Returns",
            "Gap Analysis & Risk Assessment",
            "Rectification of Historical Errors",
            "Preparation of Audit Files (FAF File)",
            "On-site Support during FTA Field Audits",
            "Drafting Responses to Audit Queries",
            "Voluntary Disclosure Preparation"
        ],
        methodology: [
            { phase: "Diagnostic", desc: "Reviewing past returns and financial records to identify compliance gaps." },
            { phase: "Rectification", desc: "Correcting identified errors via VDs or adjustments before an official audit." },
            { phase: "Preparation", desc: "Organizing all supporting documents and the FTA Audit File (FAF)." },
            { phase: "Execution", desc: "Hosting the mock audit or supporting during the actual FTA audit." },
            { phase: "Resolution", desc: "Assisting in closing the audit and negotiating any findings or penalties." }
        ],
        faq: [
            { q: "What triggers a Tax Audit?", a: "Triggers can include refund claims, inconsistencies in filings, or random selection by the FTA." },
            { q: "How long does a Tax Audit take?", a: "It varies, but typically involves a 5-day notice period followed by days or weeks of review depending on complexity." },
            { q: "What is a Mock Audit?", a: "It simulates an official FTA audit to find and fix issues proactively, ensuring you are 'Audit Ready'." }
        ]
    },
    "vat-consultancy": {
        category: "taxation",
        title: "VAT Consultancy Services",
        subtitle: "Strategic VAT Advice for Complex Business Scenarios",
        description: "While VAT Accounting focuses on routine filing, our VAT Consultancy service provides high-level strategic advice for complex challenges. We help businesses navigate intricate VAT rules related to cross-border trade, mixed-use developments, and free zone operations. Our consultants serve as your technical backbone, ensuring your business structure and transactions are optimized for VAT efficiency.",
        context: "Unique business models often face ambiguous VAT treatments. Whether it's determining the 'Place of Supply' for digital services or applying the 'Reverse Charge Mechanism', our expert opinions clarify uncertainties and prevent non-compliance risks before they occur.",
        scope: [
            "Complex VAT Impact Assessment",
            "Cross-Border Transaction Analysis",
            "VAT for Real Estate & Construction",
            "Supply Chain & Logistics VAT Optimization",
            "Clarifications & Technical Rulings from FTA",
            "VAT Health Checks & Diagnostic Reviews",
            "Contract Review for VAT Clauses",
            "In-house VAT Training for Teams"
        ],
        methodology: [
            { phase: "Discovery", desc: "Deep dive into specific transaction flows and business contracts." },
            { phase: "Analysis", desc: "Applying relevant VAT Articles and Executive Regulations to your scenario." },
            { phase: "Advisory", desc: "Providing a formal technical opinion or strategy document." },
            { phase: "Implementation", desc: "Assisting in restructuring contracts or processes to align with advice." },
            { phase: "Support", desc: "Ongoing ad-hoc support for day-to-day technical VAT queries." }
        ],
        faq: [
            { q: "How is this different from VAT Filing?", a: "Filing is a compliance process. Consultancy is an advisory process to solve complex tax problems and optimize structures." },
            { q: "Do I need consultancy for a small business?", a: "If you have international clients, import/export goods, or deal in real estate, professional advice is crucial regardless of size." },
            { q: "Can you get a ruling from the FTA?", a: "Yes, we can draft and submit a request for an official Clarification to the FTA on your behalf." }
        ]
    },
    "goaml-compliance": {
        category: "other",
        title: "GoAML Compliance Services",
        subtitle: "Combating Financial Crime with Robust Reporting",
        description: "The UAE utilizes the 'goAML' system to prevent money laundering and terrorism financing. Compliance is mandatory for Designated Non-Financial Businesses and Professions (DNFBPs) such as Real Estate Agents, Dealers in Precious Metals, Auditors, and Corporate Service Providers. We assist you in registering on the portal, setting up your compliance framework, and filing necessary reports to avoid hefty fines.",
        context: "Failing to register for goAML or not reporting suspicious transactions (STRs) can result in fines starting from AED 50,000. Our service ensures that your AML policy is sound, your staff is trained, and your reporting is timely and accurate.",
        scope: [
            "GoAML Portal Registration",
            "Development of AML/CFT Policy & Procedures",
            "Appointment of AML Compliance Officer",
            "Filing Suspicious Transaction Reports (STRs)",
            "Filing Suspicious Activity Reports (SARs)",
            "Annual AML Risk Assessment Report",
            "Staff Training on AML Red Flags",
            "Mock AML Inspections"
        ],
        methodology: [
            { phase: "Registration", desc: "Completing the pre-registration and full registration on the Ministry of Economy and goAML portals." },
            { phase: "Policy Creation", desc: "Drafting a customized AML policy manual tailored to your industry." },
            { phase: "Risk Profiling", desc: "Conducting an Enterprise-Wide Risk Assessment (EWRA)." },
            { phase: "Reporting", desc: "Assisting the Compliance Officer in identifying and filing STRs/SARs." },
            { phase: "Audit", desc: "Independent audit of your AML framework to ensure effectiveness." }
        ],
        faq: [
            { q: "Who needs to register for goAML?", a: "All DNFBPs (Real Estate, Gold Dealers, Auditors, Corporate Service Providers) and Financial Institutions." },
            { q: "What is an STR?", a: "A Suspicious Transaction Report, which must be filed if you have reasonable grounds to suspect money laundering." },
            { q: "What happens if I don't comply?", a: "Penalties for non-compliance are severe, ranging from heavy fines to suspension of your trade license." }
        ]
    },
    "kyc-due-diligence": {
        category: "other",
        title: "Manage KYC & Due Diligence",
        subtitle: "Know Your Customer: The First Line of Defense",
        description: "Know Your Customer (KYC) and Customer Due Diligence (CDD) are foundational elements of any compliance framework. We provide managed services to verify the identity of your clients, assess their risk profiles, and screen them against global sanctions lists. This protects your business from being used for illicit activities and ensures compliance with UAE Central Bank and Ministry of Economy regulations.",
        context: "In a global hub like Dubai, dealing with international clients requires rigorous screening. Our solution involves checking Ultimate Beneficial Owners (UBOs), Politically Exposed Persons (PEPs), and adverse media to give you a clear picture of who you are doing business with.",
        scope: [
            "Customer Identity Verification (KYC)",
            "Ultimate Beneficial Owner (UBO) Identification",
            "Sanctions & PEP Screening",
            "Enhanced Due Diligence (EDD) for High-Risk Clients",
            "On-going Monitoring & Periodic Reviews",
            "KYC Risk Assessment & Profiling",
            "Remediation of Legacy Client Files",
            "Third-Party Vendor Due Diligence"
        ],
        methodology: [
            { phase: "Collection", desc: "Gathering ID documents (Passport, Emirates ID) and corporate papers." },
            { phase: "Verification", desc: "Validating documents and identifying the actual UBOs." },
            { phase: "Screening", desc: "Running names against global watchlists (UN, OFAC, EU) and PEP databases." },
            { phase: "Risk Rating", desc: "Assigning a risk score (Low, Medium, High) to determining the level of monitoring." },
            { phase: "Approval", desc: "Compliance Officer review and sign-off for client onboarding." }
        ],
        faq: [
            { q: "Why is KYC important?", a: "It prevents identity theft, financial fraud, and money laundering, safeguarding your business reputation." },
            { q: "What is Enhanced Due Diligence (EDD)?", a: "A deeper investigation required for high-risk customers, involving source of funds verification and senior management approval." },
            { q: "Do I need to check UBOs?", a: "Yes, identifying the physical individual who ultimately owns or controls the company is a mandatory regulatory requirement." }
        ]
    },
    "business-setup": {
        category: "other",
        title: "Business Setup Services",
        subtitle: "Launch Your Business in the UAE with Confidence",
        description: "Setting up a business in the UAE requires navigating a choice of jurisdictions: Mainland, Free Zone, or Offshore. Each offering distinct advantages in terms of ownership, scope of activity, and tax benefits. We provide end-to-end support, from selecting the right legal structure to obtaining trade licenses and visa processing, ensuring a seamless entry into the market.",
        context: "The UAE offers over 40 Free Zones and a competitive Mainland environment. Recent changes allow 100% foreign ownership in many mainland sectors. Choosing the wrong jurisdiction can limit your business scope or increase costs. We analyze your business model to recommend the most optimal path.",
        scope: [
            "Mainland Company Formation (DED)",
            "Free Zone Company Setup (DMCC, IFZA, JAFZA, etc.)",
            "Offshore Company Registration",
            "Trade License Issuance & Renewal",
            "Visa Processing & Immigration Support",
            "Corporate Bank Account Opening Assistance",
            "PRO Services & Government Liaison",
            "Office Space Solutions (Virtual/Physical)"
        ],
        methodology: [
            { phase: "Consultation", desc: "Understanding your business activity and target market to select the jurisdiction." },
            { phase: "Structure", desc: "Defining the legal structure (LLC, Branch, Sole Establishment) and ownership." },
            { phase: "Approvals", desc: "Reserving trade names and obtaining initial approvals from authorities." },
            { phase: "Licensing", desc: "Submitting legal documents (MOA/LSA) and paying fees to issue the license." },
            { phase: "Onboarding", desc: "Processing employment visas and assisting with corporate bank account setup." }
        ],
        faq: [
            { q: "What is the difference between Mainland and Free Zone?", a: "Mainland companies can trade directly within the local UAE market. Free Zone companies are generally restricted to trading within the zone or internationally." },
            { q: "Do I need a local sponsor?", a: "For most mainland activities, 100% foreign ownership is now permitted. However, some specific sectors may still require a local partner." },
            { q: "How long does setup take?", a: "It varies by jurisdiction, but typically takes anywhere from 3 to 10 working days upon submission of all documents." }
        ]
    },
    "compliance-advisory": {
        category: "other",
        title: "Compliance Advisory",
        subtitle: "Navigating the Regulatory Landscape",
        description: "The UAE's regulatory environment is evolving rapidly with new laws on Economic Substance (ESR), Ultimate Beneficial Ownership (UBO), and Consumer Protection. Our Compliance Advisory services help businesses stay ahead of these changes. We conduct gap analyses, draft internal policies, and provide ongoing monitoring to ensure your operations remain within the legal framework.",
        context: "Non-compliance can lead to severe fines, license suspension, or reputational damage. From data protection (GDPR/PDPL) to specific industry regulations (DHA, KHDA, Central Bank), we act as your regulatory compass.",
        scope: [
            "Regulatory Gap Analysis & Health Checks",
            "Economic Substance Regulations (ESR) Filing",
            "Ultimate Beneficial Owner (UBO) Declaration",
            "Anti-Bribery & Corruption (ABC) Policies",
            "Data Protection & Privacy Compliance",
            "Drafting Standard Operating Procedures (SOPs)",
            "Whistleblowing Policy Implementation",
            "Regulatory Reporting & Disclosures"
        ],
        methodology: [
            { phase: "Assessment", desc: "Reviewing current policies against the latest federal and local laws." },
            { phase: "Design", desc: "Drafting compliant frameworks, policies, and manuals tailored to your operations." },
            { phase: "Training", desc: "Educating staff and management on their compliance obligations." },
            { phase: "Implementation", desc: "Rolling out new procedures and integrating them into daily workflows." },
            { phase: "Monitoring", desc: "Periodic reviews to ensure sustained compliance and readiness for inspections." }
        ],
        faq: [
            { q: "What is ESR?", a: "Economic Substance Regulations require UAE entities undertaking specific activities to demonstrate adequate economic presence in the country." },
            { q: "What is UBO declaration?", a: "It is a mandatory requirement to disclose the ultimate individuals who own or control the company to the registrar." },
            { q: "How often do regulations change?", a: "The UAE frequently updates laws to align with global standards. We provide continuous updates to keep you compliant." }
        ]
    },
    "corporate-finance": {
        category: "other",
        title: "Corporate Finance Services",
        subtitle: "Driving Value Through Financial Strategy",
        description: "Whether you are looking to raise capital, acquire a competitor, or value your business, our Corporate Finance team provides expert guidance. We specialize in Mergers & Acquisitions (M&A), financial modeling, and business valuation. We help stakeholders make informed decisions by providing rigorous financial analysis and strategic advice tailored to the UAE market.",
        context: "Accurate valuation and sound financial structuring are critical for growth and exit strategies. We use globally recognized methodologies (DCF, Multiples) adapted for local market nuances to provide realistic and defensible financial insights.",
        scope: [
            "Business Valuation & Financial Modeling",
            "Mergers & Acquisitions (M&A) Advisory",
            "Due Diligence (Buy-side & Sell-side)",
            "Capital Raising (Debt & Equity)",
            "Feasibility Studies for New Projects",
            "Financial Restructuring & Turnaround",
            "IPO Readiness & Advisory",
            "Exit Strategy Planning"
        ],
        methodology: [
            { phase: "Strategy", desc: "Defining the objectives of the transaction (e.g., expansion, exit, funding)." },
            { phase: "Analysis", desc: "Building detailed financial models and conducting valuation assessments." },
            { phase: "Structuring", desc: "Designing the deal structure to optimize value and tax efficiency." },
            { phase: "Execution", desc: "Managing the transaction process, including due diligence and negotiations." },
            { phase: "Closing", desc: "Finalizing agreements and assisting with post-transaction integration." }
        ],
        faq: [
            { q: "How do you value a business?", a: "We use a combination of approaches including Discounted Cash Flow (DCF), Comparable Company Analysis, and Precedent Transactions." },
            { q: "Can you help raise funding?", a: "Yes, we assist in preparing investment memos and connecting businesses with banks, private equity, or venture capital." },
            { q: "What is Financial Due Diligence?", a: "It is a detailed investigation of a target company's financial health to confirm facts and identify risks before a purchase." }
        ]
    },
    "hr-services": {
        category: "other",
        title: "Human Resource Services",
        subtitle: "Streamlined Payroll & Recruitment Solutions",
        description: "Our HR Services allow businesses to outsource complex and time-consuming administrative tasks. From ensuring compliance with the UAE's Wage Protection System (WPS) to recruiting top talent and managing visas, we act as your extended HR department. This enables you to focus on strategy and culture while we handle the operational details and legal compliance.",
        context: "The UAE labor law involves specific requirements regarding contracts, gratuity, and timely salary payments via WPS. Managing this in-house can be resource-intensive. Our outsourcing solutions reduce overhead costs and mitigate the risk of labor disputes or penalties.",
        scope: [
            "Payroll Processing & WPS Compliance",
            "Recruitment & Talent Acquisition",
            "HR Policy & Employment Contract Drafting",
            "Visa & PRO Services (Onboarding/Offboarding)",
            "End of Service Benefit (Gratuity) Calculation",
            "Employee Database Management",
            "Medical Insurance Coordination",
            "Labor Law Adherence Audits"
        ],
        methodology: [
            { phase: "Setup", desc: "Configuring your employee database and payroll structure in our systems." },
            { phase: "Recruitment", desc: "Sourcing, screening, and interviewing candidates to fit your requirements." },
            { phase: "Onboarding", desc: "Handling visa processing, labor contracts, and Emirates ID issuance." },
            { phase: "Processing", desc: "Monthly management of payroll, leaves, and expenses via WPS." },
            { phase: "Compliance", desc: "Regular updates to ensure all HR practices align with new labor decrees." }
        ],
        faq: [
            { q: "What is WPS?", a: "The Wage Protection System is an electronic salary transfer system that guarantees payment of wages via registered agents." },
            { q: "Can you handle visas?", a: "Yes, our PRO team manages the entire visa lifecycle for employees and their dependents." },
            { q: "Do you offer recruitment?", a: "Absolutely. We specialize in finding skilled talent for finance, admin, and technical roles." }
        ]
    },
    "trade-finance": {
        category: "other",
        title: "Trade Finance Services",
        subtitle: "Securing Your Global & Local Transactions",
        description: "In international trade, trust and liquidity are paramount. Our Trade Finance services act as a bridge between buyers and sellers, mitigating payment risks and optimizing working capital. We assist in structuring and securing various financial instruments like Letters of Credit (LCs) and Bank Guarantees to facilitate smooth trade flows.",
        context: "Whether you are an importer needing to assure a supplier of payment, or an exporter needing to secure receivables, the right trade finance instrument is key. We leverage our banking relationships to secure competitive rates and efficient processing for your trade needs.",
        scope: [
            "Letters of Credit (LC) - Import & Export",
            "Bank Guarantees (Tender, Performance, Advance Payment)",
            "Standby Letters of Credit (SBLC)",
            "Trust Receipts (TR) & Bill Discounting",
            "Documentary Collections (CAD/DA/DP)",
            "invoice Factoring & Discounting",
            "Supply Chain Finance Solutions",
            "Liaising with Banks for Credit Facilities"
        ],
        methodology: [
            { phase: "Consultation", desc: "Assessing your trade cycle and funding requirements." },
            { phase: "Structuring", desc: "Advising on the most appropriate instrument (e.g., LC vs. SBLC)." },
            { phase: "Application", desc: "Preparing and submitting compliant documentation to banks." },
            { phase: "Liaison", desc: "Coordinating with issuing and advising banks to expedite issuance." },
            { phase: "Settlement", desc: "Assisting with proper document presentation for smooth payment release." }
        ],
        faq: [
            { q: "What is a Letter of Credit?", a: "A bank's guarantee that a buyer's payment to a seller will be received on time and for the correct amount." },
            { q: "What is a Performance Bond?", a: "A guarantee issued to a client to prevent the contractor from defaulting on their performance obligations." },
            { q: "Do you lend money directly?", a: "No, we are consultants who structure deals and facilitate facilities through our network of partner banks." }
        ]
    },
    "trademark-registration": {
        category: "other",
        title: "Trademark Registration",
        subtitle: "Protect Your Brand Identity & IP Assets",
        description: "Your brand is one of your most valuable assets. Registering your trademark in the UAE grants you legal ownership and protection against counterfeiting or abuse. We manage the entire registration process with the Ministry of Economy, from validity search to final certification, ensuring your intellectual property is secure.",
        context: "The UAE follows strict protocols for IP protection. Registration is valid for 10 years and renewable. Without registration, you have limited legal recourse if a competitor copies your logo or brand name. We ensure your application adheres to the 'Nice Classification' of goods and services.",
        scope: [
            "Trademark Availability Search",
            "Filing Applications with Ministry of Economy",
            "Trademark Class Selection (Nice Classification)",
            "Handling Objections & Oppositions",
            "Trademark Registration Certification",
            "Brand Renewal Services",
            "Copyright Registration",
            "Intellectual Property Advisory"
        ],
        methodology: [
            { phase: "Search", desc: "Conducting a comprehensive search to ensure your mark is unique and available." },
            { phase: "Filing", desc: "Submitting the application with all required documents to the Ministry." },
            { phase: "Examination", desc: "The Ministry reviews the application for compliance with the law." },
            { phase: "Publication", desc: "Publishing the mark in the Official Gazette and local newspapers for opposition." },
            { phase: "Registration", desc: "Issuance of the final certificate after the opposition period ends." }
        ],
        faq: [
            { q: "How long does it take?", a: "The entire process typically takes 3 to 4 months, including the mandatory 30-day publication period." },
            { q: "Is the registration global?", a: "No, trademark protection is territorial. A UAE registration protects you only within the UAE." },
            { q: "What are 'Classes'?", a: "Trademarks are categorized into 45 classes of goods and services. You must register in the class relevant to your business." }
        ]
    },
    "digital-growth": {
        category: "other",
        title: "Digital Growth Performance",
        subtitle: "Data-Driven Marketing for Measurable ROI",
        description: "In the digital age, visibility equates to viability. Our Digital Growth services rely on data, not guesswork. We implement high-performance marketing strategies inclusive of SEO, PPC, and Social Media to drive qualified traffic and convert leads. We focus on measurable outcomes - Sales, Leads, and ROI - rather than just vanity metrics like 'likes'.",
        context: "The UAE digital landscape is highly competitive. To stand out, businesses need a strategy that targets the right audience at the right time. We use advanced analytics, A/B testing, and conversion rate optimization (CRO) to ensure every dirham of your marketing budget works hard for you.",
        scope: [
            "Search Engine Optimization (SEO)",
            "Pay-Per-Click Advertising (Google Ads)",
            "Social Media Performance Marketing",
            "Content Strategy & Copywriting",
            "Conversion Rate Optimization (CRO)",
            "Lead Generation Funnels",
            "Email Marketing Automation",
            "Web Analytics & Reporting"
        ],
        methodology: [
            { phase: "Audit", desc: "Analyzing your current digital footprint and identifying growth gaps." },
            { phase: "Strategy", desc: "Developing a roadmap focused on your specific KPIs (e.g., CPA, ROAS)." },
            { phase: "Execution", desc: "Launching campaigns and optimizing on-page SEO factors." },
            { phase: "Optimization", desc: "Continuous testing and tweaking based on real-time performance data." },
            { phase: "Reporting", desc: "Monthly transparent reports showing traffic, leads, and revenue generated." }
        ],
        faq: [
            { q: "What is Performance Marketing?", a: "It is a comprehensive term for online marketing programs where you pay only when a specific action (sale, lead, click) occurs." },
            { q: "How long for SEO results?", a: "SEO is a long-term strategy. Significant results typically take 3 to 6 months of consistent work." },
            { q: "Do you handle social media content?", a: "Yes, we create and manage engaging content tailored to platforms like LinkedIn, Instagram, and Facebook." }
        ]
    },
    // Default fallback for other services to ensure pages work immediately
    "default": {
        category: "other",
        title: "Professional Consultancy Services",
        subtitle: "Expert guidance customized for your business success.",
        description: "We provide specialized consultancy services designed to meet the unique challenges of the UAE market. Our team delivers actionable insights and compliant solutions.",
        context: "In the rapidly evolving UAE regulatory environment, professional guidance is essential to mitigate risk and seize growth opportunities.",
        scope: [
            "Regulatory Compliance Assessment",
            "Strategic Planning & Execution",
            "Process Optimization",
            "Documentation & Filing Support",
            "Liaison with Government Authorities",
            "Performance Monitoring & Reporting"
        ],
        methodology: [
            { phase: "Consultation", desc: "In-depth discussion to understand your specific needs." },
            { phase: "Proposal", desc: "Tailored solution outlining scope, timeline, and deliverables." },
            { phase: "Execution", desc: "Professional implementation of the agreed strategy." },
            { phase: "Review", desc: "Final assessment to ensure objectives are met." }
        ],
        faq: [
            { q: "How do I get started?", a: "Book a consultation with our team to discuss your specific requirements." },
            { q: "What documents are required?", a: "Requirements vary by service. Our team will provide a detailed checklist upon engagement." }
        ]
    }
};

export const getServiceContent = (slug: string) => {
    return serviceContent[slug] || { ...serviceContent["default"], title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + " Services" };
};
