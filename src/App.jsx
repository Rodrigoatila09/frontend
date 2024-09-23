import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [studentId, setStudentId] = useState(1);
  const [performance, setPerformance] = useState([]);
  const [studyTips, setStudyTips] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchPerformance = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/performance?studentId=${studentId}`);
      setPerformance(response.data);
    } catch (error) {
      console.error('Erro ao buscar performance:', error);
    }
  };

  const fetchStudyTips = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/study-tips?studentId=${studentId}`);
      setStudyTips(response.data);
    } catch (error) {
      console.error('Erro ao buscar dicas de estudo:', error);
    }
  };


  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks?studentId=${studentId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };


  useEffect(() => {
    fetchPerformance();
    fetchStudyTips();
    fetchTasks();
  }, [studentId]);

  return (
    <div className="container">
      <h1 style={({backgroundColor:'#6A5ACD',
        color:'white',
        borderRadius:'10px',
        width:"600px",
        marginLeft:"300px",
        display:'flex',
        justifyContent:"center"
      })}>Painel do Estudante</h1>

      <div>
        <label style={({
          backgroundColor:'#6A5ACD',
          color:'white',
          padding:'10px',
          borderRadius:"7px"

        })}>Selecione o ID do Estudante:</label>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          <option value={1}>Estudante 1</option>
          <option value={2}>Estudante 2</option>
          <option value={3}>Estudante 3</option>
        </select>
      </div>

      <section>
        <h2>Performance Acadêmica</h2>
        <ul>
          {performance.map((item, index) => (
            <li key={index}>
              {item.course}: {item.grade} (Semestre: {item.semester})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Dicas de Estudo</h2>
        <ul>
          {studyTips.map((tip, index) => (
            <li key={index}>{tip.tip}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Tarefas</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.task} (Data de Entrega: {task.dueDate})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
