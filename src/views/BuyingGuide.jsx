import { BookOpen, Star, DollarSign, Monitor, Gamepad2, Shield, Zap, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const guides = [
  {
    id: 1,
    title: 'Guía para Principiantes',
    icon: <HelpCircle className="w-6 h-6" />,
    description: 'Todo lo que necesitas saber si estás empezando en el mundo de los videojuegos.',
    tips: [
      'Define tu presupuesto mensual para videojuegos',
      'Elige una plataforma según tus preferencias',
      'Aprovecha las ofertas y rebajas de temporada',
      'Lee reseñas antes de comprar un juego',
      'No compres juegos en preventa sin investigar',
    ]
  },
  {
    id: 2,
    title: 'Cómo Elegir tu Plataforma',
    icon: <Monitor className="w-6 h-6" />,
    description: 'PS5, Xbox, PC o Switch: ¿cuál es la mejor para ti?',
    tips: [
      'PS5: exclusivos de Sony, DualSense innovador',
      'Xbox Series X: Game Pass, potencia bruta',
      'PC: versatilidad, gráficos máximos, mods',
      'Switch: portabilidad, Nintendo exclusives',
      'Considera dónde juegan tus amigos',
    ]
  },
  {
    id: 3,
    title: 'Editions: ¿Cuál Comprar?',
    icon: <Star className="w-6 h-6" />,
    description: 'Standard, Deluxe o Ultimate: vale la pena el extra?',
    tips: [
      'Estándar: solo si quieres el juego base',
      'Deluxe: si te interesan los cosméticos extra',
      'Ultimate: solo para fans hardcore de la franquicia',
      'Espera a que salga el juego antes de comprar deluxe',
      'Los pases de temporada suelen no valer la pena',
    ]
  },
  {
    id: 4,
    title: 'Ahorra Dinero en Juegos',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'Estrategias para jugar sin gastar de más.',
    tips: [
      'Usa listas de deseos y espera rebajas',
      'Suscríbete a PS Plus o Xbox Game Pass',
      'Compra claves digitales en tiendas autorizadas',
      'Aprovecha los juegos gratis mensuales',
      'Intercambia juegos físicos con amigos',
    ]
  },
  {
    id: 5,
    title: 'Configura tu Gaming Setup',
    icon: <Gamepad2 className="w-6 h-6" />,
    description: 'Optimiza tu espacio y equipo para la mejor experiencia.',
    tips: [
      'Invierte en un buen monitor con bajo input lag',
      'Un headset de calidad mejora la inmersión',
      'Silla ergonómica para sesiones largas',
      'Control inalámbrico con buena autonomía',
      'Organiza tus cables para un setup limpio',
    ]
  },
  {
    id: 6,
    title: 'Seguridad Online',
    icon: <Shield className="w-6 h-6" />,
    description: 'Protege tu cuenta y datos mientras juegas en línea.',
    tips: [
      'Activa la autenticación de dos factores',
      'No compartas tu contraseña con nadie',
      'Cuidado con phishing y estafas en gaming',
      'Usa nombres de usuario que no revelen tu identidad',
      'Reporta comportamientos tóxicos en el juego',
    ]
  },
];

const BuyingGuide = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-gamingOrange" />
          <h1 className={`text-4xl font-black italic tracking-tighter uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Guías de <span className="text-gamingOrange">Compra</span>
          </h1>
        </div>
        <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
          Consejos y estrategias para sacar el máximo provecho a tu dinero
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, i) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
              isLight
                ? 'bg-white border-gray-200 hover:shadow-lg'
                : 'bg-gamingCard border-white/10 hover:border-gamingOrange/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gamingOrange/10 rounded-xl text-gamingOrange">
                {guide.icon}
              </div>
              <h3 className={`font-black text-sm uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {guide.title}
              </h3>
            </div>
            <p className={`text-sm mb-4 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
              {guide.description}
            </p>
            <ul className="space-y-2">
              {guide.tips.map((tip, j) => (
                <li key={j} className="flex items-start gap-2">
                  <Zap className="w-3 h-3 text-gamingOrange mt-1 flex-shrink-0" />
                  <span className={`text-xs ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BuyingGuide;
