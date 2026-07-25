import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Gamepad2, Target, Users, Zap } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const About = () => {
  useSEO({
    title: 'Acerca de',
    description: 'Conoce más sobre CriticPixel. Reseñas honestas, scores reales para gamers.'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ChevronLeft className="w-5 h-5" />
          Volver al catálogo
        </Link>

        {/* Hero */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center bg-gamingOrange/10 p-5 rounded-3xl border border-gamingOrange/20 mb-4">
            <Gamepad2 className="w-12 h-12 text-gamingOrange" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">
            Sobre <span className="text-gamingOrange">CriticPixel</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
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
              className="bg-gamingCard rounded-2xl p-6 border border-white/5 space-y-4"
            >
              <div className="bg-gamingOrange/10 w-fit p-3 rounded-xl">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Como funciona */}
        <div className="bg-gamingCard rounded-3xl p-8 md:p-12 border border-white/5 space-y-8">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-center">
            Como Funciona el <span className="text-gamingOrange">Score</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="bg-gamingOrange/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-black text-gamingOrange">J</span>
              </div>
              <h4 className="font-bold">Jugabilidad</h4>
              <p className="text-gray-500 text-sm">Mecanicas, controles, diseno de niveles y sensacion general del juego.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-gamingOrange/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-black text-gamingOrange">G</span>
              </div>
              <h4 className="font-bold">Graficos</h4>
              <p className="text-gray-500 text-sm"> apartado visual, arte, direccion artistica y rendimiento tecnico.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-gamingOrange/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl font-black text-gamingOrange">H</span>
              </div>
              <h4 className="font-bold">Historia</h4>
              <p className="text-gray-500 text-sm">Narrativa, personajes, dialogos y impacto emocional de la historia.</p>
            </div>
          </div>
          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-gray-500 text-sm">
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
              className="bg-gamingCard rounded-2xl p-5 border border-white/5 text-center"
            >
              <div className="text-3xl font-black text-gamingOrange">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
