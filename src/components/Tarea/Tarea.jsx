

function Tarea({ tarea, onEliminar, onToggle, onEditar }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '8px 0', padding: '12px' }}>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onToggle(tarea.id)}
        style={{ marginRight: '8px' }}
      />
      <strong style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
        {tarea.titulo}
      </strong>
      {tarea.descripcion && <p>{tarea.descripcion}</p>}
      <button onClick={() => onEditar(tarea)} style={{ marginRight: '8px' }}>
        Editar
      </button>
      <button onClick={() => onEliminar(tarea.id)} style={{ color: 'black' }}>
        Eliminar
      </button>
    </div>
  );
}

export default Tarea;

  
  
  