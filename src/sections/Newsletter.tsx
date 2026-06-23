import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simular envío
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-black border-y border-gold/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Mail className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-display uppercase italic text-white mb-4">
            Únete al <span className="text-gold">Club 614</span>
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto text-sm md:text-base uppercase tracking-widest font-black">
            Recibe accesos anticipados a boletos, merch exclusiva y noticias antes que nadie.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="TU CORREO ELECTRÓNICO"
              className="flex-1 bg-white/5 border border-gold/30 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors font-display uppercase tracking-widest"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-gold text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 min-w-[200px] disabled:opacity-50"
            >
              {status === 'idle' && (
                <>
                  <Send size={18} />
                  Suscribirse
                </>
              )}
              {status === 'loading' && 'Procesando...'}
              {status === 'success' && '¡Bienvenido!'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
