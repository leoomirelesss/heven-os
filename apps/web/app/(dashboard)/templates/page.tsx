import Link from 'next/link';
const templates=['Ecommerce','Services','Booking','Restaurant','Course','Portfolio','Landing page'];
export default function Page(){return <div><h2 className='text-2xl font-semibold mb-4'>Templates</h2><div className='grid md:grid-cols-3 gap-4'>{templates.map(t=><div key={t} className='border border-white/10 bg-panel rounded p-4'><p className='font-medium'>{t}</p><p className='text-sm text-muted'>Optimized for LATAM operators</p><Link href='/ai-builder' className='inline-block mt-3 border border-white/20 px-3 py-1 rounded'>Use template</Link></div>)}</div></div>}
