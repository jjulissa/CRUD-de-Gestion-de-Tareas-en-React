import styles from './FormularioTarea.module.css';
import { useState, useEffect } from 'react';

function FormularioTarea({ onAgregarTarea, tareaEditando, onGuardarEdicion, onCancelarEdicion }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    if (tareaEditando) {
      setTitulo(tareaEditando.titulo);
      setDescripcion(tareaEditando.descripcion || '');
      setErrores({});
      setMensajeExito('');
    } else {
      setTitulo('');
      setDescripcion('');
    }
  }, [tareaEditando]);

  const validarTitulo = () => {
    const nuevosErrores = {};
    if (!titulo.trim()) nuevosErrores.titulo = 'El título es requerido';
    if (titulo.length > 50) nuevosErrores.titulo = 'Máximo 50 caracteres';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarTitulo()) return;

    if (tareaEditando) {
      onGuardarEdicion(tareaEditando.id, titulo, descripcion);
      setMensajeExito('¡Tarea actualizada con éxito!');
    } else {
      onAgregarTarea(titulo, descripcion);
      setMensajeExito('¡Tarea agregada con éxito!');
      setTitulo('');
      setDescripcion('');
    }
    setErrores({});
    setTimeout(() => setMensajeExito(''), 2000);  
  };

  return ( 
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
      <div>
        <label style={{ color: '#ff8000' }} >Título </label>
        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          onBlur={validarTitulo} 
          className={`${styles.input} ${errores.titulo ? styles.inputError : ''}`} 
        /> 

        {errores.titulo && (
          <div className={styles.mensajeError}>{errores.titulo}</div>
        )}  

        {mensajeExito && (
          <div className={styles.mensajeExito}>{mensajeExito}</div>
        )} 

      </div> 
      <br />
      <div>
        <label style={{ color: '#ff8000' }} >Descripción</label>
        <textarea
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div> 
      <br />
      <button
        type="submit"
        disabled={!!errores.titulo || !titulo}
      >
        {tareaEditando ? 'Guardar Cambios' : 'Agregar Tarea'}
      </button>
      {tareaEditando && (
        <button type="button" onClick={onCancelarEdicion} style={{ marginLeft: '8px' }}>
          Cancelar
        </button>
      )}
      {mensajeExito && <div style={{ color: 'green', marginTop: '8px' }}>{mensajeExito}</div>}
    </form>
  );
}

export default FormularioTarea;
