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
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

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

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh',
        maxWidth: '600px',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom align="center">Todo List</Typography>

      <Button variant="contained" onClick={() => setAddOpen(true)} sx={{ backgroundColor: 'purple', marginBottom: 2 }}>
        Add Todo
      </Button>


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

      {todos.length === 0 ? (
        <Typography variant="h6" align="center">No any todos</Typography>
      ) : showCompleted ? (
        <Box width="50%">
          {completedTodos.length === 0 ? (
            <Typography variant="h6" align="center">No any completed todos</Typography>
          ) : (
            <List sx={{ width: '100%' }}>
              {completedTodos.map((todo) => {
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
                          <IconButton edge="end" onClick={() => handleDeleteTodo(originalIndex)} sx={{ color: 'red' }}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => handleToggleComplete(originalIndex)}
                        />
                        <ListItemText
                          primary={<strong>{todo.title}</strong>}
                          secondary={todo.description}
                          sx={{ textDecoration: 'line-through', marginRight: '5%'  }}
                        />
                      </ListItem>
                    </CardContent>
                  </Card>
                );
              })}
            </List>
          )}
        </Box>
      ) : (
        <Box width="50%">
          {incompleteTodos.length === 0 ? (
            <Typography variant="h6" align="center">No any todos</Typography>
          ) : (
            <List sx={{ width: '100%' }}>
              {incompleteTodos.map((todo) => {
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
                      <IconButton edge="end" onClick={() => handleEditClick(originalIndex)} sx={{ margin: '1px', color: 'blue' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteTodo(originalIndex)} sx={{ color: 'red' }}>
                        <DeleteIcon />
                      </IconButton>
                      </>
                    }
                    >
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(originalIndex)}
                    />
                    <ListItemText 
                    sx={{
                      marginRight: '5%',
                    }}
                    primary={<strong>{todo.title}</strong>} 
                    secondary={todo.description} />
                    </ListItem>
                  </CardContent>
                  </Card>
                );
              })}
            </List>
          )}
        </Box>
      )}

      {/* Add Todo Dialog */}
      <Dialog open={isAddOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Todo</DialogTitle>
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
                  sx={{
                    marginBottom: '20px',
                    marginTop: '20px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'purple',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'purple',
                    },
                  }}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  sx={{
                    marginBottom: '20px',
                    marginTop: '20px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'purple',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'purple',
                    },
                  }}
                />
                <DialogActions>
                  <Button onClick={() => setAddOpen(false)} sx={{ color: 'purple' }}>Cancel</Button>
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
                  sx={{
                    marginBottom: '20px',
                    marginTop: '20px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'purple',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'purple',
                    },
                  }}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  sx={{
                    marginBottom: '20px',
                    marginTop: '20px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'purple',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'purple',
                    },
                  }}
                />
                <DialogActions>
                  <Button onClick={() => setEditOpen(false)} sx={{ color: 'purple' }}>Cancel</Button>
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
