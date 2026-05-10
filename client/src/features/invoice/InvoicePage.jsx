import { 
  Download, Printer, Share2, 
  MapPin, Calendar, CreditCard, 
  ArrowLeft, ShieldCheck, Globe,
  Receipt, FileText, TrendingUp
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, cn } from '@/components/common/UI';

export default function InvoicePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12 animate-premium">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(`/trips/${id}`)}
            className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-100 transition-all"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="space-y-1 text-left">
            <h1 className="text-4xl font-black text-secondary tracking-tight">Trip <span className="text-primary italic">Financials.</span></h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Financial Hub for: Tropical Escape</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-14 px-8 border-slate-200 text-secondary">
             <Printer className="h-5 w-5" />
             Print
          </Button>
          <Button className="h-14 px-10 shadow-xl">
            <Download className="h-5 w-5" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Invoice Main Area */}
        <div className="lg:col-span-8">
          <Card className="p-16 border-none shadow-premium bg-white relative overflow-hidden">
             {/* Watermark Logo */}
             <div className="absolute top-10 right-10 opacity-[0.03] scale-[4] origin-top-right">
                <img src="/travelloop_logo.png" className="h-20" alt="Watermark" />
             </div>

             <div className="space-y-16 relative z-10">
                <div className="flex justify-between items-start">
                   <div className="space-y-6">
                      <img src="/travelloop_logo.png" className="h-16 w-fit object-contain" alt="Logo" />
                      <div className="space-y-1 text-left">
                         <p className="text-sm font-bold text-slate-400">Invoice Number</p>
                         <p className="text-xl font-black text-secondary">#TL-2024-8842</p>
                      </div>
                   </div>
                   <div className="text-right space-y-2">
                      <div className="bg-primary/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary inline-block">Paid & Verified</div>
                      <p className="text-sm font-bold text-slate-400">Issued on Oct 24, 2024</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-16 border-y border-slate-100 py-10">
                   <div className="space-y-4 text-left">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Billed From</h4>
                      <div className="space-y-1">
                         <p className="font-black text-secondary text-lg">Traveloop Enterprise</p>
                         <p className="text-sm font-bold text-slate-500">124 Global Loop Way</p>
                         <p className="text-sm font-bold text-slate-500">San Francisco, CA 94103</p>
                         <p className="text-sm font-bold text-primary">billing@travelloop.com</p>
                      </div>
                   </div>
                   <div className="space-y-4 text-right">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Billed To</h4>
                      <div className="space-y-1">
                         <p className="font-black text-secondary text-lg">John Doe</p>
                         <p className="text-sm font-bold text-slate-500">Member ID: #44215</p>
                         <p className="text-sm font-bold text-slate-500">456 Explorer Avenue</p>
                         <p className="text-sm font-bold text-slate-500">London, UK EC1A 1BB</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 text-left ml-2">Trip Summary</h4>
                   <table className="w-full">
                      <thead>
                         <tr className="border-b border-slate-100">
                            <th className="py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400">Description</th>
                            <th className="py-4 text-right text-xs font-black uppercase tracking-widest text-slate-400">Qty</th>
                            <th className="py-4 text-right text-xs font-black uppercase tracking-widest text-slate-400">Amount</th>
                         </tr>
                      </thead>
                      <tbody className="text-left font-bold text-secondary">
                         <tr className="border-b border-slate-50">
                            <td className="py-6 space-y-1">
                               <p className="text-lg font-black">Tropical Escape: Bali & Beyond</p>
                               <p className="text-xs font-bold text-slate-400">12 Days Curated Experience Plan</p>
                            </td>
                            <td className="py-6 text-right">01</td>
                            <td className="py-6 text-right">$450.00</td>
                         </tr>
                         <tr className="border-b border-slate-50">
                            <td className="py-6 space-y-1">
                               <p className="text-lg font-black">AI Concierge Priority Support</p>
                               <p className="text-xs font-bold text-slate-400">24/7 Global Travel Assistance</p>
                            </td>
                            <td className="py-6 text-right">01</td>
                            <td className="py-6 text-right">$120.00</td>
                         </tr>
                      </tbody>
                   </table>
                </div>

                <div className="flex justify-end pt-10">
                   <div className="w-80 space-y-4">
                      <div className="flex justify-between text-sm font-bold text-slate-400">
                         <span>Subtotal</span>
                         <span className="text-secondary">$570.00</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-slate-400">
                         <span>VAT (0%)</span>
                         <span className="text-secondary">$0.00</span>
                      </div>
                      <div className="flex justify-between items-center pt-6 border-t-4 border-secondary">
                         <span className="text-lg font-black text-secondary uppercase tracking-widest">Total Paid</span>
                         <span className="text-4xl font-black text-primary">$570.00</span>
                      </div>
                   </div>
                </div>

                <div className="pt-16 border-t border-slate-100 flex flex-col items-center gap-6">
                   <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                      <ShieldCheck className="h-4 w-4" />
                      Securely Processed via Traveloop Pay
                   </div>
                   <p className="text-xs font-bold text-slate-400 max-w-lg text-center leading-relaxed">
                      This is a computer generated document. No signature required. For any discrepancies, please reach out to our global support loop at support@travelloop.com.
                   </p>
                </div>
             </div>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-4 space-y-10">
           <Card className="p-10 space-y-8 bg-slate-50 border-none shadow-premium">
              <h3 className="text-2xl font-black text-secondary">Summary</h3>
              <div className="space-y-6">
                 <SummaryItem icon={MapPin} label="Destination" value="Ubud, Bali" />
                 <SummaryItem icon={Calendar} label="Duration" value="12 Incredible Days" />
                 <SummaryItem icon={CreditCard} label="Payment" value="Visa ending in •••• 4421" />
              </div>
              <Button className="w-full h-14 shadow-lg">View Detailed Billing</Button>
           </Card>

           <Card className="p-10 bg-secondary text-white space-y-6 border-none shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6 text-left">
                 <div className="bg-primary p-3 rounded-xl w-fit shadow-glow">
                    <TrendingUp className="h-6 w-6" />
                 </div>
                 <div className="space-y-3">
                    <h3 className="text-2xl font-black leading-tight">Tax-Free Savings!</h3>
                    <p className="text-sm font-bold text-white/50 leading-relaxed">
                       As a <span className="text-primary">Pro Explorer</span>, you saved $85 in service fees on this booking.
                    </p>
                 </div>
              </div>
              <div className="absolute top-[-50%] left-[-50%] w-96 h-96 bg-primary/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
           </Card>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-4">
       <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm h-fit">
          <Icon className="h-5 w-5 text-primary" />
       </div>
       <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
          <p className="text-lg font-black text-secondary leading-tight mt-1">{value}</p>
       </div>
    </div>
  );
}
