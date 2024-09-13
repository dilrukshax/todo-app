import React, { useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  ButtonGroup,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const TodoList = () => {
  const { user, saveTodos } = useContext(AuthContext);
  const [todos, setTodos] = useState(user ? user.todos : []);
  const [isAddOpen, setAddOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null); // Holds both todo data and index
  const [isEditOpen, setEditOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false); // Toggle for showing completed vs incomplete

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  const handleAddTodo = (values) => {
    const newTodo = { title: values.title, description: values.description, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setAddOpen(false);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleEditClick = (index) => {
    setEditingTodo({ ...todos[index], index });
    setEditOpen(true);
  };

  const handleEditSave = (values) => {
    const updatedTodos = [...todos];
    updatedTodos[editingTodo.index] = { title: values.title, description: values.description, completed: editingTodo.completed };
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setEditOpen(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        maxWidth: '600px', // Limit the max width
        marginTop: '20px',
        marginBottom: '20px', // Add margin to the bottom
      }}
    >
      <Typography variant="h4" gutterBottom align="center">Todo List</Typography>

      <Button variant="contained" onClick={() => setAddOpen(true)} sx={{ backgroundColor: 'purple', marginBottom: 2 }}>
        Add Todo
      </Button>

      {/* Centered ButtonGroup with margin and width adjustment */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3, width: '100%' }}>
        <ButtonGroup variant="contained" sx={{ width: '300px' }}>
          <Button
            onClick={() => setShowCompleted(false)}
            sx={{ backgroundColor: !showCompleted ? 'purple' : '#a64ea6', width: '50%' }}
          >
            Incomplete
          </Button>
          <Button
            onClick={() => setShowCompleted(true)}
            sx={{ backgroundColor: showCompleted ? 'purple' : '#a64ea6', width: '50%' }}
          >
            Completed
          </Button>
        </ButtonGroup>
      </Box>

      {/* Conditional Rendering of Todos */}
      {showCompleted ? (
        <Box width="50%"> {/* Limit width for better UX */}
          <Typography variant="h6" align="center">Completed Todos</Typography>
          <List sx={{ width: '100%' }}>
            {todos.filter(todo => todo.completed).map((todo) => {
              const originalIndex = todos.findIndex(t => t === todo);
              return (
                <Card
                  key={originalIndex}
                  sx={{
                    marginBottom: 2,
                    border: '2px solid purple',
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff'
                  }}>
                  <CardContent>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleDeleteTodo(originalIndex)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(originalIndex)}
                      />
                      <ListItemText
                        primary={todo.title}
                        secondary={todo.description}
                        sx={{ textDecoration: 'line-through' }}
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              );
            })}
          </List>
        </Box>
      ) : (
        <Box width="50%"> {/* Limit width for better UX */}
          <Typography variant="h6" align="center">Incomplete Todos</Typography>
          <List sx={{ width: '100%' }}>
            {todos.filter(todo => !todo.completed).map((todo) => {
              const originalIndex = todos.findIndex(t => t === todo);
              return (
                <Card
                  key={originalIndex}
                  sx={{
                    marginBottom: 2,
                    border: '2px solid purple',
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff'
                  }}>
                  <CardContent>
                    <ListItem
                      secondaryAction={
                        <>
                          <IconButton edge="end" onClick={() => handleEditClick(originalIndex)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" onClick={() => handleDeleteTodo(originalIndex)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(originalIndex)}
                      />
                      <ListItemText primary={todo.title} secondary={todo.description} />
                    </ListItem>
                  </CardContent>
                </Card>
              );
            })}
          </List>
        </Box>
      )}

      {/* Add Todo Dialog */}
      <Dialog open={isAddOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ title: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={handleAddTodo}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  style={{ marginBottom: '20px' }}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  style={{ marginBottom: '20px' }}
                />
                <DialogActions>
                  <Button onClick={() => setAddOpen(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" sx={{ backgroundColor: 'purple' }}>Add</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Edit Todo Dialog */}
      <Dialog open={isEditOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={{ title: editingTodo?.title || '', description: editingTodo?.description || '' }}
            validationSchema={validationSchema}
            onSubmit={handleEditSave}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  style={{ marginBottom: '20px' }}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  style={{ marginBottom: '20px' }}
                />
                <DialogActions>
                  <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" sx={{ backgroundColor: 'purple' }}>Save</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TodoList;
