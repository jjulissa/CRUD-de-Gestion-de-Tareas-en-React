

import { useState, useEffect } from 'react';
import FormularioTarea from './components/FormularioTarea/FormularioTarea';
import ListaTareas from './components/ListaTareas/ListaTareas';

function App() {
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = window.localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  const [tareaEditando, setTareaEditando] = useState(null); 

  useEffect(() => {
    window.localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);
  

  const agregarTarea = (titulo, descripcion) => {
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      descripcion,
      completada: false
    };
    setTareas(prev => [...prev, nuevaTarea]);
  };

  const eliminarTarea = (id) => {
    setTareas(prev => prev.filter(tarea => tarea.id !== id)); 
    if (tareaEditando && tareaEditando.id === id) setTareaEditando(null); 
  };

  // Actualizar 
  const toggleCompletada = (id) => {
    setTareas(prev => prev.map(tarea => 
      tarea.id === id ? {...tarea, completada: !tarea.completada} : tarea
    ));
  }; 

  const editarTarea = (tarea) => {
    setTareaEditando(tarea);
  }; 

  const guardarEdicion = (id, titulo, descripcion) => {
    setTareas(prev => prev.map(tarea =>
      tarea.id === id ? { ...tarea, titulo, descripcion } : tarea
    ));
    setTareaEditando(null);
  };


  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center', color: '#ff8000' }}>Gestor de Tareas</h1>
      
      <FormularioTarea 
        onAgregarTarea={agregarTarea} 
        tareaEditando={tareaEditando}
        onGuardarEdicion={guardarEdicion}
        onCancelarEdicion={() => setTareaEditando(null)}
      />
      
      <ListaTareas 
        tareas={tareas}
        onEliminarTarea={eliminarTarea}
        onToggleCompletada={toggleCompletada} 
        onEditarTarea={editarTarea}
      />
    </div>
  );
}

export default App;

