import '@/app/globals.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return(
         <html>
             <body className="h-screen m-0 p-0 overflow-hidden flex items-center justify-center bg-gray-100">
                 <main className="flex-1 pt-16 pb-16 p-6 bg-white">
                     {children}
                 </main>
             </body>
         </html>
  );}