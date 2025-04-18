


import Tarea from '../Tarea/Tarea.jsx';

function ListaTareas({ tareas, onEliminarTarea, onToggleCompletada, onEditarTarea }) {
  if (tareas.length === 0) {
    return <p>No hay tareas, ¡agrega una!</p>;
  }
  return (
    <div>
      {tareas.map(tarea => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          onEliminar={onEliminarTarea}
          onToggle={onToggleCompletada}
          onEditar={onEditarTarea}
        />
      ))}
    </div>
  );
}

export default ListaTareas;


  
  