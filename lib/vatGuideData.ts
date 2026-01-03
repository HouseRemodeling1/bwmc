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
            <p class="lead">A Comprehensive Guide to VAT Basics in the United Arab Emirates.</p>

            <h2>Understanding Value Added Tax</h2>
            <p>Tax can be defined as a fee charged by the government on goods, services, income and other transactions in order to finance public services and government expenditure. There are two major tax categories:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Direct Tax:</strong> Paid directly to the government by the taxpayer.</li>
                <li><strong>Indirect Tax:</strong> Paid to the government by an intermediary, who collects the tax from the taxpayer on behalf of the government.</li>
            </ul>
            <p>The VAT is an indirect tax levied on the consumption or use of goods and services. It is charged at each step of the supply process. The end consumers bear the costs of VAT while registered businesses collect and account for VAT, acting as tax collectors on behalf of the government.</p>

            <h2>How does VAT work?</h2>
            <p>Let’s consider the following example to see how the VAT system works:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>A manufacturer who produces plasma television sets sells a TV to a wholesaler for AED 1000. Under the new tax system, the manufacturer collects a VAT of 5% (AED 50) from the wholesaler on behalf of the government. The wholesaler then pays a total amount of AED 1050.</li>
                <li>The wholesaler increases the selling price to AED 2000 and sells it to a retailer. The wholesaler collects a VAT of 5% (AED 100) from the retailer on behalf of the government, while also receiving a refund of the VAT paid to the manufacturer in the previous step. The retailer pays a total amount of AED 2100.</li>
                <li>The retailer further increases the selling price to AED 3000 and sells it to the end customer. The retailer collects a VAT of 5% (AED 150) from the end customer, while also receiving a refund of the VAT paid to the wholesaler in the previous step.</li>
                <li>The end customer pays a total amount of AED 3150 for the plasma TV set.</li>
            </ul>
            <p>A value added tax is applied at every stage of the sales process, and the registered business receives a refund (or tax credit) on the VAT paid at the previous step. The Federal Tax Authority (FTA) has specified a fixed VAT rate of 5% for the sale of goods and services in the UAE.</p>

            <h2>Why is the VAT being introduced?</h2>
            <p>The UAE delivers excellent public services, including healthcare, education, public transportation, and social services. The introduction of a VAT will allow the government to diversify their sources of income and continue to ensure a good standard of living for UAE residents.</p>

            <h2>Registering for VAT</h2>
            <p>Registration may be mandatory or voluntary, depending on the business revenues generated.</p>
            <h3>Mandatory Registration</h3>
            <p>A business must register for VAT if the total value of their taxable sales and imports within the UAE exceeds the mandatory registration threshold of <strong>AED 375,000</strong> for the previous 12 months or within the upcoming 30 days.</p>
            <h3>Voluntary Registration</h3>
            <p>A business can voluntarily register for VAT if the total value of their taxable sales and imports within the UAE exceeds the voluntary registration threshold of <strong>AED 187,500</strong> for the previous 12 months or within the upcoming 30 days.</p>

            <h2>VAT Rates in UAE</h2>
            <p>The VAT rate is <strong>5%</strong> for most goods and services. However, specific categories fall under 0% or Exempt status:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 class="mt-0 text-emerald-800 font-semibold text-lg">0% VAT (Zero-Rated)</h3>
                    <p class="text-sm text-gray-600 mb-3">Taxable at 0% (Input VAT recoverable)</p>
                    <ul class="list-disc pl-5 space-y-2 text-sm">
                        <li>Certain education and healthcare supplies.</li>
                        <li>Goods and services exported outside the GCC.</li>
                        <li>International transportation.</li>
                        <li>Certain investment-grade precious metals.</li>
                        <li>Newly constructed residential properties (within 3 years).</li>
                    </ul>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 class="mt-0 text-emerald-800 font-semibold text-lg">VAT Exempt</h3>
                    <p class="text-sm text-gray-600 mb-3">No VAT charged (Input VAT <strong>not</strong> recoverable)</p>
                    <ul class="list-disc pl-5 space-y-2 text-sm">
                        <li>Residential properties (resale).</li>
                        <li>Public transport (Metro, Buses).</li>
                        <li>Undeveloped land (Bare land).</li>
                        <li>Life insurance.</li>
                        <li>Certain financial services.</li>
                    </ul>
                </div>
            </div>

            <h2>Need for bookkeeping</h2>
            <p>Every business owner registered under VAT must maintain records. A valid tax invoice must include the following information:</p>
            <ol class="list-decimal pl-5 space-y-2">
                <li>A unique sequential number.</li>
                <li>The date of issue.</li>
                <li>The supplier’s name, address and Tax Registration Number (TRN).</li>
                <li>The customer’s name, address and Tax Registration Number (TRN).</li>
                <li>Description of goods or services supplied.</li>
                <li>Total amount excluding VAT.</li>
                <li>Total VAT chargeable.</li>
                <li>Price and quantity of each item.</li>
                <li>Rate of discount per item.</li>
                <li>Rate of VAT charged per item.</li>
                <li>Total amount including VAT.</li>
            </ol>
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

            <h2>How to register for VAT?</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start my-6">
                <div>
                    <p class="mt-0 mb-4 text-gray-600">Businesses can register online through the Federal Tax Authority (FTA) portal. The process involves:</p>
                    <div class="space-y-4">
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                            <div>
                                <p class="m-0 font-semibold text-gray-800">Create Account</p>
                                <p class="text-sm text-gray-600 m-0">Sign up on the EmaraTax (FTA) portal.</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                            <div>
                                <p class="m-0 font-semibold text-gray-800">Verify & Log in</p>
                                <p class="text-sm text-gray-600 m-0">Confirm email details and access the dashboard.</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                            <div>
                                <p class="m-0 font-semibold text-gray-800">Complete Form</p>
                                <p class="text-sm text-gray-600 m-0">Fill in business details, turnover figures, and projected revenue.</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                            <div>
                                <p class="m-0 font-semibold text-gray-800">Submit Documents</p>
                                <p class="text-sm text-gray-600 m-0">Upload all required proof of identity and business license.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 class="mt-0 text-emerald-800 text-lg font-semibold mb-4">Required Documents</h3>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3 text-sm text-gray-700">
                            <span class="w-2 h-2 bg-emerald-500 rounded-full"></span> 
                            Passport Copy & Emirates ID
                        </li>
                        <li class="flex items-center gap-3 text-sm text-gray-700">
                            <span class="w-2 h-2 bg-emerald-500 rounded-full"></span> 
                            Trade License
                        </li>
                        <li class="flex items-center gap-3 text-sm text-gray-700">
                            <span class="w-2 h-2 bg-emerald-500 rounded-full"></span> 
                            Certificate of Incorporation
                        </li>
                        <li class="flex items-center gap-3 text-sm text-gray-700">
                            <span class="w-2 h-2 bg-emerald-500 rounded-full"></span> 
                            Bank Account Letter
                        </li>
                        <li class="flex items-center gap-3 text-sm text-gray-700">
                            <span class="w-2 h-2 bg-emerald-500 rounded-full"></span> 
                            Memorandum of Association (MOA)
                        </li>
                    </ul>
                </div>
            </div>

            <h3>Supporting Documents</h3>
            <ul class="list-disc pl-5 space-y-2">
                <li>Passport copy</li>
                <li>Emirates ID</li>
                <li>Trade licence</li>
                <li>Any other official documents authorizing your business to conduct trade within the UAE.</li>
            </ul>

            <h2>VAT Group Registration</h2>
            <p>If a company has multiple entities that trade with each other, it is possible to register as a VAT group. In a group registration, all of the entities within the VAT group are treated as one entity for VAT purposes. The supplies made between members of a VAT group are disregarded (no VAT is due on them).</p>

            <h2>Deregistration</h2>
            <p>A VAT-registered person in the UAE can apply to de-register if they meet any of the following conditions:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>The registered person no longer makes taxable supplies.</li>
                <li>The value of their taxable supplies is less than the voluntary registration threshold of 187,500 AED over a period of 12 consecutive months.</li>
                <li>The value of their taxable supplies is less than the mandatory threshold of 375,000 AED over a period of 12 months.</li>
            </ul>
        `
    },
    {
        title: "Supply under VAT",
        description: "Understand the different types of supplies (Standard, Zero-rated, Exempt) under the VAT regime.",
        icon: Package,
        slug: "supply-under-vat",
        content: `
                <li><strong>Place of Supply:</strong> Determines whether the supply is made in or outside UAE.</li>
                <li><strong>Value of Supply:</strong> Determines the taxable amount.</li>
                <li><strong>Date of Supply:</strong> Determines the VAT period for reporting.</li>
            </ul>

            <h2>Types of Supply</h2>
            <p>Supplies are categorized to determine the correct tax treatment:</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="mt-0 text-emerald-700 text-lg">1. Standard Rated (5%)</h3>
                    <p class="text-sm text-gray-600">Applies to the majority of goods and services in the UAE (e.g., retail, commercial rent, consulting).</p>
                </div>

                <div class="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="mt-0 text-emerald-700 text-lg">2. Zero-Rated (0%)</h3>
                    <p class="text-sm text-gray-600">Taxed at 0%, but allows for input tax recovery.</p>
                    <ul class="list-disc pl-5 mt-2 text-sm text-gray-600">
                        <li>Exports outside GCC</li>
                        <li>International Transport</li>
                        <li>Healthcare & Education</li>
                    </ul>
                </div>

                <div class="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="mt-0 text-emerald-700 text-lg">3. VAT Exempt</h3>
                    <p class="text-sm text-gray-600">No VAT charged, and <strong>no input tax recovery</strong>.</p>
                    <ul class="list-disc pl-5 mt-2 text-sm text-gray-600">
                        <li>Residential Real Estate</li>
                        <li>Local Transport</li>
                        <li>Financial Services</li>
                    </ul>
                </div>

                <div class="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="mt-0 text-emerald-700 text-lg">4. Out-of-Scope</h3>
                    <p class="text-sm text-gray-600">Transactions not subject to UAE VAT law (e.g., merchant trading where goods don't enter UAE).</p>
                </div>
            </div>
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

            <p>In a typical business, the supplier collects VAT on behalf of customers and pays it to the government. Under the reverse charge mechanism, the obligation of reporting a VAT transaction is shifted from the seller to the recipient. The recipient will have to record the VAT on purchases (input VAT) and the VAT on sales (output VAT) in their VAT return.</p>

            <h2>Why is it needed?</h2>
            <p>It relieves non-resident suppliers of the burden of registering and accounting for VAT in their buyers’ location. It is mainly used for cross-border transactions.</p>

            <h2>When is Reverse Charge applicable?</h2>
            <p>Reverse charge is applicable in the following cases:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>Import of goods/services from other GCC and non-GCC countries.</li>
                <li>Purchase of goods from a designated zone.</li>
                <li>Supply of gold and diamonds.</li>
                <li>Purchase of gold and diamonds for resale or further production/manufacture.</li>
                <li>Supply of hydrocarbons for resale by a registered supplier to a registered recipient in the UAE.</li>
                <li>Supply of crude/refined oil, processed/unprocessed natural gas.</li>
                <li>Production and distribution of any form of energy supplied by a registered supplier to a registered recipient.</li>
            </ul>
            <p><strong>Note:</strong> Not applicable on export of gold/diamonds, supply of investment precious metals, and export of products where the main component is gold/diamonds.</p>

            <h2>How does it work?</h2>
            <p><strong>Example:</strong> Mr. Abdul (UAE VAT-registered) uses the services of a bookkeeper named Sam (based in Italy). Sam is not registered in UAE. Mr. Abdul has acquired services from a non-UAE-based supplier, so he will have to record the reverse charge on his VAT return. The place of supply is UAE.</p>

            <h2>Requirements for the recipient</h2>
            <ul class="list-disc pl-5 space-y-2">
                <li>The receiver of the goods or services must be registered for VAT.</li>
                <li>Every registered business owner must keep proper records of their supplies that incur reverse charge.</li>
                <li>Invoices, receipt vouchers, and refund vouchers should all specify whether the tax payable for that particular transaction is through reverse charge.</li>
            </ul>
        `
    },
    {
        title: "VAT Returns",
        description: "A comprehensive guide on how and when to file your VAT returns to stay compliant.",
        icon: FileText,
        slug: "vat-returns",
        content: `
            <p class="lead">Taxable persons must file VAT returns to the FTA, summarizing their supplies and tax liability for a specific tax period.</p>

            <h2>VAT 201 Form Structure</h2>
            <p>The standard VAT return form (VAT 201) is divided into key sections. Here is a simplified breakdown:</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <!-- Outputs -->
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 class="mt-0 text-emerald-800 font-semibold">Sales & Outputs</h3>
                    <p class="text-xs text-gray-500 mb-4">VAT you collected from customers</p>
                    <ul class="space-y-3 text-sm">
                        <li class="flex justify-between border-b pb-2">
                            <span>Standard Rated Supplies (5%)</span>
                            <span class="font-bold text-gray-700">Box 1</span>
                        </li>
                        <li class="flex justify-between border-b pb-2">
                            <span>Zero Rated Supplies (0%)</span>
                            <span class="font-bold text-gray-700">Box 4</span>
                        </li>
                        <li class="flex justify-between border-b pb-2">
                            <span>Exempt Supplies</span>
                            <span class="font-bold text-gray-700">Box 5</span>
                        </li>
                        <li class="flex justify-between pt-1">
                            <span class="font-semibold text-emerald-700">Total Output Tax</span>
                            <span class="font-bold text-emerald-700">Box 12</span>
                        </li>
                    </ul>
                </div>

                <!-- Inputs -->
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 class="mt-0 text-emerald-800 font-semibold">Expenses & Inputs</h3>
                    <p class="text-xs text-gray-500 mb-4">VAT you paid to suppliers</p>
                    <ul class="space-y-3 text-sm">
                        <li class="flex justify-between border-b pb-2">
                            <span>Standard Rated Expenses (5%)</span>
                            <span class="font-bold text-gray-700">Box 9</span>
                        </li>
                        <li class="flex justify-between border-b pb-2">
                            <span>Supplies subject to Reverse Charge</span>
                            <span class="font-bold text-gray-700">Box 10</span>
                        </li>
                        <li class="flex justify-between pt-1">
                            <span class="font-semibold text-emerald-700">Total Recoverable Tax</span>
                            <span class="font-bold text-emerald-700">Box 13</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="bg-blue-50 p-5 rounded-lg border border-blue-100 text-center my-6">
                <h3 class="mt-0 text-blue-900 font-bold mb-2">Net VAT Payable (Box 14)</h3>
                <p class="text-sm text-blue-800 mb-0"><strong>Total Output Tax</strong> (Box 12)  minus  <strong>Total Recoverable Tax</strong> (Box 13)</p>
                <p class="text-xs text-blue-600 mt-2">If negative, you can claim a refund.</p>
            </div>

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
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-2 mt-4 text-sm text-gray-700">
                <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-1">●</span>
                     Tax invoices, credit & debit notes
                </div>
                <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-1">●</span>
                     Import & Export declarations
                </div>
                <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-1">●</span>
                     General Ledgers
                </div>
                <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-1">●</span>
                     Purchase Day Book
                </div>
                <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-1">●</span>
                     Sales Day Book
                </div>
                <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-1">●</span>
                     VAT Account Record
                </div>
                <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-1">●</span>
                     Records of goods for personal use
                </div>
            </div>

            <h3>Tax Records</h3>
            <p>Your records must include specific information about:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>Tax due on taxable supplies.</li>
                <li>Tax due after adjustments/corrections.</li>
                <li>Tax due on Reverse Charge supplies.</li>
                <li>Recoverable input tax on supplies and imports.</li>
            </ul>

            <h2>How long should I maintain VAT records?</h2>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>General Records:</strong> At least 5 years from the end of the financial year.</li>
                <li><strong>Capital Assets (Machinery/Furniture):</strong> At least 10 years.</li>
                <li><strong>Real Estate Records:</strong> At least 15 years.</li>
            </ul>

            <h2>Where should I keep my VAT records?</h2>
            <p>Records should be maintained at the head office. You can also maintain an electronic copy of the original records.</p>
            
            <h2>FTA Audit File (FAF)</h2>
            <p>In case of an audit, you may be asked to provide an FTA Audit File (FAF). This is a master file (usually .csv) containing all necessary data to assess compliance, including:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>Company details (TRN, Name).</li>
                <li>Supplier details (Name, Location, TRN).</li>
                <li>Customer details (Name, Location, TRN).</li>
                <li>Transaction details.</li>
            </ul>
        `
    },
    {
        title: "Excise Tax",
        description: "Understand the specific tax levied on goods harmful to health and how it differs from VAT.",
        icon: Wine,
        slug: "excise-tax",
        content: `
            <p class="lead">Excise tax is an indirect tax imposed on goods that are harmful to human health or the environment.</p>

            <h2>What is Excise Tax?</h2>
            <p>The primary purpose of the excise tax is to reduce the consumption of unhealthy goods. It is levied on goods imported into, manufactured in, or stockpiled in the UAE.</p>

            <h2>Which products are subject to Excise Tax?</h2>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Carbonated Drinks:</strong> Aerated beverages (except unflavored aerated water) and concentrates/powders used to make them.</li>
                <li><strong>Tobacco and Tobacco Products:</strong> All items listed within Schedule 24 of the GCC Common Customs Tariff.</li>
                <li><strong>Energy Drinks:</strong> Beverages containing stimulants like caffeine, taurine, ginseng, and guarana.</li>
            </ul>

            <h2>Scope of Excise Tax</h2>
            <p>A person must register and pay excise tax if they are involved in:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>Importing excise products.</li>
                <li>Producing or manufacturing excise goods.</li>
                <li>Transferring excise products out of a Designated Zone.</li>
                <li>Stockpiling excise goods in the normal course of business.</li>
                <li>Selling excise goods in the UAE (tax included in sale price).</li>
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
            <p class="lead">The 'Place of Supply' determines the jurisdiction in which tax is payable. It is determined differently for goods and services.</p>

            <h2>Place of Supply of Goods</h2>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Domestic Supplies:</strong> If goods are located in UAE during supply, the place of supply is UAE.</li>
                <li><strong>Exports (to non-GCC):</strong> If goods are dispatched from UAE, the place of supply is UAE (but likely Zero-rated).</li>
                <li><strong>Intra-GCC Supplies:</strong> 
                    <ul class="list-disc pl-5">
                        <li>If customer is VAT-registered: Place of supply is the destination state.</li>
                        <li>If customer is not registered: Depends on supplier's export threshold.</li>
                    </ul>
                </li>
                <li><strong>Imports:</strong> The country where goods are declared for consumption (e.g., if imported into Abu Dhabi, place of supply is Abu Dhabi/UAE).</li>
            </ul>

            <h2>Place of Supply of Services</h2>
            <p><strong>Basic Rule:</strong> The place of supply is where the <strong>supplier</strong> has their place of residence.</p>
            
            <h3>Exceptions</h3>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Imports (from non-GCC):</strong> If recipient is VAT-registered in UAE, place of supply is UAE.</li>
                <li><strong>Installation Services:</strong> Where the installation is done.</li>
                <li><strong>Real Estate Services:</strong> Where the property is located.</li>
                <li><strong>Hotel/Restaurant Services:</strong> Where the service is actually performed.</li>
                <li><strong>Cultural/Arts/Sports:</strong> Where the event is performed.</li>
                <li><strong>Passenger Transport:</strong> Where the journey begins.</li>
                <li><strong>Telecom/Electronic Services:</strong> Where the services are used or received.</li>
            </ul>
        `
    },
    {
        title: "Designated Zones",
        description: "Understand how Designated Zones are treated for VAT purposes and their impact on supplies.",
        icon: Map,
        slug: "designated-zones",
        content: `
            <p class="lead">Designated Zones are special areas in the UAE that are treated as being outside the territory of the UAE for VAT purposes.</p>

            <h2>Transfer of Goods</h2>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Outside UAE to Designated Zone:</strong> Not subject to VAT (Outside Scope).</li>
                <li><strong>Mainland to Designated Zone:</strong> Subject to VAT (Local movement).</li>
                <li><strong>Between Designated Zones:</strong> Outside Scope of VAT <strong>if</strong>:
                    <ul class="list-disc pl-5">
                        <li>Goods are not used/altered during transfer.</li>
                        <li>Transfer is under customs suspension (GCC Customs Law).</li>
                    </ul>
                </li>
            </ul>

            <h2>Importing from Designated Zone to Mainland</h2>
            <p>Moving goods from a Designated Zone to the UAE mainland is treated as an <strong>Import</strong>. The importer must account for Import VAT.</p>

            <h2>Services in Designated Zones</h2>
            <p>Unlike goods, services supplied within a Designated Zone are <strong>subject to VAT</strong> at the standard rate (5%), as the zone is considered part of the UAE for services.</p>

            <h2>Real Estate</h2>
            <p>Sale or lease of real estate in a Designated Zone is treated as a supply of goods and is generally <strong>Outside Scope of VAT</strong>. However, hotel rights and other real estate services remain taxable.</p>
        `
    },
    {
        title: "VAT Import Declaration",
        description: "Understand the VAT 301 form and how to declare VAT on imports if you are not registered.",
        icon: FileText,
        slug: "vat-import-declaration",
        content: `
            <p class="lead">The VAT 301 Import Declaration form is used by unregistered persons to pay VAT on imports, or for specific customs suspension scenarios.</p>

            <h2>Who needs to file VAT 301?</h2>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Unregistered Persons:</strong> Individuals or businesses not registered for VAT who import goods.</li>
                <li><strong>Registered Persons (Customs Suspension):</strong> Importing goods subject to customs duty suspension (requires e-Guarantee).</li>
            </ul>

            <h2>Payment Methods</h2>
            <p>For unregistered importers, VAT must be paid before customs clearance.</p>
            <ol class="list-decimal pl-5 space-y-2">
                <li><strong>Credit Card / e-Dirham:</strong> Direct payment via the portal.</li>
                <li><strong>e-Guarantee:</strong> Required for goods under suspension (Scenarios 4 & 5).</li>
            </ol>

            <h2>Process</h2>
            <ol class="list-decimal pl-5 space-y-2">
                <li>Log in to FTA / EmaraTax portal.</li>
                <li>Select VAT 301 form.</li>
                <li>Enter Port details and Customs Declaration number.</li>
                <li>System auto-retrieves value and calculates VAT.</li>
                <li>Make payment to clear goods.</li>
            </ol>
        `
    },
    {
        title: "Date of Supply",
        description: "Understand the tax point or 'Date of Supply' to determine the correct VAT period for reporting.",
        icon: Calendar,
        slug: "date-of-supply",
        content: `
            <p class="lead">The date of supply determines the tax period in which you must account for the VAT.</p>

            <h2>General Rule</h2>
            <p>The date of supply is the <strong>earliest</strong> of:</p>
            <ol class="list-decimal pl-5 space-y-2">
                <li>The date of supply of goods/services.</li>
                <li>The date the Tax Invoice is issued.</li>
                <li>The date of full or partial payment.</li>
            </ol>

            <h2>Specific Rules for Goods</h2>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Transported Goods:</strong> Date when transport begins/goods are removed.</li>
                <li><strong>Non-transported Goods:</strong> Date when goods are made available to the customer.</li>
                <li><strong>Assembly/Installation:</strong> Date when assembly/installation is completed.</li>
            </ul>

            <h2>Specific Rules for Services</h2>
            <p>The date when the service is performed or completed.</p>

            <h2>Continuous Supplies</h2>
            <p>For supplies invoiced/paid periodically (e.g., rent, subscriptions), the date of supply is the <strong>earliest</strong> of:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>The date of payment (as per invoice).</li>
                <li>The date of actual payment.</li>
                <li>At least once every 12 months.</li>
            </ul>
        `
    },
    {
        title: "Value of Supply",
        description: "Learn how to calculate the taxable value of a supply, including discounts and profit margins.",
        icon: Coins,
        slug: "value-of-supply",
        content: `
            <p class="lead">The value of supply is the total amount of consideration (money or otherwise) that a supplier receives for a supply, distinguishing it from the tax itself.</p>

            <h2>Monetary Consideration</h2>
            <p>If the consideration is entirely monetary, the value of supply is the total amount paid by the recipient <strong>less the tax</strong>.</p>
            <p><em>Value of Supply = Consideration - VAT</em></p>
            <p>It includes all expenses and charges imposed by the supplier (e.g., delivery fees).</p>

            <h2>Non-Monetary Consideration</h2>
            <p>If the consideration is not monetary (e.g., barter), the value of supply is the <strong>monetary market value</strong> of the non-monetary part plus any cash amount paid.</p>

            <h2>Factors Reducing Value</h2>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Discounts:</strong> If given before or at the time of supply.</li>
                <li><strong>Subsidies:</strong> Granted by the government/GCC states.</li>
            </ul>

            <h2>Foreign Currency</h2>
            <p>If a supply is priced in a foreign currency, it must be converted to AED using the exchange rate approved by the UAE Central Bank at the date of supply for VAT reporting purposes.</p>
        `
    },

    {
        title: "Penalties",
        description: "Avoid fines by understanding the penalties for non-compliance, late filing, and errors.",
        icon: Gavel,
        slug: "vat-penalties",
        content: `
            <p class="lead">The FTA imposes administrative penalties for non-compliance. These can be fixed amounts or percentage-based.</p>

            <h2>Common Administrative Penalties</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <!-- Late Payment -->
                <div class="bg-red-50 p-6 rounded-lg border border-red-100">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="p-2 bg-red-100 rounded-full text-red-600">
                             ⚠️
                        </span>
                        <h3 class="mt-0 text-lg font-semibold text-gray-800">Late Payment</h3>
                    </div>
                    <ul class="space-y-2 text-sm">
                        <li class="flex justify-between"><span>Immediate:</span> <span class="font-bold">2%</span></li>
                        <li class="flex justify-between"><span>Day 7:</span> <span class="font-bold">4%</span></li>
                        <li class="flex justify-between"><span>Day 30+:</span> <span class="font-bold">1% daily</span></li>
                    </ul>
                </div>

                <!-- Late Registration -->
                <div class="bg-orange-50 p-6 rounded-lg border border-orange-100">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="p-2 bg-orange-100 rounded-full text-orange-600">
                             📝
                        </span>
                        <h3 class="mt-0 text-lg font-semibold text-gray-800">Late Registration</h3>
                    </div>
                    <p class="text-3xl font-bold text-gray-800 mb-1">AED 20,000</p>
                    <p class="text-xs text-gray-500">Fixed penalty for failing to register within the specified timeframe.</p>
                </div>
                
                <!-- Late Filing -->
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 class="mt-0 text-base font-semibold text-gray-700">Late Filing of Return</h3>
                    <div class="mt-2 space-y-1">
                        <p class="text-sm"><span class="font-medium text-gray-900">AED 1,000</span> (First time)</p>
                        <p class="text-sm"><span class="font-medium text-gray-900">AED 2,000</span> (Repetition)</p>
                    </div>
                </div>

                <!-- Record Keeping -->
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 class="mt-0 text-base font-semibold text-gray-700">Failure to Keep Records</h3>
                    <div class="mt-2 space-y-1">
                        <p class="text-sm"><span class="font-medium text-gray-900">AED 10,000</span> (First time)</p>
                        <p class="text-sm"><span class="font-medium text-gray-900">AED 50,000</span> (Repetition)</p>
                    </div>
                </div>
            </div>

            <h2>Percentage-Based Penalties (Voluntary Disclosure)</h2>
            <div class="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <p class="text-sm text-blue-800 mb-4">Penalties for errors disclosed voluntarily depend on <strong>when</strong> you disclose them relative to an FTA audit.</p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div class="bg-white p-4 rounded shadow-sm">
                        <span class="block text-2xl font-bold text-blue-600">5%</span>
                        <span class="text-xs text-gray-500">Before Audit Notification</span>
                    </div>
                    <div class="bg-white p-4 rounded shadow-sm">
                        <span class="block text-2xl font-bold text-blue-600">30%</span>
                        <span class="text-xs text-gray-500">After Notification</span>
                    </div>
                    <div class="bg-white p-4 rounded shadow-sm">
                        <span class="block text-2xl font-bold text-blue-600">50%</span>
                        <span class="text-xs text-gray-500">During/After Audit</span>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Input Credit & Refunds",
        description: "Learn about recovering VAT incurred on business expenses and the conditions for Input Tax Credit.",
        icon: TrendingUp,
        slug: "input-credit",
        content: `
            <p class="lead">Input Tax is the VAT you pay on business expenses. Recovering this against your Output Tax is key to cash flow management.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <!-- Recoverable -->
                <div class="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">✓</span>
                        <h3 class="mt-0 text-emerald-800 text-lg font-semibold">Recoverable Input Tax</h3>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">You can reclaim VAT on expenses used for making taxable supplies:</p>
                    <ul class="space-y-2 text-sm text-gray-700">
                        <li class="flex items-start gap-2"><span class="text-emerald-500 font-bold">✓</span> Inventory for resale</li>
                        <li class="flex items-start gap-2"><span class="text-emerald-500 font-bold">✓</span> Commercial Rent</li>
                        <li class="flex items-start gap-2"><span class="text-emerald-500 font-bold">✓</span> Office supplies & equipment</li>
                        <li class="flex items-start gap-2"><span class="text-emerald-500 font-bold">✓</span> Professional fees</li>
                    </ul>
                </div>

                <!-- Blocked -->
                <div class="bg-red-50 p-6 rounded-lg border border-red-100">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">✕</span>
                        <h3 class="mt-0 text-red-800 text-lg font-semibold">Blocked Input Tax</h3>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">VAT <strong>cannot</strong> be recovered on:</p>
                    <ul class="space-y-2 text-sm text-gray-700">
                        <li class="flex items-start gap-2"><span class="text-red-500 font-bold">✕</span> Entertainment expenses</li>
                        <li class="flex items-start gap-2"><span class="text-red-500 font-bold">✕</span> Personal motor vehicles</li>
                        <li class="flex items-start gap-2"><span class="text-red-500 font-bold">✕</span> Employee benefits (non-contractual)</li>
                    </ul>
                </div>
            </div>

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
            <p class="lead">Detailed guide on VAT refunds in the United Arab Emirates.</p>

            <h2>What is a refund?</h2>
            <p>When the input tax is greater than the output tax on a VAT return, the taxpayer can request a VAT refund after filing their VAT return.</p>

            <h2>Timeline for refunds</h2>
            <p>When a taxpayer submits a claim for refund, the FTA will process and review the application within 20 business days of submission. The taxpayer will be notified regarding the FTA’s decision to accept or reject the claim. If the process exceeds the timeline of 20 days, the FTA will notify the taxpayer regarding the extension of the deadline.</p>

            <h2>VAT refund form</h2>
            <p>The VAT refund form contains the following fields:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>TRN (Tax Registration Number):</strong> This field is pre-populated based on the information in the taxpayer’s account in the User Profile tab. It’s advisable to verify if the correct TRN is listed.</li>
                <li><strong>Total amount of Excess Refundable Tax (in AED):</strong> This field is pre-populated based on the formula, Refunds - Penalties = Excess Refundable Tax. This includes refunds reported in all previously submitted VAT returns, and all administration penalties due except for the late registration penalty.</li>
                <li><strong>The amount you wish to have refunded (in AED):</strong> The amount you enter must be equal to or less than the amount displayed in the Total amount of Excess Refundable Tax field.</li>
                <li><strong>Remaining amount of eligible Excess Refundable Tax:</strong> This field is pre-populated with the amount of refundable tax that you can apply for in the future.</li>
                <li><strong>Late registration penalty amount (in AED):</strong> This field is pre-populated based on the penalties imposed on you and whether you have settled the penalty amount or not:
                    <ul class="list-disc pl-5 mt-2">
                        <li>If you’re free from penalties, then the field will display Zero (AED).</li>
                        <li>If you have been charged a penalty, which you have paid, then the field will display Zero (AED).</li>
                        <li>If you have been charged a penalty, but you’re yet to pay the amount at the time of claiming this refund, then the field will display the penalty amount. If the refund amount is negative after deducting the penalty amount, your application will be automatically rejected after submission. If the refund amount is positive after deducting the penalty amount, only the balance will be submitted to the FTA for refund claim purposes.</li>
                    </ul>
                </li>
                <li><strong>Authorised Signatory and Declaration:</strong> The authorised signatory is pre-populated by the system in both English and Arabic. Make sure you read the declaration thoroughly before ticking Yes to submit the form.</li>
            </ul>

            <h2>Submitting a refund claim</h2>
            <p>To submit a refund claim:</p>
            <ol class="list-decimal pl-5 space-y-2">
                <li>Log in to the FTA’s e-Services portal.</li>
                <li>Go to the VAT tab, then the VAT Refunds tab, and access the form by clicking VAT refund request.</li>
                <li>Complete the form. Some of the fields are pre-populated using the details from your account. Make sure that the details you’ve entered are correct, then submit the form by clicking ’Submit’.</li>
                <li>After you submit the form, you will receive an email from the FTA to notify you of the result of your refund application. Once the claim is approved, the refund will be processed within 5 business days.</li>
                <li>You can verify the refund amount by checking your balance from the My Payment tab under the Transaction History section in the e-Services portal.</li>
            </ol>

            <h2>Special VAT refund procedure</h2>
            <p>There are special VAT refund procedures for business visitors, and UAE nationals involved in the construction of new residential buildings.</p>

            <h3>Business visitors</h3>
            <h4>Eligibility criteria</h4>
            <p>Foreign business owners can apply for VAT refunds if they satisfy the following eligibility criteria:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>The business should be located in a GCC member state other than the implementing state. The business should be a foreign entity that carries on business operations, but does not have a place of establishment or fixed establishment in the UAE.</li>
                <li>The business owner should not be a taxable person in the UAE.</li>
                <li>The business should be registered in the GCC member state where it’s located.</li>
                <li>The business should be located in a country that provides VAT refunds to UAE entities.</li>
            </ul>
            <h4>Timeline</h4>
            <p>The timeline for each refund claim is 12 calendar months. The first refund application should be made at the end of 2018.</p>
            <h4>VAT refund limit</h4>
            <p>The minimum amount of each tax claim submitted by business visitors under the Foreign Businesses Scheme is AED 2000.</p>
            <h4>Procedure</h4>
            <ol class="list-decimal pl-5 space-y-2">
                <li>Download the form from the FTA website and fill in all the fields in the PDF. Your form will be rejected if it’s filled by hand.</li>
                <li>Print out the form and add your signature and official stamp. Once you’ve filled out the form, scan it and submit the soft copy to specialrefunds@tax.gov.ae.</li>
                <li>Only PDF, JPG, JPEG and PNG file types are accepted and the total size limit is 5 MB. You will be notified via email once you’ve successfully submitted the form.</li>
            </ol>

            <h3>UAE nationals involved in building new residences</h3>
            <p>UAE nationals building new residences need not set up an e-Services account to submit a refund claim. They can use the refund form downloaded from the FTA website to claim a refund.</p>
            <h4>Eligibility criteria</h4>
            <p>The person claiming the refund must be a UAE national, and they should provide supporting documentation showing their national status, such as a family book or passport.</p>
            <h4>What is reclaimable?</h4>
            <p>VAT refunds can be claimed if the expenses meet the following criteria:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Usage of expenses:</strong> The expenses should be used on a newly constructed building solely intended to be used for residential purposes by the applicant or their family. You cannot claim refunds for expenses spent on buildings like hotels, guest houses, and hospitals.</li>
                <li><strong>Nature of expenses:</strong> The expenses should be spent on certain goods and services:
                    <ul class="list-disc pl-5 mt-2">
                        <li>Services provided by contractors (including builders, architects, and engineers).</li>
                        <li>Building materials and goods that are incorporated into the building by the contractor.</li>
                    </ul>
                </li>
            </ul>
            <p class="mt-2">Here’s a list of incorporated goods that are eligible for VAT refund:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>Central air conditioning and split units</li>
                <li>Fire alarms and smoke detectors</li>
                <li>Doors, flooring (excluding carpets), window frames and glazing, wiring (when embedded inside the building)</li>
                <li>Sanitary and shower units</li>
                <li>Kitchen sinks, work surfaces, and fitted cupboards</li>
            </ul>
            <h4>Timeline</h4>
            <p>You should submit your refund form to the FTA within 6 months after the date of completion of the building. The date of completion is the earlier of:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>When the building becomes occupied</li>
                <li>When the building is certified as completed by the Municipality as mandated by the FTA</li>
            </ul>
            <h4>Procedure</h4>
            <p>The FTA has come up with new provisions to help UAE nationals who are building a new residence to apply for VAT refunds using the FTA e-services portal. If you are a new user registering only for the purpose of applying for the New Residence VAT Refund, don’t register as a Taxable Person. Go to services.tax.gov.ae and create an account using the Sign up button in the top right hand corner of the page. Follow the given procedure exactly.</p>
            <p>If you are an existing user, you can simply log in to your account and follow the procedure to apply for the New Residence VAT Refund.</p>

            <h2>How to create a new taxable person account</h2>
            <ol class="list-decimal pl-5 space-y-2">
                <li>Click the Add New Taxable Person/Special Refunds button within the dashboard.</li>
                <li>After entering your legal name as it appears on your Emirates ID in English and Arabic, click the Create New Taxable Person/Special Refunds button. The account will be automatically added without any additional approval process.</li>
            </ol>
            <p>Now you can access your account by clicking Access the Taxable Person’s account/Special Refunds button on the home page of the FTA e-services portal.</p>

            <h2>How to apply for the New Residence VAT Refund</h2>
            <ol class="list-decimal pl-5 space-y-2">
                <li>Click on the New Residence VAT Refunds tab from the Special Refunds menu on the Taxable Person dashboard.</li>
                <li>Then, click New Residence VAT Refund Request to initiate the process.</li>
            </ol>

            <h2>How to fill and submit the VAT refund request form</h2>
            <p>Fill in the details requested by the form, upload scanned copies of the following supporting documents, and submit the form. Accepted file types are PDF, JPG, PNG and JPEG. The individual file size should be less than 5MB.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li>A copy of your passport, Emirates ID, and family book</li>
                <li>Document to prove that you own the specific plot of land in the UAE</li>
                <li>Documents to support your claim regarding the date of completion of the building</li>
                <li>Documents to support your claim that the building is occupied (such as utility bills)</li>
                <li>A copy of the funder certificate</li>
                <li>A copy of the building permit</li>
                <li>A copy of your bank account confirmation certificate</li>
            </ul>

            <h3 class="mt-6 mb-2">Applicant details</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border border-gray-200">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border-b">Field</th>
                            <th class="px-4 py-2 border-b">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Full Name (in English or Arabic)</td><td class="px-4 py-2">This is a mandatory field. The name given here should be the same as on your Emirates ID.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Email address</td><td class="px-4 py-2">Provide your valid email address.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Emirates ID</td><td class="px-4 py-2">Enter your valid Emirates ID.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Upload Valid Emirates ID</td><td class="px-4 py-2">Upload a scanned copy of your valid Emirates ID. The individual file size limit is 2MB.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Family Book Number</td><td class="px-4 py-2">Enter your family book number.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Upload Family book copy</td><td class="px-4 py-2">Upload a scanned copy of your Family Book.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Are you registered for VAT?</td><td class="px-4 py-2">Answer “YES” if you are registered for VAT and a TRN is assigned to you. Answer “NO” if you are not registered for VAT.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">TRN (applicable if registered for VAT)</td><td class="px-4 py-2">Enter your assigned TRN number if you have answered “YES” for the previous question.</td></tr>
                        <tr><td class="px-4 py-2 font-medium">Have you included the housing costs in your return?</td><td class="px-4 py-2">You must answer “YES” if you are registered for VAT and the housing costs for which you are seeking refund have been recovered in your tax returns Answer “NO” otherwise.</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="mt-6 mb-2">Claim details</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border border-gray-200">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border-b">Field</th>
                            <th class="px-4 py-2 border-b">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Funder Name</td><td class="px-4 py-2">This is applicable if you have selected either Housing Program Fund or Housing Program and Personal Fund in the Request Fund Type field. Enter the government body or entity which provided you with the housing fund.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Upload Funder certificate</td><td class="px-4 py-2">Upload the declaration letter provided by the funding body (if you have selected either Housing Program Fund or Housing Program and Personal Fund option in the Request Fund Type field).</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Date of Property Completion Certificate</td><td class="px-4 py-2">Select the date mentioned on the Property Completion Certificate. Note: You must apply for the refund within 6 months of this date of property completion.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Upload Property Completion Certificate copy</td><td class="px-4 py-2">Upload a copy of the property completion certification.</td></tr>
                        <tr><td class="px-4 py-2 font-medium">Upload Building Permit copy</td><td class="px-4 py-2">Upload a scanned copy of your building permit if the property is in AI Ain or Ras AI Khaimah.</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="mt-6 mb-2">Applicant contact details</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border border-gray-200">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border-b">Field</th>
                            <th class="px-4 py-2 border-b">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Property Plot number</td><td class="px-4 py-2">Enter the property plot number of the newly constructed building for which you are requesting a refund.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Building number (if any)</td><td class="px-4 py-2">Enter the building number for which you are requesting a refund.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Upload Property Site plan</td><td class="px-4 py-2">Upload a scanned copy of your property site plan.</td></tr>
                        <tr><td class="px-4 py-2 font-medium">Street, Area, City, Emirate</td><td class="px-4 py-2">Enter the address of the building for which you are claiming a refund.</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="mt-6 mb-2">Expense Details</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border border-gray-200">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border-b">Field</th>
                            <th class="px-4 py-2 border-b">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Total of the Tax claimed</td><td class="px-4 py-2">Enter the total sum of money spent on property construction. This will be the money requested for a refund.</td></tr>
                        <tr><td class="px-4 py-2 font-medium">Have all the materials purchased been used for the construction of building?</td><td class="px-4 py-2">Answer “YES” or “NO”.</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="mt-6 mb-2">Banking details</h3>
            <p className="mb-2">In this section, you need to provide your bank details. This bank must be established in the UAE. Before entering your bank details, check with your bank to find out whether your account can process payments electronically. Since the refund will be processed to your bank account, ensure that you provide accurate bank details.</p>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border border-gray-200">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border-b">Field</th>
                            <th class="px-4 py-2 border-b">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">IBAN</td><td class="px-4 py-2">Enter the International Bank Account Number. You can find this information in your bank account or contact your bank for details.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Bank Name</td><td class="px-4 py-2">Enter your bank name.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Bank Name/Location</td><td class="px-4 py-2">Enter the name or location of the specific branch of your bank where you have your account. Contact the bank for details.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Account Holder’s Name</td><td class="px-4 py-2">Enter the correct name of the account holder. This should be the same as the applicant’s name.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Account Number</td><td class="px-4 py-2">Enter your bank account number.</td></tr>
                        <tr><td class="px-4 py-2 font-medium">Upload Bank Account confirmation letter/certificate</td><td class="px-4 py-2">Upload a copy of a letter/certificate issued and stamped by your bank, including details such as account holder name, bank’s name and IBAN number.</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="mt-6 mb-2">Declaration</h3>
            <p><strong>I hereby declare I am the owner (a UAE national) and all the information in this form is correct and that the new residence for which the New Residence VAT Refund has been requested will be used exclusively by myself or my family members. I acknowledge that the Federal Tax Authority may claim the refund if it finds that I do not meet the specified conditions.</strong></p>
            <p>Check the box next to the declaration to confirm that you agree with the declaration Terms and Conditions.</p>

            <p>It is recommended that you save the form as you complete each field by clicking the Save as draft button at the bottom of the screen, since you will be logged out of the system after 10 minutes of inactivity. Once you have filled in the form fields and uploaded the necessary documents, carefully review the form once again and click the Submit button in the bottom right corner of the screen. Once the form is submitted, the status of your request will change to Pending on the dashboard.</p>

            <h2>How to check the status of your VAT refund request form</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border border-gray-200">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border-b">Status</th>
                            <th class="px-4 py-2 border-b">Explanation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Drafted</td><td class="px-4 py-2">You have not submitted your in-progress refund request form.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Pending</td><td class="px-4 py-2">The form has been received by the FTA and is pending review.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Resubmit</td><td class="px-4 py-2">The FTA requires additional information after reviewing the form.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">In Progress - Under Review FTA</td><td class="px-4 py-2">An FTA official is currently reviewing your refund request form.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">In Progress - Under Review VB</td><td class="px-4 py-2">A Verification Body official is currently reviewing your refund request form.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">In Progress – Verified FTA</td><td class="px-4 py-2">An FTA official has reviewed your form and submitted for approval.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">In Progress – Verified VB</td><td class="px-4 py-2">The form has been verified by the Verification Body and submitted back to FTA.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Reviewed</td><td class="px-4 py-2">FTA has completed the review and your request will be processed shortly.</td></tr>
                        <tr class="border-b"><td class="px-4 py-2 font-medium">Reject</td><td class="px-4 py-2">The refund request has been rejected.</td></tr>
                        <tr><td class="px-4 py-2 font-medium">Approved</td><td class="px-4 py-2">The refund request has been approved and the refund has been processed.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2>Procedure for form resubmission</h2>
            <ol class="list-decimal pl-5 space-y-2">
                <li>Log in to your account. Your refund request form will be in Resubmit status.</li>
                <li>Click the Edit button to update or add information.</li>
                <li>If needed, you can leave comments for FTA before resubmitting the form. Use the Resubmit Comment field at the bottom of the form.</li>
                <li>Click the Resubmit button. Your updated request form will be sent to the FTA for review.</li>
            </ol>

            <h2>Verification Body</h2>
            <p>A Verification Body is an FTA-approved third party that reviews expenditure, invoices, and VAT incurred by applicants to verify their refund claims.</p>

            <h3>Documents to be submitted to the Verification Body</h3>
            <ul class="list-disc pl-5 space-y-2">
                <li>The refund form which includes your reference number. This form will be stamped and shared by the FTA.</li>
                <li>The construction plan of your building.</li>
                <li>The tax invoices which will be used to claim refunds. You should make sure that these invoices include valid TRNs, VAT amounts, and the name of the applicant/owner. Simplified invoices will not be accepted.</li>
            </ul>

            <h3>Procedure</h3>
            <p>Your Verification Body will provide details about how to proceed with the application and what fees they will charge for the review process. You cannot claim VAT refunds for the verification body fees. The verification body will process your request within 15 days and hand over the signed and stamped verification report to the FTA. This report will contain the total VAT amount to be refunded. You will also receive a copy of the report from the verification body.</p>

            <h2>Processing by the FTA</h2>
            <p>The refund application will be processed by the FTA within 20 business days, once they receive the verification report from the verification body. The taxpayer will be notified regarding this via e-mail and once the claim is processed and approved, the FTA will make the refund payment within 5 business days.</p>
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
