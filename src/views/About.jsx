import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Gamepad2, Target, Users, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();

  const cardStyle = { 
    backgroundColor: theme === 'dark' ? '#1d1d1d' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
    boxShadow: theme === 'dark' ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-gamingMuted hover:text-gamingOrange transition-colors mb-8">
          <ChevronLeft className="w-5 h-5" />
          Volver al catálogo
        </Link>

        {/* Hero */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center bg-gamingOrange/10 p-5 rounded-3xl border border-gamingOrange/20 mb-4">
            <Gamepad2 className="w-12 h-12 text-gamingOrange" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-gamingText dark:text-white">
            Sobre <span className="text-gamingOrange">PixelVerdict</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gamingMuted">
            Resenas honestas, scores reales. Tu guia definitiva para elegir el proximo juego.
          </p>
        </div>

        {/* Misión */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Target className="w-6 h-6 text-gamingOrange" />,
              title: 'Mision',
              text: 'Brindar reviews imparciales y detalladas para que cada gamer tome la mejor decision antes de invertir su tiempo y dinero.'
            },
            {
              icon: <Users className="w-6 h-6 text-gamingOrange" />,
              title: 'Comunidad',
              text: 'Construir un espacio donde los opiniones de jugadores reales se combinen con analisis expertos para crear el veredicto definitivo.'
            },
            {
              icon: <Zap className="w-6 h-6 text-gamingOrange" />,
              title: 'Tecnologia',
              text: 'Utilizar la nube y herramientas modernas para mantener una base de datos actualizada en tiempo real con los ultimos lanzamientos.'
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl p-6 space-y-4"
              style={cardStyle}
            >
              <div className="bg-gamingOrange/10 w-fit p-3 rounded-xl">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-gamingText dark:text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gamingMuted">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Como funciona */}
        <div className="rounded-3xl p-8 md:p-12 space-y-8" style={cardStyle}>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-center text-gamingText dark:text-white">
            Como Funciona el <span className="text-gamingOrange">Score</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="bg-gamingOrange/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-black text-gamingOrange">J</span>
              </div>
              <h4 className="font-bold text-gamingText dark:text-white">Jugabilidad</h4>
              <p className="text-sm text-gamingMuted">Mecanicas, controles, diseno de niveles y sensacion general del juego.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-gamingOrange/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-black text-gamingOrange">G</span>
              </div>
              <h4 className="font-bold text-gamingText dark:text-white">Graficos</h4>
              <p className="text-sm text-gamingMuted"> apartado visual, arte, direccion artistica y rendimiento tecnico.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-gamingOrange/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-black text-gamingOrange">H</span>
              </div>
              <h4 className="font-bold text-gamingText dark:text-white">Historia</h4>
              <p className="text-sm text-gamingMuted">Narrativa, personajes, dialogos y impacto emocional de la historia.</p>
            </div>
          </div>
          <div className="text-center pt-4" style={{ borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}` }}>
            <p className="text-sm text-gamingMuted">
              El <span className="text-gamingOrange font-bold">Global Score</span> es un promedio ponderado de las tres categorias, calibrado por nuestro equipo editorial.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { value: '21+', label: 'Juegos Revisados' },
            { value: '3', label: 'Categorias de Analisis' },
            { value: '10', label: 'Puntaje Maximo' },
            { value: '24/7', label: 'Base en la Nube' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
              className="rounded-2xl p-5 text-center"
              style={cardStyle}
            >
              <div className="text-3xl font-black text-gamingOrange">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest font-bold mt-1 text-gamingMuted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
