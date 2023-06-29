import React, { useState} from 'react';
import useEth from '../contexts/EthContext/useEth';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Card,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoList() {
  const {
    state: { contract, accounts}
  } = useEth();

  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');

    const getTaskRecords = async () => {
      try {
        const isRegistered = await contract.methods.isRegistered().call({ from: accounts[0] });
        if (isRegistered) {
          const taskCount = await contract.methods.getTaskCount().call({ from: accounts[0] });
          const taskArray = [];
          for (let i = 0; i < taskCount; i++) {
            const task = await contract.methods.getTask(i).call({ from: accounts[0] });
            taskArray.push({
              taskId: task[0],
              description: task[1],
              completed: task[2],
            });
          }
          setTasks(taskArray);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  

  const handleAddNewTask = async () => {
    try {
      const isRegistered = await contract.methods.isRegistered().call({ from: accounts[0] });
      if (isRegistered) {
        await contract.methods.addTask(description).send({from:accounts[0]});
        setDescription('');
        alert('Task added successfully');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTaskCompletion = async (taskId) => {
    try {
      await contract.methods.markTaskCompleted(taskId).send({ from: accounts[0] });
      alert('Task completed successfully');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTaskDeletion = async (taskId) => {
    try {
      await contract.methods.deleteTask(taskId).send({ from: accounts[0] });
      alert('Task deleted successfully');
    } catch (error) {
      console.log(error.message);
    }
  };

  getTaskRecords();

  return (
    <Card sx={{ borderRadius: '10px', width: '70%', padding: '20px', marginTop: '80px' }}>
      <Box>
        <Typography variant="h5" mb={1} gutterBottom sx={{ textAlign: 'center', fontWeight: 500 }}>
          Todo List
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.taskId}>
              <TableCell>{task.taskId}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {task.completed ? (
                  'Completed'
                ) : (
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleTaskCompletion(task.taskId)}
                    color="primary"
                  />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleTaskDeletion(task.taskId)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="New Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center' }}>
      <button onClick={handleAddNewTask}>Add Task</button>

      </Box>
    </Card>
  );
}

export default TodoList;
