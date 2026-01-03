import {
    Lightbulb,
    FileSignature,
    Package,
    ArrowLeftRight,
    FileText,
    CreditCard,
    BookOpen,
    Wine,
    History,
    MapPin,
    Calendar,
    Coins,
    Gavel,
    TrendingUp,
    RefreshCcw,
    Map,
    Plane
} from "lucide-react";

export const vatGuideData = [
    {
        title: "VAT Basics",
        description: "Learn how the Value Added Tax (VAT) works and its impact on businesses in the UAE.",
        icon: Lightbulb,
        slug: "vat-basics",
        content: `
            <p class="lead">The introduction of VAT has significantly changed business accounting operations in the UAE. This guide explains the basics of VAT and its impact on businesses and consumers.</p>

            <h2>Understanding Value Added Tax</h2>
            <p>Tax can be defined as a fee charged by the government on goods, services, income and other transactions in order to finance public services and government expenditure. There are two major tax categories:</p>
            <ul>
                <li><strong>Direct Tax:</strong> Paid directly to the government by the taxpayer.</li>
                <li><strong>Indirect Tax:</strong> Paid to the government by an intermediary, who collects the tax from the taxpayer on behalf of the government.</li>
            </ul>
            <p>VAT is an indirect tax levied on the consumption or use of goods and services. It is charged at each step of the supply process. The end consumers bear the costs of VAT while registered businesses collect and account for VAT, acting as tax collectors on behalf of the government.</p>

            <h2>How does VAT work?</h2>
            <p>Let’s consider the following example to see how the VAT system works:</p>
            <ol>
                <li><strong>Manufacturer to Wholesaler:</strong> A manufacturer sells a TV to a wholesaler for AED 1000. They collect VAT of 5% (AED 50) and pay it to the government. Wholesaler pays AED 1050.</li>
                <li><strong>Wholesaler to Retailer:</strong> The wholesaler sells it for AED 2000. They collect VAT of 5% (AED 100) from the retailer. The wholesaler pays the government AED 50 (AED 100 collected minus AED 50 paid earlier). Retailer pays AED 2100.</li>
                <li><strong>Retailer to Customer:</strong> The retailer sells it for AED 3000. They collect VAT of 5% (AED 150). They pay the government AED 50 (AED 150 collected minus AED 100 paid earlier).</li>
                <li><strong>End Result:</strong> The customer pays AED 3150. The government receives a total of AED 150 (5% of the final price).</li>
            </ol>
            <p>A value added tax is applied at every stage of the sales process, and the registered business receives a refund (or tax credit) on the VAT paid at the previous step. The Federal Tax Authority (FTA) has specified a fixed VAT rate of 5% for the sale of goods and services in the UAE.</p>

            <h2>Why is VAT being introduced?</h2>
            <p>The UAE delivers excellent public services, including healthcare, education, public transportation, and social services. The introduction of a VAT allows the government to diversify their sources of income and continue to ensure a good standard of living for UAE residents.</p>

            <h2>Registering for VAT</h2>
            <p>Registration may be mandatory or voluntary, depending on the business revenues generated.</p>
            <ul>
                <li><strong>Mandatory Registration:</strong> A business must register if the total value of their taxable sales and imports exceeds AED 375,000 for the previous 12 months.</li>
                <li><strong>Voluntary Registration:</strong> A business can voluntarily register if the total value of their taxable sales and imports exceeds AED 187,500.</li>
            </ul>

            <h2>VAT Rates in UAE</h2>
            <p>The standard VAT rate is <strong>5%</strong> for most goods and services. However, there are exceptions:</p>
            <ul>
                <li><strong>0% VAT (Zero-rated):</strong> International transportation, exports outside GCC, newly constructed residential properties (first 3 years), certain education and healthcare services.</li>
                <li><strong>VAT Exempt:</strong> Residential properties (resale/rent), public transport, undeveloped land, life insurance, and certain financial services.</li>
            </ul>
        `
    },
    {
        title: "VAT Registration",
        description: "Learn about the eligibility criteria, threshold limits, and processes involved in VAT Registration.",
        icon: FileSignature,
        slug: "vat-registration",
        content: `
            <p class="lead">Business owners in the UAE must register for VAT if their taxable supplies and imports exceed the mandatory threshold. This guide explains the eligibility and process.</p>

            <h2>Eligibility for Registration</h2>
            <p>The thresholds for businesses to register for VAT are based on the value of their taxable supplies, which include standard-rated supplies, zero-rated supplies, reverse charges received, and imported goods.</p>
            
            <h3>1. Mandatory Registration</h3>
            <p>A business <strong>must</strong> register for VAT if the total value of its taxable supplies and imports within the UAE exceeds the mandatory registration threshold of <strong>AED 375,000</strong>, either during the previous 12 months or within the upcoming 30 days.</p>

            <h3>2. Voluntary Registration</h3>
            <p>A business <strong>can voluntarily</strong> register for VAT if the total value of its taxable supplies and imports within the UAE exceeds the voluntary registration threshold of <strong>AED 187,500</strong>, either during the previous 12 months or within the upcoming 30 days. Startups may also register if their expenses exceed this threshold.</p>

            <h3>3. Non-resident Registration</h3>
            <p>A non-resident doing taxable business in the UAE needs to register for VAT regardless of the above-mentioned thresholds.</p>

            <h2>How to Register for VAT?</h2>
            <p>Businesses can register businesses through the <strong>EmaraTax</strong> portal provided by the Federal Tax Authority (FTA). The process typically involves:</p>
            <ol>
                <li>Creating an account on the EmaraTax portal.</li>
                <li>Filling out the VAT registration form.</li>
                <li>Uploading supporting documents (Trade License, Passport copies, Emirates ID, Bank Application letter, etc.).</li>
                <li>Submitting the application for FTA approval.</li>
            </ol>

            <h2>VAT Group Registration</h2>
            <p>Two or more persons conducting business may apply for Tax Registration as a Tax Group if:</p>
            <ul>
                <li>Each person has a place of establishment or fixed establishment in the State.</li>
                <li>The relevant persons are related parties.</li>
                <li>One or more persons conducting business in a partnership control the others.</li>
            </ul>
        `
    },
    {
        title: "Supply under VAT",
        description: "Understand the different types of supplies (Standard, Zero-rated, Exempt) under the VAT regime.",
        icon: Package,
        slug: "supply-under-vat",
        content: `
            <p class="lead">A "supply" under VAT refers to goods or services exchanged for consideration. Understanding the type of supply is crucial for compliance.</p>

            <h2>Components of Supply</h2>
            <p>A supply under VAT has three attributes that are used to calculate the tax owed for the transaction:</p>
            <ul>
                <li><strong>Place of Supply:</strong> Determines whether the supply is made in or outside UAE.</li>
                <li><strong>Value of Supply:</strong> Determines the taxable amount.</li>
                <li><strong>Date of Supply:</strong> Determines the VAT period for reporting.</li>
            </ul>

            <h2>Types of Supply</h2>
            
            <h3>1. Standard Rated Supply (5%)</h3>
            <p>The standard VAT rate of 5% applies to most goods and services in the UAE, including sale and lease of commercial property, hotel services, maintenance, and retail goods.</p>

            <h3>2. Zero-Rated Supply (0%)</h3>
            <p>Supplies taxed at 0%. You can reclaim input VAT on these. Examples include:</p>
            <ul>
                <li>Exports of goods and services outside the GCC.</li>
                <li>International transportation.</li>
                <li>Certain healthcare and education services.</li>
                <li>Newly constructed residential properties (first sale within 3 years).</li>
            </ul>
            <p><em>Note: Even though the rate is 0%, these must be reported in your VAT return.</em></p>

            <h3>3. VAT Exempt Supply</h3>
            <p>Supplies on which no VAT is charged, and importantly, <strong>input VAT cannot be recovered</strong>. Examples include:</p>
            <ul>
                <li>Residential properties (resale or lease).</li>
                <li>Local passenger transport (metro, buses, taxis).</li>
                <li>Bare land.</li>
                <li>Certain financial services.</li>
            </ul>

            <h3>4. Out-of-Scope Supply</h3>
            <p>Transactions that do not fall within the scope of UAE VAT, such as sales where goods do not enter the UAE (merchant trading).</p>
        `
    },
    {
        title: "Reverse Charge Mechanism",
        description: "Learn what the reverse charge mechanism is, why it's important, and how it applies to imports.",
        icon: ArrowLeftRight,
        slug: "reverse-charge",
        content: `
            <p class="lead">The Reverse Charge Mechanism (RCM) puts the onus of reporting VAT on the buyer rather than the supplier.</p>

            <h2>What is Reverse Charge?</h2>
            <p>In a standard transaction, the supplier collects VAT from the buyer and pays it to the government. Under the <strong>Reverse Charge Mechanism</strong>, the <strong>buyer</strong> is responsible for calculating and reporting the VAT directly to the government.</p>
            <p>This is primarily used for cross-border transactions to avoid the need for non-resident suppliers to register for VAT in the UAE.</p>

            <h2>When does RCM apply?</h2>
            <p>RCM typically applies in the following scenarios:</p>
            <ul>
                <li><strong>Import of Goods:</strong> When a registered business imports goods into the UAE.</li>
                <li><strong>Import of Services:</strong> When a registered business purchases services from a non-resident supplier.</li>
                <li><strong>Purchase of Hydrocarbons:</strong> Specific rules apply to the purchase of crude oil and natural gas for resale.</li>
            </ul>

            <h2>How to account for RCM?</h2>
            <p>The buyer must:</p>
            <ol>
                <li>Calculate the VAT amount (5%) on the value of the import.</li>
                <li>Declare this amount as <strong>Output Tax</strong> in the VAT return (Box 3 or 6).</li>
                <li>Claim the same amount as <strong>Input Tax</strong> (Box 10), assuming the purchase is for taxable business purposes.</li>
            </ol>
            <p>The net cash effect is zero, but it must be reported for compliance.</p>
        `
    },
    {
        title: "VAT Returns",
        description: "A comprehensive guide on how and when to file your VAT returns to stay compliant.",
        icon: FileText,
        slug: "vat-returns",
        content: `
            <p class="lead">Filing VAT returns incorrectly can lead to significant penalties. This guide breaks down the key sections of the VAT 201 form.</p>

            <h2>Understanding the VAT Return Form (VAT 201)</h2>
            <p>The form is divided into several sections capturing sales, purchases, and net totals.</p>

            <h3>Standard Rated Supplies (Box 1)</h3>
            <p>Include net value and VAT amount for proper supplies of goods/services at 5% in Dubai, Abu Dhabi, and Sharjah (and other emirates respectively).</p>

            <h3>Zero Rated Supplies (Box 4 & 5)</h3>
            <p>Declare the value of your zero-rated exports and local zero-rated supplies here. No VAT is due, but reporting is mandatory.</p>

            <h3>Reverse Charge (Box 3, 6, 7)</h3>
            <p>Declare imports of goods and services subject to RCM here. This populates your Output Tax liability for these items.</p>

            <h3>Input VAT Recovery (Box 8, 9, 10)</h3>
            <ul>
                <li><strong>Standard Rated Expenses (Box 8):</strong> VAT paid on local business expenses.</li>
                <li><strong>Imports (Box 9):</strong> VAT paid at customs (if linked to TRN).</li>
                <li><strong>Reverse Charge Recovery (Box 10):</strong> Recovering the VAT declared in Boxes 3, 6, and 7.</li>
            </ul>

            <h2>Net VAT Due</h2>
            <p>The form automatically calculates your position:</p>
            <ul>
                <li><strong>Box 12:</strong> Total Output Tax (Tax you collected + RCM liability).</li>
                <li><strong>Box 13:</strong> Total Recoverable Tax (Tax you paid).</li>
                <li><strong>Box 14 (Payable Tax):</strong> If Output > Input, you owe this amount to FTA.</li>
                <li><strong>Refund:</strong> If Input > Output, you can request a refund or carry it forward.</li>
            </ul>

            <h2>Deadlines</h2>
            <p>VAT returns are typically filed quarterly or monthly (as assigned by FTA). The deadline is the <strong>28th day</strong> of the month following the end of the VAT period.</p>
        `
    },
    {
        title: "VAT Payments",
        description: "Learn how to make VAT payments to the Federal Tax Authority (FTA) correctly and on time.",
        icon: CreditCard,
        slug: "vat-payments",
        content: `
            <p class="lead">Taxable businesses must ensuring their VAT liability is paid to the Federal Tax Authority (FTA) by the due date to avoid penalties.</p>

            <h2>Payment Methods</h2>
            <p>You can pay VAT using any of the following methods through the FTA portal:</p>
            <ul>
                <li><strong>e-Dirham or Credit Card:</strong> Visa and MasterCard are accepted. A transaction fee (approx 2-3%) applies for credit cards.</li>
                <li><strong>eDebit:</strong> Direct payment from your bank account (retail or corporate). Transaction fee is AED 10.</li>
                <li><strong>GIBAN (Generated International Bank Account Number):</strong> A unique IBAN provided by FTA for your account. You can transfer funds directly to this IBAN from any bank.</li>
            </ul>

            <h2>Payment Process</h2>
            <ol>
                <li>Log in to the <strong>EmaraTax</strong> portal.</li>
                <li>Navigate to the <strong>My Payments</strong> tab.</li>
                <li>Select the liability you wish to pay (or enter the amount).</li>
                <li>Choose your payment method and complete the transaction.</li>
            </ol>

            <p><em>Note: Ensure payments are made well in advance of the deadline, as bank transfers can take time to clear.</em></p>
        `
    },
    {
        title: "VAT Records & Books",
        description: "Learn about the mandatory accounting records and books you must maintain under VAT laws.",
        icon: BookOpen,
        slug: "vat-records",
        content: `
            <p class="lead">Maintaining accurate records is not just good practice—it's a legal requirement under UAE VAT Law.</p>

            <h2>What records must be maintained?</h2>
            <p>A taxpayer should maintain the following records and books of accounts:</p>
            <ul>
                <li><strong>Sales & Purchase Records:</strong> Tax invoices, credit notes, debit notes.</li>
                <li><strong>Import/Export Records:</strong> Customs declarations and shipping documents.</li>
                <li><strong>General Ledgers:</strong> Records of all taxable supplies made and received.</li>
                <li><strong>VAT Accounts:</strong> Records showing VAT due on supplies, VAT recoverable on purchases, and adjustments.</li>
            </ul>

            <h2>How long should records be kept?</h2>
            <ul>
                <li><strong>General Business Records:</strong> Must be kept for at least <strong>5 years</strong> from the end of the tax period.</li>
                <li><strong>Real Estate Records:</strong> Must be kept for at least <strong>15 years</strong>.</li>
            </ul>

            <h2>Where to keep records?</h2>
            <p>Records can be kept in physical or electronic format, but they must be:
            <ul>
                <li>Readable and accessible.</li>
                <li>Available for the FTA to review upon request (e.g., during a Tax Audit).</li>
                <li>Kept within the UAE (unless cloud storage meets specific FTA conditions).</li>
            </ul>
        `
    },
    {
        title: "Excise Tax",
        description: "Understand the specific tax levied on goods harmful to health and how it differs from VAT.",
        icon: Wine,
        slug: "excise-tax",
        content: `
            <p class="lead">Excise tax is an indirect tax levied on specific goods that are typically harmful to human health or the environment.</p>

            <h2>What goods are subject to Excise Tax?</h2>
            <p>The following goods are subject to Excise Tax in the UAE:</p>
            <ul>
                <li><strong>Carbonated Drinks:</strong> 50% tax. (Includes aerated beverages, except unflavored aerated water).</li>
                <li><strong>Energy Drinks:</strong> 100% tax. (Bevarages containing stimulants like caffeine, taurine, ginseng).</li>
                <li><strong>Tobacco & Tobacco Products:</strong> 100% tax.</li>
                <li><strong>Electronic Smoking Devices & Liquids:</strong> 100% tax.</li>
                <li><strong>Sweetened Drinks:</strong> 50% tax. (Beverages with added sugar/sweeteners).</li>
            </ul>

            <h2>Who must register for Excise Tax?</h2>
            <p>You must register if you are involved in:</p>
            <ul>
                <li>Importing excise goods into the UAE.</li>
                <li>Producing excise goods in the UAE.</li>
                <li>Stockpiling excise goods in the UAE for business purposes.</li>
                <li>Releasing excise goods from a Designated Zone.</li>
            </ul>
        `
    },
    {
        title: "Excise Tax Registration",
        description: "Learn how you can register for Excise Tax and determine your tax liability.",
        icon: FileSignature,
        slug: "excise-tax-registration",
        content: `
            <p class="lead">Unlike VAT, there is no registration threshold for Excise Tax. If you deal in excise goods, you must register.</p>

            <h2>Registration Timeline</h2>
            <p>You must register within <strong>30 days</strong> of the intention to conduct activities involving excise goods. You cannot engage in any transaction involving excise goods until registered.</p>

            <h2>Exceptions</h2>
            <p>A person who does not import excise goods regularly (e.g., not more than once in 6 months) may not need to register, but will still be liable to pay the tax due on imports.</p>

            <h2>Documents Required</h2>
            <ul>
                <li>Trade License.</li>
                <li>Passport & Emirates ID of the authorized signatory.</li>
                <li>Details of excise goods (Customs codes, product descriptions).</li>
                <li>Customs Registration details.</li>
            </ul>

            <h2>How to Register?</h2>
            <p>Registration is done online via the <strong>EmaraTax</strong> portal. Once approved, you will receive a Tax Registration Number (TRN) specific to Excise Tax.</p>
        `
    },
    {
        title: "Transitional Rules",
        description: "Learn how to handle contracts and supplies that span across the implementation date of VAT.",
        icon: History,
        slug: "transitional-rules",
        content: `
            <p class="lead">Transitional rules apply when a contract or supply spans across the implementation date of VAT (or a change in VAT rate).</p>

            <h2>Supply of Goods/Services spanning VAT Implementation</h2>
            <p>If a supply takes place after the implementation of VAT, tax must be charged even if payment was received before the implementation date.</p>

            <h3>Key Scenarios:</h3>
            <ul>
                <li><strong>Payment before, Supply after:</strong> If you received payment in 2017 but supplied the goods in 2018, VAT applies. You must issue an additional invoice for the VAT amount.</li>
                <li><strong>Continuous Supplies:</strong> For services supplied continuously (e.g., annual maintenance contracts), the portion of the service performed after the VAT implementation date is taxable.</li>
            </ul>

            <h2>Contracts</h2>
            <p>If a contract was signed before VAT implementation but the supply continues after, the contract is treated as inclusive of VAT unless legally agreed otherwise. This means the agreed price typically includes VAT, reducing the supplier's net revenue unless they can recover it from the customer.</p>
        `
    },
    {
        title: "Place of Supply",
        description: "Learn how the 'Place of Supply' rules determine whether a transaction is subject to UAE VAT.",
        icon: MapPin,
        slug: "place-of-supply",
        content: `
            <p class="lead">The "Place of Supply" determines which jurisdiction has the right to tax a transaction. If the place of supply is the UAE, UAE VAT applies.</p>

            <h2>Place of Supply for Goods</h2>
            <ul>
                <li><strong>Domestic Supplies:</strong> If goods are located in the UAE when supplied to a customer in the UAE, the place of supply is the UAE.</li>
                <li><strong>Exports:</strong> If goods are exported (moved) from the UAE to outside the GCC, the place of supply is still the UAE, but it is valid for Zero-Rating (0% VAT).</li>
                <li><strong>Imports:</strong> The place of supply is the UAE if goods are imported into the country.</li>
            </ul>

            <h2>Place of Supply for Services</h2>
            <p>The general rule is that the place of supply is where the <strong>supplier</strong> has their place of residence. However, there are important exceptions:</p>
            <ul>
                <li><strong>Services to a Registered Business (B2B):</strong> If a non-resident supplies services to a UAE registered business, the place of supply is the UAE (Reverse Charge applies).</li>
                <li><strong>Real Estate Services:</strong> Place of supply is where the property is located.</li>
                <li><strong>Transport Services:</strong> Where the transport takes place.</li>
            </ul>
        `
    },
    {
        title: "Date of Supply",
        description: "Understand the tax point or 'Date of Supply' to determine the correct VAT period for reporting.",
        icon: Calendar,
        slug: "date-of-supply",
        content: `
            <p class="lead">The Date of Supply (or Tax Point) determines the VAT Return period in which you must declare the transaction.</p>

            <h2>General Rule</h2>
            <p>The Date of Supply is the <strong>earliest</strong> of the following three dates:</p>
            <ol>
                <li>The date goods were transferred or services completed.</li>
                <li>The date the Tax Invoice was issued.</li>
                <li>The date Payment was received (in part or full).</li>
            </ol>

            <h2>Continuous Supplies</h2>
            <p>For supplies involving periodic payments (e.g., rent, subscriptions), the Date of Supply is the earliest of:</p>
            <ul>
                <li>The date the invoice is issued.</li>
                <li>The date payment is due.</li>
                <li>The date payment is received.</li>
            </ul>
        `
    },
    {
        title: "Value of Supply",
        description: "Learn how to calculate the taxable value of a supply, including discounts and profit margins.",
        icon: Coins,
        slug: "value-of-supply",
        content: `
            <p class="lead">The Value of Supply is the amount on which VAT is calculated. It is typically the price paid by the customer, less the tax itself.</p>

            <h2>Monetary Consideration</h2>
            <p>If the supply is for money, the value is the total amount paid less the VAT. <br>
            <em>Formula: Value = Consideration / 1.05</em></p>

            <h2>Non-Monetary Consideration</h2>
            <p>If goods or services are exchanged for other goods/services (barter), the value of supply is the market value of the goods/services received.</p>

            <h2>Discounts</h2>
            <p>The value of supply can be reduced by discounts <strong>if</strong>:</p>
            <ul>
                <li>The discount is provided before or at the time of supply.</li>
                <li>The discount is clearly stated on the invoice.</li>
            </ul>

            <h2>Profit Margin Scheme</h2>
            <p>For second-hand goods, the value of supply is the difference between the selling price and purchase price (the profit margin), not the full selling price. This scheme requires FTA approval.</p>
        `
    },
    {
        title: "VAT Penalties",
        description: "An overview of the administrative penalties and fines for non-compliance with VAT regulations.",
        icon: Gavel,
        slug: "vat-penalties",
        content: `
            <p class="lead">Non-compliance with VAT laws can result in significant administrative penalties. It is crucial to file returns and pay taxes on time.</p>

            <h2>Fixed Penalties</h2>
            <ul>
                <li><strong>Late Registration:</strong> AED 20,000.</li>
                <li><strong>Late Filing of VAT Return:</strong> AED 1,000 for the first time, AED 2,000 for repetition within 24 months.</li>
                <li><strong>Late Payment of VAT:</strong>
                    <ul>
                        <li>2% of unpaid tax immediately.</li>
                        <li>4% after 7 days of deadline.</li>
                        <li>1% daily accumulation after 1 calendar month (max 300%).</li>
                    </ul>
                </li>
                <li><strong>Failure to display prices with VAT:</strong> AED 15,000.</li>
                <li><strong>Failure to issue a Tax Invoice:</strong> AED 5,000 per incidient.</li>
            </ul>

            <h2>Percentage-Based Penalties (Voluntary Disclosure)</h2>
            <p>If you discover an error and disclose it voluntarily:</p>
            <ul>
                <li><strong>Before FTA Audit Notification:</strong> 5% penalty on the difference.</li>
                <li><strong>After Audit Notification but before Audit start:</strong> 30% penalty.</li>
                <li><strong>During/After Audit:</strong> 50% penalty.</li>
            </ul>
        `
    },
    {
        title: "Input Credit & Refunds",
        description: "Learn about recovering VAT incurred on business expenses and the conditions for Input Tax Credit.",
        icon: TrendingUp,
        slug: "input-credit",
        content: `
            <p class="lead">Input Tax is the VAT you pay on business expenses. Recovering this against your Output Tax is key to cash flow management.</p>

            <h2>What is Recoverable Input Tax?</h2>
            <p>You can reclaim VAT paid on goods and services used for making taxable supplies. Examples include:</p>
            <ul>
                <li>Inventory for resale.</li>
                <li>Commercial Rent.</li>
                <li>Office supplies and equipment.</li>
                <li>Consulting or professional fees.</li>
            </ul>

            <h2>Blocked Input Tax</h2>
            <p>VAT cannot be recovered on certain expenses, even if for business:</p>
            <ul>
                <li>Entertainment expenses (for non-employees).</li>
                <li>Motor vehicles purchased for personal use.</li>
                <li>Employee benefits (without a contractual obligation).</li>
            </ul>

            <h2>Conditions for Recovery</h2>
            <ol>
                <li>You must hold a valid <strong>Tax Invoice</strong>.</li>
                <li>You must have paid or intend to pay the consideration within 6 months.</li>
                <li>The goods/services must be used for making taxable supplies.</li>
            </ol>
        `
    },
    {
        title: "VAT Refunds",
        description: "A guide on how to claim refunds from the FTA if your input tax exceeds your output tax.",
        icon: RefreshCcw,
        slug: "vat-refunds",
        content: `
            <p class="lead">If your Input Tax exceeds your Output Tax in a tax period, you are in a refundable position.</p>

            <h2>How to Claim a Refund</h2>
            <p>When filing your VAT Return, if Box 14 shows a negative amount (Refundable Tax):</p>
            <ol>
                <li>Select "Yes" to "Do you wish to request a refund?".</li>
                <li>Alternatively, select "No" to carry the credit forward to the next period (recommended for frequent filing).</li>
            </ol>
            <p>If you requested a refund, you must submit a separate <strong>VAT Refund Request</strong> form in the EmaraTax portal. It is typically processed within 20 business days.</p>

            <h2>Special Refund Schemes</h2>
            <ul>
                <li><strong>Business Visitors:</strong> Foreign businesses with no UAE presence can claim refunds under specific conditions.</li>
                <li><strong>New Residences:</strong> UAE Nationals building their own home can claim a refund on construction costs.</li>
                <li><strong>Expo 2020 Participants:</strong> Special refund rules apply for official participants.</li>
            </ul>
        `
    },
    {
        title: "Designated Zones",
        description: "Learn about the special VAT treatment for Designated Zones (Free Zones) in the UAE.",
        icon: Map,
        slug: "designated-zones",
        content: `
            <p class="lead">Not all Free Zones are "Designated Zones". Designated Zones are treated as being outside the UAE for VAT purposes for goods.</p>

            <h2>Criteria for a Designated Zone</h2>
            <ul>
                <li>It must be a fenced area with security measures.</li>
                <li>It must have Customs control over movement of goods.</li>
                <li>It must be listed in the Cabinet Decision.</li>
            </ul>
            <p>Examples include Jebel Ali Free Zone (JAFZA), Dubai Airport Free Zone (DAFZA), and Khalifa Industrial Zone (KIZAD).</p>

            <h2>VAT Treatment of Goods</h2>
            <ul>
                <li><strong>Transfer between Designated Zones:</strong> Generally VAT-free (Out of Scope) if not consumed.</li>
                <li><strong>Import into Designated Zone from Overseas:</strong> No Import VAT.</li>
                <li><strong>Sale to Mainland UAE:</strong> Treated as an Import; VAT is applicable (RCM or paid at customs).</li>
                <li><strong>Consumption within Zone:</strong> If goods are consumed within the zone, VAT applies.</li>
            </ul>

            <h2>VAT Treatment of Services</h2>
            <p><strong>Crucial Rule:</strong> The "Designated Zone" status generally applies only to goods. Services supplied within a Designated Zone are treated as supplied in the UAE and are <strong>subject to VAT at 5%</strong>.</p>
        `
    },
    {
        title: "Import Declaration",
        description: "Learn how to declare VAT on imports and link your customs registration with your TRN.",
        icon: Plane,
        slug: "import-declaration",
        content: `
            <p class="lead">VAT is due on all imports of taxable goods into the UAE. The method of payment depends on your registration status.</p>

            <h2>For Registered Businesses</h2>
            <p>If your Tax Registration Number (TRN) is linked to your Customs Code:</p>
            <ul>
                <li>You can clear goods without paying VAT at the border.</li>
                <li>The import will automatically appear in <strong>Box 9</strong> of your VAT Return.</li>
                <li>You declare the VAT as Output Tax (Box 9) and Input Tax (Box 10), resulting in a cash-flow neutral transaction (Reverse Charge).</li>
            </ul>

            <h2>For Non-Registered Importers</h2>
            <p>If you are not registered for VAT, you must pay VAT on imports before the goods can be cleared by Customs.</p>
            <ol>
                <li>Submit Customs Declaration.</li>
                <li>Wait for approval.</li>
                <li>Log in to EmaraTax and file a <strong>VAT 301</strong> Import Declaration.</li>
                <li>Pay the VAT amount directly to the FTA.</li>
            </ol>

            <h2>Linking TRN to Customs</h2>
            <p>To benefit from the deferred payment mechanism, ensure you update your Customs Registration with your TRN through the customs authority portal (e.g., Dubai Trade).</p>
        `
    }
];
